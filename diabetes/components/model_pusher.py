from diabetes.exception import CustomException
from diabetes.logger import logging
from diabetes.entity.artifact_entity import ModelPusherArtifact
from diabetes.entity.config_entity import ModelPusherConfig

from diabetes.entity.artifact_entity import ModelEvaluationArtifact
import os, sys
import shutil

class ModelPusher:

    def __init__(self,
                 model_pusher_config: ModelPusherConfig,
                 model_eval_artifact: ModelEvaluationArtifact):

        try:
            self.model_pusher_config = model_pusher_config
            self.model_eval_artifact = model_eval_artifact
        except Exception as e:
            raise CustomException(e, sys)

    def initiate_model_pusher(self) -> ModelPusherArtifact:
        try:
            trained_model_path = self.model_eval_artifact.trained_model_path
            
            # Creating model pusher dir to save model
            model_file_path = self.model_pusher_config.model_file_path
            os.makedirs(os.path.dirname(model_file_path), exist_ok=True)
            shutil.copy(src=trained_model_path, dst=model_file_path)

            # Saved model dir
            saved_model_path = self.model_pusher_config.saved_model_path
            os.makedirs(os.path.dirname(saved_model_path), exist_ok=True)
            shutil.copy(src=trained_model_path, dst=saved_model_path)

            # Prepare artifact
            model_pusher_artifact = ModelPusherArtifact(saved_model_path=saved_model_path, model_file_path=model_file_path)
            logging.info(f"Model pushed successfully. Saved model path: {saved_model_path}, Model file path: {model_file_path}")

            return model_pusher_artifact

        except Exception as e:
            raise CustomException(e, sys)
