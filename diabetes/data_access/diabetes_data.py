import sys
from typing import Optional
import logging
import numpy as np
import pandas as pd
import json
from diabetes.configuration.mongodb_connection import MongoDBClient
from diabetes.constant.database import DATABASE_NAME
from diabetes.exception import CustomException
from diabetes.logger import logging

class DiabetesData:
    """
    This class helps to export entire MongoDB records as a pandas DataFrame
    """

    def __init__(self):
        try:
            self.mongo_client = MongoDBClient(database_name=DATABASE_NAME)
            logging.info("MongoDB client initialized successfully.")
        except Exception as e:
            logging.error(f"Failed to initialize MongoDB client: {e}")
            raise CustomException(e, sys)

    def save_csv_file(self, file_path, collection_name: str, database_name: Optional[str] = None):
        try:
            data_frame = pd.read_csv(file_path)
            data_frame.reset_index(drop=True, inplace=True)
            records = list(json.loads(data_frame.T.to_json()).values())

            if database_name is None:
                collection = self.mongo_client.database[collection_name]
            else:
                collection = self.mongo_client[database_name][collection_name]

            collection.insert_many(records)
            logging.info(f"Inserted {len(records)} records into collection '{collection_name}' in database '{database_name or DATABASE_NAME}'.")
            return len(records)
        except Exception as e:
            logging.error(f"Error saving CSV file to MongoDB: {e}")
            raise CustomException(e, sys)

    def export_collection_as_dataframe(
        self, collection_name: str, database_name: Optional[str] = None) -> pd.DataFrame:
        try:
            """
            Export entire collection as DataFrame:
            Return pd.DataFrame of collection
            """
            if database_name is None:
                collection = self.mongo_client.database[collection_name]
            else:
                collection = self.mongo_client[database_name][collection_name]

            df = pd.DataFrame(list(collection.find()))

            if "_id" in df.columns.to_list():
                df = df.drop(columns=["_id"], axis=1)

            df.replace({"na": np.nan}, inplace=True)
            logging.info(f"Exported collection '{collection_name}' from database '{database_name or DATABASE_NAME}' as DataFrame.")
            return df
        except Exception as e:
            logging.error(f"Error exporting collection to DataFrame: {e}")
            raise CustomException(e, sys)
