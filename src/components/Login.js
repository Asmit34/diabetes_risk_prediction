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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
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
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
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
    </div>
  );
};

export default Login;
