from distutils import dir_util

from diabetes.constant.Training_pipeline import SCHEMA_FILE_PATH

from diabetes.entity.artifact_entity import DataIngestionArtifact, DataValidationArtifact

from diabetes.entity.config_entity import DataValidationConfig
from diabetes.exception import CustomException
from diabetes.logger import logging
from diabetes.utils.main_utils import read_yaml, write_yaml_file
from scipy.stats import ks_2samp
import pandas as pd
import os,sys


class DataValidation:

    def __init__(self, data_validation_config: DataValidationConfig,
                  data_ingestion_artifact: DataIngestionArtifact):
        try:
            self.data_validation_config  = data_validation_config
            self.data_ingestion_artifact = data_ingestion_artifact
            self._schemma_config = read_yaml(SCHEMA_FILE_PATH)

        except Exception as e:
            raise CustomException(e,sys)
        
    def validate_number_of_columns(self, dataframe:pd.DataFrame)->bool:
        try:
            number_of_columns = len(self._schemma_config["columns"])
            logging.info(f"Required number of columns: {number_of_columns}")
            logging.info(f"Data frame has columns: {len(dataframe.columns)}")

            if len(dataframe.columns) == number_of_columns:
                return True
            return False
        except Exception as e:
            raise CustomException(e,sys)
        
    
    def is_numerical_column_exist(self, dataframe: pd.DataFrame) -> bool:
     try:
        # Get the list of numerical columns from the schema
        numerical_columns = self._schemma_config.get("numerical_columns", [])
        # print("numerical_columns from schema:", numerical_columns)
        
        # Get the DataFrame columns
        dataframe_columns = dataframe.columns
        # print("dataframe_columns:", dataframe_columns)

        # Find any missing numerical columns
        missing_numerical_columns = [col for col in numerical_columns if col not in dataframe_columns]
        # print("missing_numerical_columns:", missing_numerical_columns)
        
        
        # Log if any numerical columns are missing
        if missing_numerical_columns:
            logging.info(f"Missing numerical columns: {missing_numerical_columns}")
            return False

        return True

     except Exception as e:
        raise CustomException(e, sys)



    def is_categorical_column_exist(self, dataframe: pd.DataFrame) -> bool:
     try:
        categorical_columns = self._schemma_config.get("categorical_columns", [])
        # print("Categorical columns from schema:", categorical_columns)
        dataframe_columns = dataframe.columns
        # print("Dataframe columns:", dataframe_columns)

        # Find missing categorical columns
        missing_categorical_columns = [
            col for col in categorical_columns if col not in dataframe_columns
        ]
        # print("missing_categorical_columns:",missing_categorical_columns)

        if missing_categorical_columns:
            logging.info(f"Missing categorical columns: {missing_categorical_columns}")
            return False

        return True

     except Exception as e:
        raise CustomException(e, sys)


    @staticmethod
    def read_data(file_path)->pd.DataFrame:
        try:
            return pd.read_csv(file_path)
        
        except Exception as e:
            raise CustomException(e,sys)
        
    
    def detect_dataset_drift(self,base_df,current_df,threshold=0.05)->bool:
        try:
            status=True
            report ={}
            for column in base_df.columns:
                d1 = base_df[column]
                d2  = current_df[column]
                is_same_dist = ks_2samp(d1,d2)
                if threshold<=is_same_dist.pvalue:
                    is_found=False
                else:
                    is_found = True 
                    status=False
                report.update({column:{
                    "p_value":float(is_same_dist.pvalue),
                    "drift_status":is_found
                    
                    }})
            
            drift_report_file_path = self.data_validation_config.drift_report_file_path
            
            #Create directory
            dir_path = os.path.dirname(drift_report_file_path)
            os.makedirs(dir_path,exist_ok=True)
            write_yaml_file(file_path=drift_report_file_path,content=report,)
            return status
        except Exception as e:
            raise CustomException(e,sys)
        

    
    def initiate_data_validation(self)->DataValidationArtifact:
        try:
            error_message = ""
            train_file_path = self.data_ingestion_artifact.trained_file_path
            test_file_path = self.data_ingestion_artifact.test_file_path

            #Reading data from train and test file location
            train_dataframe = DataValidation.read_data(train_file_path)
            test_dataframe = DataValidation.read_data(test_file_path)

            #Validate number of columns
            status = self.validate_number_of_columns(dataframe=train_dataframe)
            if not status:
                error_message=f"{error_message}Train dataframe does not contain all columns.\n"
            status = self.validate_number_of_columns(dataframe=test_dataframe)
            if not status:
                error_message=f"{error_message}Test dataframe does not contain all columns.\n"
        

            #Validate numerical columns
            status = self.is_numerical_column_exist(dataframe=train_dataframe)
            if not status:
                error_message=f"{error_message}Train dataframe does not contain all numerical columns.\n"
            
            status = self.is_numerical_column_exist(dataframe=test_dataframe)
            if not status:
                error_message=f"{error_message}Test dataframe does not contain all numerical columns.\n"
            
            if len(error_message)>0:
                raise Exception(error_message)
            

            #Validate categorical columns
            status = self.is_categorical_column_exist(dataframe=train_dataframe)
            if not status:
                error_message=f"{error_message}Train dataframe does not contain all categorical columns.\n"
                     

            status = self.is_categorical_column_exist(dataframe=test_dataframe)
            if not status:
                error_message=f"{error_message}Test dataframe does not contain all categorical columns.\n"
            
            if len(error_message)>0:
                raise Exception(error_message)   
            
            #Let check data drift
            status = self.detect_dataset_drift(base_df=train_dataframe,current_df=test_dataframe)

            data_validation_artifact = DataValidationArtifact(
                validation_status=status,
                valid_train_file_path=self.data_ingestion_artifact.trained_file_path,
                valid_test_file_path=self.data_ingestion_artifact.test_file_path,
                invalid_train_file_path=None,
                invalid_test_file_path=None,
                drift_report_file_path=self.data_validation_config.drift_report_file_path,
            )
            # print("Train DataFrame columns:", train_dataframe.columns)
            # print("Test DataFrame columns:", test_dataframe.columns)

            logging.info(f"Data validation artifact: {data_validation_artifact}")

            return data_validation_artifact
        except Exception as e:
            raise CustomException(e,sys)
        




