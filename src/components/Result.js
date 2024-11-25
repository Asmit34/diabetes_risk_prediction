import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { result } = location?.state || {};  // Safe access with optional chaining

  if (!result) {
    return <div className="no-result">No result found!</div>;
  }

  // Split the recommendation into lines using newline and colon to distinguish labels
  const recommendationLines = result.recommendation.split("\n").filter(line => line.trim() !== "");

  // Function to render the recommendation with labels and their content
  const renderRecommendation = (line, index) => {
    // Split the line into label and content by the first colon ":"
    const [label, content] = line.split(":").map(part => part.trim());

    if (label && content) {
      return (
        <div key={index} className="recommendation-item">
          <strong className="recommendation-label">{label}:</strong>
          <p className="recommendation-content">{content}</p>
        </div>
      );
    }
    return null;  // Handle any malformed or empty lines
  };

  // Correcting the diabetesStatus representation (true/false -> Yes/No)
  const diabetesStatus = result.diabetesStatus ? 'You have high possibility of having diabetes' : 'You have low possibility of having diabetes';

  return (
    <div className="result-container">
      <header>
        <h3 className="result-heading">Prediction Result</h3>
      </header>
      <article>
        <section className="result-item">
          <p><strong>Diabetes Status:</strong> <span>{diabetesStatus}</span></p>
        </section>
        <section className="result-item">
          <p><strong>Recommendation:</strong></p>
          <div className="recommendation-text">
            {recommendationLines.map(renderRecommendation)}
          </div>
        </section>
        <section className="result-item">
          <p><strong>Probability:</strong> <span>{result.probability}%</span></p>
        </section>
      </article>

      <style jsx>{`
        body {
          font-family: 'Arial', sans-serif;
          background-color: #ecf0f1; /* Lighter background color */
          margin: 0;
          padding: 0;
        }

        .result-container {
          max-width: 800px;
          margin: 30px auto;
          background-color: #ffffff; /* White background for the result box */
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .result-heading {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          text-align: center;
          margin-bottom: 20px;
        }

        .result-item {
          font-size: 18px;
          margin-bottom: 15px;
        }

        .result-item strong {
          color: #2c3e50;
        }

        .result-item span {
          color: #2980b9;
          font-weight: bold;
        }

        .recommendation-text {
          padding: 10px 0;
          color: black;
        }

        .recommendation-item {
          margin-bottom: 10px;
        }

        .recommendation-label {
          color: #34495e; /* Darker label color */
          font-weight: bold;
        }

        .recommendation-content {
          color: #7f8c8d; /* Slightly lighter content color */
          margin-left: 10px;
        }

        .no-result {
          text-align: center;
          font-size: 18px;
          color: #e74c3c;
          margin-top: 20px;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .result-container {
            padding: 15px;
            width: 90%;
          }

          .result-heading {
            font-size: 20px;
          }

          .result-item {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default Result;
