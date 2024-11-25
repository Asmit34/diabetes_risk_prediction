import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const Home = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    polyuria: '',
    polydipsia: '',
    suddenWeightLoss: '',
    weakness: '',
    polyphagia: '',
    genitalThrush: '',
    visualBlurring: '',
    itching: '',
    irritability: '',
    delayedHealing: '',
    partialParesis: '',
    muscleStiffness: '',
    alopecia: '',
    obesity: '',
  });

  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  // Handle change in form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (formData[field] === '') {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').toUpperCase()} is required`;
      }
    });

    // Specific validation for binary inputs
    const booleanFields = [
      'polyuria', 'polydipsia', 'suddenWeightLoss', 'weakness', 'polyphagia',
      'genitalThrush', 'visualBlurring', 'itching', 'irritability', 'delayedHealing',
      'partialParesis', 'muscleStiffness', 'alopecia', 'obesity'
    ];

    booleanFields.forEach((field) => {
      if (formData[field] !== '0' && formData[field] !== '1') {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1').toUpperCase()} should be either 0 or 1`;
      }
    });

    // Specific validation for the 'age' field
    if (formData.age && (isNaN(formData.age) || formData.age <= 0 || formData.age > 120)) {
      newErrors.age = 'Please enter a valid age (between 1 and 120).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      try {
        const res = await fetch('http://localhost:8000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await res.json();
        console.log('API Response:', result); // Log the response to check

        if (res.ok) {
          // Ensure diabetesStatus is mapped as true or false
          setResponse({
            diabetesStatus: result.diabetesStatus === 1 ? true : false,  // Ensure proper mapping here
            recommendation: result.recommendation,
            probability: result.probability.toFixed(2), // Limit probability to 2 decimal places
          });

          // Passing result state while navigating to /result
          navigate('/Result', { state: { result } });
        } else {
          setResponse({
            error: result.detail || 'Something went wrong',
          });
        }
      } catch (error) {
        setResponse({
          error: 'An error occurred while processing your request.',
        });
        console.error('Error submitting form:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  // Function to focus on the next input field when "Enter" is pressed
  const handleKeyDown = (e, nextField) => {
    if (e.key === 'Enter') {
      const nextInput = document.getElementById(nextField);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-4">Diabetes Prediction Form</h2>
      <form onSubmit={handleSubmit} className="form-container">
        {/* Form inputs */}
        {Object.keys(formData).map((field, index) => {
          const nextField = Object.keys(formData)[index + 1];
          return (
            <div key={field} className="mb-3 form-group">
              <label htmlFor={field} className="form-label">
                {field.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </label>
              <input
                type="text"
                className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyDown(e, nextField)}  
                placeholder={`Enter ${field}`}
              />
              {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
            </div>
          );
        })}

        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {response && (
        <div className="mt-4">
          <h3>Result:</h3>
          {response.error ? (
            <p className="text-danger">{response.error}</p>
          ) : (
            <>
              <p>Diabetes Status: {response.diabetesStatus ? 'True' : 'False'}</p>
              <p>Recommendation: {response.recommendation}</p>
              <p>Probability: {response.probability}</p>
            </>
          )}
        </div>
      )}
      {/* Internal CSS */}
      <style>
        {`
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(to bottom right, #f0f4f8, #cfe2f3);
            border-radius: 12px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }

          .form-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
          }

          .form-label {
            font-weight: bold;
            color: #444;
          }

          .btn-primary {
            background-color: #007bff;
            border-color: #007bff;
            font-weight: bold;
            padding: 12px 20px;
            border-radius: 5px;
            transition: background-color 0.3s;
          }

          .btn-primary:hover {
            background-color: #0056b3;
            border-color: #004085;
          }

          .btn-primary:disabled {
            background-color: #cccccc;
            border-color: #cccccc;
          }

          .btn-block {
            width: 100%;
            padding: 12px;
            border-radius: 5px;
            font-size: 16px;
          }

          .invalid-feedback {
            display: block;
            color: #dc3545;
            font-size: 0.875em;
          }

          .form-text {
            font-size: 0.9em;
          }

          .text-center {
            text-align: center;
          }

          .mb-3 {
            margin-bottom: 15px;
          }
        `}
      </style>
      
    </div>
  );
};

export default Home;
