<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../image/background.jpg";

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // For displaying server error messages
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
<<<<<<< HEAD
    const formErrors = {};

    if (!formData.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
=======
    let formErrors = {};

    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("STATUS:", response.status);
      console.log("RESPONSE:", data);

      if (response.ok) {
        // backend returns: { message, user }
        localStorage.setItem("user", data.user);

        setIsLoggedIn(true);

        navigate("/home");
      } else {
        setErrorMessage(data.detail || "Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Server error. Please try again later.");
    } finally {
      setLoading(false);
=======
    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      setLoading(true);
      setErrorMessage('');

      try {
        // Make API call for authentication
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          // Store authentication token (or user data) in localStorage or cookies
          localStorage.setItem('authToken', data.token); // Assuming the token is in the response

          // Redirect to the home page after successful login
          navigate('/home');
        } else {
          setErrorMessage(data.message || 'Either email or password is incorrect');
        }
      } catch (error) {
        setErrorMessage('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
    }
  };

  return (
<<<<<<< HEAD
    <div className="login-container">
      <div className="overlay"></div>

      <div className="login-box">
        <div className="card">
          <div className="card-header">
            <h3>User Login</h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <small className="error">{errors.email}</small>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <small className="error">{errors.password}</small>}
              </div>

              {errorMessage && (
                <div className="alert">{errorMessage}</div>
              )}

              <button
                type="submit"
                className="btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text">
              Not a member?{" "}
              <span onClick={() => navigate("/signup")}>
                Register here
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .login-container {
          height: 100vh;
          background: url(${backgroundImage}) center/cover;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
        }

        .login-box {
          position: relative;
          z-index: 2;
          width: 350px;
        }

        .card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .card-header {
          background: linear-gradient(135deg, #00c6ff, #0072ff);
          color: white;
          text-align: center;
          padding: 15px;
        }

        .card-body {
          padding: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-control {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .btn {
          width: 100%;
          padding: 10px;
          background: #28a745;
          border: none;
          color: white;
          border-radius: 8px;
          cursor: pointer;
        }

        .btn:hover {
          background: #218838;
        }

        .btn:disabled {
          opacity: 0.7;
        }

        .error {
          color: red;
          font-size: 12px;
        }

        .alert {
          background: #f8d7da;
          color: #721c24;
          padding: 10px;
          margin-top: 10px;
          border-radius: 8px;
        }

        .text {
          text-align: center;
          margin-top: 10px;
        }

        .text span {
          color: blue;
          cursor: pointer;
        }
      `}</style>
=======
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header text-center bg-info text-white">
              <h3><i className="fa fa-user"></i> User Login</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Email input field */}
                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    placeholder="Enter E-mail Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="text-danger">{errors.email}</span>}
                </div>

                {/* Password input field */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <span className="text-danger">{errors.password}</span>}
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-success btn-block" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              {errorMessage && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}

              <div className="text-center mt-3">
                Not Yet a Member? <span
                  className="text-primary" 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => navigate('/signup')}>
                  Register here
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
