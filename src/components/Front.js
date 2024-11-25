import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid mt-5">
      <style>
        {`
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
          }
        `}
      </style>

      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card" style={{ backgroundColor: "#f0f8ff", padding: "20px", borderRadius: "10px" }}>
            <div className="card-header text-center bg-info text-white">
              <h3>Welcome to Diabetes Awareness</h3>
              <div className="button-container">
                <button
                  className="btn-login"
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
              {/* Centered Title */}
              <h2 className="text-center">Diabetes Prediction System</h2>

              {/* Image Section */}
              <div className="image-container">
                <img
                  src="/image/Diabetes.jpg"
                  alt="Diabetes Awareness"
                />
              </div>

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
