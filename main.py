from diabetes.configuration.mongodb_connection import MongoDBClient
from diabetes.exception import CustomException
import os , sys
from diabetes.logger import logging
#from  sensor.utils import dump_csv_file_to_mongodb_collecton
#from sensor.entity.config_entity  import TrainingPipelineConfig,DataIngestionConfig
from diabetes.pipeline.training_pipeline import TrainPipeline


if __name__ == "__main__":

    # file_path="/Users/myhome/Downloads/sensorlive/aps_failure_training_set1.csv"
    # database_name="Project"
    # collection_name ="diabetes"
    # dump_csv_file_to_mongodb_collection(file_path,database_name,collection_name)

    training_pipeline = TrainPipeline()
    training_pipeline.run_pipeline()









  












    # try:
    #     test_exception()
    # except Exception as e:
    #     print(e)