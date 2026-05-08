import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
<<<<<<< HEAD
  const { result } = location?.state || {}; // Safe access with optional chaining
=======
  const { result } = location?.state || {};  // Safe access with optional chaining
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c

  if (!result) {
    return <div className="no-result">No result found!</div>;
  }

  // Split the recommendation into lines using newline and colon to distinguish labels
<<<<<<< HEAD
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
=======
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
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c

  return (
    <div className="result-container">
      <header>
<<<<<<< HEAD
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
=======
        <h3 className="result-heading">Prediction Result</h3>
      </header>
      <article>
        <section className="result-item">
          <p><strong>Diabetes Status:</strong> <span>{diabetesStatus}</span></p>
        </section>
        <section className="result-item">
          <p><strong>Recommendation:</strong></p>
          <div className="recommendation-text">
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
            {recommendationLines.map(renderRecommendation)}
          </div>
        </section>
        <section className="result-item">
<<<<<<< HEAD
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
=======
          <p><strong>Probability:</strong> <span>{result.probability}%</span></p>
        </section>
      </article>

      <style jsx>{`
        body {
          font-family: 'Arial', sans-serif;
          background-color: #ecf0f1; /* Lighter background color */
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
          margin: 0;
          padding: 0;
        }

        .result-container {
          max-width: 800px;
          margin: 30px auto;
<<<<<<< HEAD
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
=======
          background-color: #ffffff; /* White background for the result box */
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .result-heading {
          font-size: 24px;
          font-weight: bold;
          color: #333;
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
          text-align: center;
          margin-bottom: 20px;
        }

<<<<<<< HEAD
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
=======
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
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
          font-weight: bold;
        }

        .recommendation-content {
<<<<<<< HEAD
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
=======
          color: #7f8c8d; /* Slightly lighter content color */
          margin-left: 10px;
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
        }

        .no-result {
          text-align: center;
          font-size: 18px;
          color: #e74c3c;
          margin-top: 20px;
          font-weight: bold;
        }

<<<<<<< HEAD
        /* Responsive Styles */
=======
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
        @media (max-width: 768px) {
          .result-container {
            padding: 15px;
            width: 90%;
          }

          .result-heading {
<<<<<<< HEAD
            font-size: 22px;
          }

          .section-heading {
            font-size: 18px;
=======
            font-size: 20px;
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
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
