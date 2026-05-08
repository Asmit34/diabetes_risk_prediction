<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../image/background.jpg";

const Home = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    polyuria: "",
    polydipsia: "",
    suddenWeightLoss: "",
    weakness: "",
    polyphagia: "",
    genitalThrush: "",
    visualBlurring: "",
    itching: "",
    irritability: "",
    delayedHealing: "",
    partialParesis: "",
    muscleStiffness: "",
    alopecia: "",
    obesity: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

=======
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
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

<<<<<<< HEAD
  // ✅ validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.age || isNaN(formData.age)) {
      newErrors.age = "Valid age is required";
    }

    if (!["0", "1"].includes(formData.sex)) {
      newErrors.sex = "Sex is required";
    }

    const binaryFields = [
      "polyuria",
      "polydipsia",
      "suddenWeightLoss",
      "weakness",
      "polyphagia",
      "genitalThrush",
      "visualBlurring",
      "itching",
      "irritability",
      "delayedHealing",
      "partialParesis",
      "muscleStiffness",
      "alopecia",
      "obesity",
    ];

    binaryFields.forEach((field) => {
      if (!["0", "1"].includes(formData[field])) {
        newErrors[field] = "Must be 0 (No) or 1 (Yes)";
      }
    });

=======
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

>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

<<<<<<< HEAD
=======
  // Handle form submission
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

<<<<<<< HEAD
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const payload = {
        age: Number(formData.age),
        sex: Number(formData.sex), // 👈 Male/Female converted to 1/0
        polyuria: Number(formData.polyuria),
        polydipsia: Number(formData.polydipsia),
        suddenWeightLoss: Number(formData.suddenWeightLoss),
        weakness: Number(formData.weakness),
        polyphagia: Number(formData.polyphagia),
        genitalThrush: Number(formData.genitalThrush),
        visualBlurring: Number(formData.visualBlurring),
        itching: Number(formData.itching),
        irritability: Number(formData.irritability),
        delayedHealing: Number(formData.delayedHealing),
        partialParesis: Number(formData.partialParesis),
        muscleStiffness: Number(formData.muscleStiffness),
        alopecia: Number(formData.alopecia),
        obesity: Number(formData.obesity),
      };

      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      console.log("PREDICT RESPONSE:", result);

      if (res.ok) {
        navigate("/Result", { state: { result } });
      } else {
        alert(result.detail || "Prediction failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server error");
    } finally {
=======
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
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
      setLoading(false);
    }
  };

<<<<<<< HEAD
  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container p-4"
        style={{
          maxWidth: "850px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h2 className="text-center mb-4">Diabetes Prediction Form</h2>

        <form onSubmit={handleSubmit}>
          {/* AGE */}
          <div className="mb-3">
            <label>Age</label>
            <input
              type="number"
              name="age"
              className={`form-control ${errors.age ? "is-invalid" : ""}`}
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <div className="text-danger">{errors.age}</div>}
          </div>

          {/* SEX - FIXED ✔ */}
          <div className="mb-3">
            <label>Sex</label>
            <select
              name="sex"
              className={`form-control ${errors.sex ? "is-invalid" : ""}`}
              value={formData.sex}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
            {errors.sex && <div className="text-danger">{errors.sex}</div>}
          </div>

          {/* OTHER FIELDS */}
          {Object.keys(formData)
            .filter((f) => f !== "age" && f !== "sex")
            .map((field) => (
              <div className="mb-3" key={field}>
                <label>{field}</label>

                <select
                  name={field}
                  className={`form-control ${
                    errors[field] ? "is-invalid" : ""
                  }`}
                  value={formData[field]}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="0">No (0)</option>
                  <option value="1">Yes (1)</option>
                </select>

                {errors[field] && (
                  <div className="text-danger">{errors[field]}</div>
                )}
              </div>
            ))}

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Predicting..." : "Submit"}
          </button>
        </form>
      </div>
=======
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
      
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
    </div>
  );
};

<<<<<<< HEAD
export default Home;
=======
export default Home;
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
