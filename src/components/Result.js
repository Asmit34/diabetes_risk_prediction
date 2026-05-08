import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { result } = location?.state || {}; // Safe access with optional chaining

  if (!result) {
    return <div className="no-result">No result found!</div>;
  }

  // Split the recommendation into lines using newline and colon to distinguish labels
  const recommendationLines = result.recommendation
    .split('\n')
    .filter((line) => line.trim() !== '');

  // Render each recommendation with labels and their content
  const renderRecommendation = (line, index) => {
    const [label, content] = line.split(':').map((part) => part.trim());

    return (
      <div key={index} className="recommendation-item">
        <strong className="recommendation-label">{label}:</strong>
        <span className="recommendation-content">{content}</span>
      </div>
    );
  };

  // Adjust diabetes status representation
  const diabetesStatus = result.diabetesStatus
    ? 'You have a high possibility of having diabetes.'
    : 'You have a low possibility of diabetes.';

  return (
    <div className="result-container">
      <header>
        <h1 className="result-heading">Prediction Result</h1>
      </header>
      <main>
        <section className="result-item">
          <p>
            <strong>Diabetes Status:</strong>{' '}
            <span className={result.diabetesStatus ? 'status-positive' : 'status-negative'}>
              {diabetesStatus}
            </span>
          </p>
        </section>
        <section className="result-item">
          <h2 className="section-heading">Recommendations</h2>
          <div className="recommendation-list">
            {recommendationLines.map(renderRecommendation)}
          </div>
        </section>
        <section className="result-item">
          <p>
            <strong>Probability:</strong>{' '}
            <span className="probability">{result.probability}%</span>
          </p>
        </section>
      </main>

      <style jsx>{`
        /* General Styles */
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
        }

        .result-container {
          max-width: 800px;
          margin: 30px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          line-height: 1.6;
        }

        .result-heading {
          font-size: 28px;
          font-weight: bold;
          color: #2c3e50;
          text-align: center;
          margin-bottom: 20px;
        }

        .section-heading {
          font-size: 20px;
          font-weight: bold;
          color: #34495e;
          margin-bottom: 10px;
        }

        .result-item {
          margin-bottom: 20px;
        }

        .recommendation-list {
          padding: 10px 0;
        }

        .recommendation-item {
          margin-bottom: 8px;
        }

        .recommendation-label {
          color: #2c3e50;
          font-weight: bold;
        }

        .recommendation-content {
          color: #7f8c8d;
          margin-left: 8px;
        }

        .status-positive {
          color: #e74c3c;
          font-weight: bold;
        }

        .status-negative {
          color: #27ae60;
          font-weight: bold;
        }

        .probability {
          color: #2980b9;
          font-weight: bold;
        }

        .no-result {
          text-align: center;
          font-size: 18px;
          color: #e74c3c;
          margin-top: 20px;
          font-weight: bold;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .result-container {
            padding: 15px;
            width: 90%;
          }

          .result-heading {
            font-size: 22px;
          }

          .section-heading {
            font-size: 18px;
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
