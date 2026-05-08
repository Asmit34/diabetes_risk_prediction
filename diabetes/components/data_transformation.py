import sys
import numpy as np
import pandas as pd
from imblearn.combine import SMOTETomek
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from diabetes.constant.Training_pipeline import TARGET_COLUMN
from diabetes.entity.artifact_entity import DataTransformationArtifact, DataValidationArtifact
from diabetes.entity.config_entity import DataTransformationConfig
from diabetes.exception import CustomException
from diabetes.logger import logging
from diabetes.ml.model.estimator import TargetValueMapping
from diabetes.utils.main_utils import save_numpy_array_data, save_object
from collections import Counter

class DataTransformation:

    def __init__(self, data_validation_artifact: DataValidationArtifact, 
                 data_transformation_config: DataTransformationConfig):
        try:
            self.data_validation_artifact = data_validation_artifact
            self.data_transformation_config = data_transformation_config
            logging.info("DataTransformation initialized.")
        except Exception as e:
            raise CustomException(e, sys)

    @staticmethod
    def read_data(file_path) -> pd.DataFrame:
        try:
            df = pd.read_csv(file_path)
            logging.info(f"Data read from {file_path} successfully.")
            return df
        except Exception as e:
            raise CustomException(e, sys)
        
    @classmethod
    def get_data_transformer_object(cls) -> Pipeline:
        try:
            scaler = StandardScaler()  
            preprocessor = Pipeline(
                steps=[
                    ("Scaler", scaler)
                ]
            )
            logging.info("Data transformer object created.")
            return preprocessor
        except Exception as e:
            raise CustomException(e, sys) from e

    def initiate_data_transformation(self) -> DataTransformationArtifact:
        try:
            # Reading data
            train_df = DataTransformation.read_data(self.data_validation_artifact.valid_train_file_path)
            test_df = DataTransformation.read_data(self.data_validation_artifact.valid_test_file_path)

            preprocessor = self.get_data_transformer_object()

            # Encoding categorical features
            label_encoder = LabelEncoder()
            binary_columns = [
                'Gender', 'Polyuria', 'Polydipsia', 'sudden weight loss', 'weakness', 'Polyphagia',
                'Genital thrush', 'visual blurring', 'Itching', 'Irritability',
                'delayed healing', 'partial paresis', 'muscle stiffness', 'Alopecia', 'Obesity'
            ]
            for col in binary_columns:
                train_df[col] = label_encoder.fit_transform(train_df[col])
                test_df[col] = label_encoder.transform(test_df[col])
                logging.info(f"Column '{col}' encoded.")

            # Mapping target labels
            target_mapping = TargetValueMapping().to_dict()
            train_df[TARGET_COLUMN] = train_df[TARGET_COLUMN].map(target_mapping)
            test_df[TARGET_COLUMN] = test_df[TARGET_COLUMN].map(target_mapping)
            logging.info(f"Target column '{TARGET_COLUMN}' mapped.")

            # Check class distribution before SMOTETomek
            logging.info(f"Original training target class distribution: {Counter(train_df[TARGET_COLUMN])}")
            logging.info(f"Original test target class distribution: {Counter(test_df[TARGET_COLUMN])}")

            # Preparing data for transformation
            input_feature_train_df = train_df.drop(columns=[TARGET_COLUMN], axis=1)
            # print(input_feature_train_df)
            target_feature_train_df = train_df[TARGET_COLUMN]
            input_feature_test_df = test_df.drop(columns=[TARGET_COLUMN], axis=1)
            target_feature_test_df = test_df[TARGET_COLUMN]

            # Fit and transform the data
            preprocessor_object = preprocessor.fit(input_feature_train_df)
            transformed_input_train_feature = preprocessor.transform(input_feature_train_df)
            transformed_input_test_feature = preprocessor.transform(input_feature_test_df)
            logging.info("Data scaling completed.")

            # Applying SMOTETomek
            smt = SMOTETomek(random_state=42, sampling_strategy='minority')
            input_feature_train_final, target_feature_train_final = smt.fit_resample(
                transformed_input_train_feature, target_feature_train_df
            )
            input_feature_test_final, target_feature_test_final = smt.fit_resample(
                transformed_input_test_feature, target_feature_test_df
            )

            # Check class distribution after SMOTETomek
            logging.info(f"Resampled training target class distribution: {Counter(target_feature_train_final)}")
            logging.info(f"Resampled test target class distribution: {Counter(target_feature_test_final)}")

            # Save numpy array data
            train_arr = np.c_[input_feature_train_final, np.array(target_feature_train_final)]
            test_arr = np.c_[input_feature_test_final, np.array(target_feature_test_final)]
            save_numpy_array_data(self.data_transformation_config.transformed_train_file_path, array=train_arr)
            save_numpy_array_data(self.data_transformation_config.transformed_test_file_path, array=test_arr)
            save_object(self.data_transformation_config.transformed_object_file_path, preprocessor_object)
            logging.info("Data transformation artifacts saved.")

            # Preparing artifact
            data_transformation_artifact = DataTransformationArtifact(
                transformed_object_file_path=self.data_transformation_config.transformed_object_file_path,
                transformed_train_file_path=self.data_transformation_config.transformed_train_file_path,
                transformed_test_file_path=self.data_transformation_config.transformed_test_file_path,
            )

            logging.info(f"Data transformation artifact: {data_transformation_artifact}")

            return data_transformation_artifact
        
        except Exception as e:
            raise CustomException(e, sys) from e
