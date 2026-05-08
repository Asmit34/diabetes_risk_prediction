import React from "react";
import { useNavigate } from "react-router-dom";

const Front = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid mt-5">
      <style>
        {`
          body {
            font-family: 'Arial', sans-serif;
            background-color: #eaf4fc;
            color: #333;
          }
          .card {
            background-color: #ffffff;
            border-radius: 15px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .card-header {
            background: linear-gradient(135deg, #00c6ff, #0072ff);
            color: white;
            text-align: center;
            padding: 30px 20px;
          }
          .card-header h3 {
            margin: 0;
            font-size: 2rem;
            font-weight: bold;
          }
          .button-container {
            margin-top: 20px;
          }
          .btn-login,
          .btn-signup {
            background-color: #0072ff;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 8px;
            font-size: 1.1rem;
            transition: all 0.3s ease-in-out;
          }
          .btn-login:hover {
            background-color: #005bb5;
            transform: scale(1.05);
          }
          .btn-signup {
            background-color: #28a745;
          }
          .btn-signup:hover {
            background-color: #1c7d33;
            transform: scale(1.05);
          }
          .image-container {
            display: flex;
            justify-content: center;
            margin: 30px 0;
          }
          .image-container img {
            max-width: 100%;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
          }
          .image-caption {
            text-align: center;
            margin-top: 10px;
            font-size: 1rem;
            color: #555;
          }
          .card-body h2 {
            font-size: 1.8rem;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
          }
          p {
            font-size: 1.2rem;
            line-height: 1.8;
            margin-bottom: 20px;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding: 10px;
            background-color: #f0f8ff;
            border-top: 1px solid #ddd;
            font-size: 0.9rem;
            color: #666;
          }
        `}
      </style>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="card-header">
              <h3>Welcome to Diabetes Awareness</h3>
              <div className="button-container">
                <button
                  className="btn-login me-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="btn-signup"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </div>
            </div>
            <div className="card-body">
              <h2>Diabetes Prediction System</h2>

              <div className="image-container">
                <img
                  src="/image/Diabetes.jpg"
                  alt="Diabetes Awareness"
                />
              </div>
              <div className="image-caption">
                  Empowering individuals with early diabetes detection.
                </div>
              <div className="text-section">
                <p>
                  Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy. Losing weight, eating healthy food, and being active can help in reducing the impact of diabetes.
                </p>
                <p>
                  This web app analyzes multiple health indicators using advanced machine learning (XGB Classifier) to predict the likelihood of diabetes, empowering users with actionable insights.
                </p>
                <p>
                  Early detection and proper management can help prevent complications and lead to a healthier life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        &copy; 2025 Diabetes Awareness System | Designed for Health and Wellness
      </div>
    </div>
  );
};

export default Front;
