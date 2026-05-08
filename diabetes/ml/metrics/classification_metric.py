import os
import sys
import logging
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import f1_score, precision_score, recall_score, roc_curve, auc
from sklearn.calibration import calibration_curve
from diabetes.entity.artifact_entity import ClassificationMetricArtifact
from diabetes.exception import CustomException

def plot_calibration_curve(y_true, y_pred, save_path="calibration_plot.png"):
    """Generates and saves the calibration plot to a file."""
    prob_true, prob_pred = calibration_curve(y_true, y_pred, n_bins=10)

    plt.figure()
    plt.plot(prob_pred, prob_true, marker='o', label="Calibration")
    plt.plot([0, 1], [0, 1], linestyle='--', label="Perfectly Calibrated")
    plt.xlabel('Predicted probability')
    plt.ylabel('True probability')
    plt.title('Calibration Plot')
    plt.grid(True)
    plt.legend()
    plt.savefig(save_path, dpi=300)  # Save the plot with higher resolution
    plt.close()  # Close the plot to free up memory

def plot_roc_curve(y_true, y_pred, save_path="roc_curve.png"):
    """Generates and saves the ROC curve to a file."""
    fpr, tpr, thresholds = roc_curve(y_true, y_pred)
    # print(y_pred)
    roc_auc = auc(fpr, tpr)  # Calculate AUC

    plt.figure()
    plt.plot(fpr, tpr, label=f'ROC curve (AUC = {roc_auc:.2f})')
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('ROC Curve')
    plt.grid(True)
    plt.legend()
    plt.savefig(save_path, dpi=300)  # Save the plot with higher resolution
    plt.close()  # Close the plot to free up memory

    # Calculate and log the optimal threshold
    optimal_idx = np.argmax(tpr - fpr)
    optimal_threshold = thresholds[optimal_idx]
    logging.info(f"The optimal threshold is: {optimal_threshold}")
    logging.info(f"The AUC score is: {roc_auc}")

def get_classification_score(y_true, y_pred) -> ClassificationMetricArtifact:
    try:
        # Calculate classification metrics
        model_f1_score = f1_score(y_true, y_pred)
        model_recall_score = recall_score(y_true, y_pred)
        model_precision_score = precision_score(y_true, y_pred)

        classification_metric = ClassificationMetricArtifact(
            f1_score=model_f1_score,
            precision_score=model_precision_score,
            recall_score=model_recall_score
        )

        # Save the plots
        plot_calibration_curve(y_true, y_pred, save_path=r"C:\Users\Asmit\Desktop\diabetes_detection\plot\calibration_plot.png")
        plot_roc_curve(y_true, y_pred, save_path=r"C:\Users\Asmit\Desktop\diabetes_detection\plot\roc_curve.png")

        logging.info(f"Classification metrics calculated: {classification_metric}")
        return classification_metric

    except Exception as e:
        raise CustomException(e, sys)
