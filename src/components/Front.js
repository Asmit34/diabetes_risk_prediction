import React from "react";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
const Front = () => {
=======
const HomePage = () => {
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
  const navigate = useNavigate();

  return (
    <div className="container-fluid mt-5">
      <style>
        {`
<<<<<<< HEAD
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
=======
          .image-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
          }
          .image-container img {
            width: 100%; /* Make the image fit the container */
            max-width: 900px; /* Limit the maximum width */
            height: auto; /* Maintain aspect ratio */
            border: 2px solid #ddd; /* Border around the image */
            border-radius: 10px; /* Rounded corners */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Box shadow for depth */
          }
          p {
            font-size: 1.2rem; /* Increased font size */
            line-height: 1.6; /* Improve text readability */
          }
          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
          }
          .card-header h3 {
            margin: 0; /* Remove default margin */
          }
          .button-container {
            display: flex;
            gap: 10px; /* Space between buttons */
          }
          .btn-login {
            background-color: #003366; /* Dark blue */
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 1.1rem;
          }
          .btn-login:hover {
            background-color: #002244; /* Darker blue on hover */
          }
          .btn-signup {
            background-color: #006400; /* Dark green */
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 1.1rem;
          }
          .btn-signup:hover {
            background-color: #004d00; /* Darker green on hover */
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
          }
        `}
      </style>

      <div className="row justify-content-center">
        <div className="col-md-10">
<<<<<<< HEAD
          <div className="card">
            <div className="card-header">
              <h3>Welcome to Diabetes Awareness</h3>
              <div className="button-container">
                <button
                  className="btn-login me-2"
=======
          <div className="card" style={{ backgroundColor: "#f0f8ff", padding: "20px", borderRadius: "10px" }}>
            <div className="card-header text-center bg-info text-white">
              <h3>Welcome to Diabetes Awareness</h3>
              <div className="button-container">
                <button
                  className="btn-login"
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
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
<<<<<<< HEAD
              <h2>Diabetes Prediction System</h2>

=======
              {/* Centered Title */}
              <h2 className="text-center">Diabetes Prediction System</h2>

              {/* Image Section */}
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
              <div className="image-container">
                <img
                  src="/image/Diabetes.jpg"
                  alt="Diabetes Awareness"
                />
              </div>
<<<<<<< HEAD
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
=======

              {/* Text Section */}
              <div className="row">
                <div className="col-md-12">
                  <p>
                    Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy. There isn’t a cure yet for diabetes, but losing weight, eating healthy food, and being active can really help in reducing the impact of diabetes. This Web app will help you to predict whether a person has diabetes or is prone to get diabetes in future by analyzing the values of several features using the XGB Classifier.
                  </p>
                  <p>
                    Early detection and proper management of diabetes can help prevent complications and lead to a healthier life.
                  </p>
                </div>
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
              </div>
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD

      <div className="footer">
        &copy; 2025 Diabetes Awareness System | Designed for Health and Wellness
      </div>
=======
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
    </div>
  );
};

<<<<<<< HEAD
export default Front;
=======
export default HomePage;
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
