from diabetes.configuration.mongodb_connection import MongoDBClient
from diabetes.exception import CustomException
from diabetes.logger import logging
from diabetes.pipeline.training_pipeline import TrainPipeline
from diabetes.utils.main_utils import load_object
from diabetes.ml.model.estimator import ModelResolver, TargetValueMapping
from diabetes.pipeline.training_pipeline import TrainPipeline
from diabetes.constant.Training_pipeline import SAVED_MODEL_DIR
from fastapi import FastAPI, Response
from diabetes.constant.application import APP_HOST, APP_PORT
from starlette.responses import RedirectResponse
from uvicorn import run as app_run
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import sys

# app = FastAPI()

# origins = ["*"]
# # Cross-Origin Resource Sharing (CORS)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# @app.get("/", tags=["authentication"])
# async def index():
#     return RedirectResponse(url="/docs")


# @app.get("/train")
# async def train():
#     try:
#         training_pipeline = TrainPipeline()

#         if training_pipeline.is_pipeline_running:
#             return Response("Training pipeline is already running.")

#         training_pipeline.run_pipeline()
#         return Response("Training successfully completed!")

#     except Exception as e:
#         return Response(f"Error Occurred! {e}")
    
# @app.get("/predict")
# async def predict():
#     try:
#         # File path for the dataset
#         file_path = "C:/Users/Asmit/Desktop/diabetes_detection/diabetes.csv"
        
#         # Load the data from the CSV file into a pandas DataFrame
#         df = pd.read_csv(file_path)

#         # Drop the target column ('class' or any other label column)
#         if 'class' in df.columns:
#             df_features = df.drop('class', axis=1)
#         else:
#             df_features = df  # If the target column is not in the CSV

#         # Ensure the DataFrame contains the same feature columns as used during model training
#         model_resolver = ModelResolver(model_dir=SAVED_MODEL_DIR)
        
#         if not model_resolver.is_model_exists():
#             return Response("Model is not available")
        
#         # Load the best model
#         best_model_path = model_resolver.get_best_model_path()
#         model = load_object(file_path=best_model_path)
        
#         # Make predictions using only the feature columns
#         y_pred = model.predict(df_features)
        
#         # Add predicted values to the original DataFrame
#         df['predicted_column'] = y_pred
        
#         # Map predicted values to human-readable form using TargetValueMapping
#         df['predicted_column'].replace(TargetValueMapping().reverse_mapping, inplace=True)

#         # Return the DataFrame or desired output
#         return df.to_json(orient="records")

#     except Exception as e:
#         raise CustomException(e, sys)

# def main():
#     try:
#         training_pipeline = TrainPipeline()
#         training_pipeline.run_pipeline()
#     except Exception as e:
#         print(e)
#         logging.exception(e)


if __name__ == "__main__":
    training_pipeline = TrainPipeline()
    training_pipeline.run_pipeline()
#     app_run(app, host=APP_HOST, port=APP_PORT)
