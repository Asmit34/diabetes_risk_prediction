import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
<<<<<<< HEAD
    if (!formData.firstName) newErrors.firstName = "First name is required.";
    if (!formData.lastName) newErrors.lastName = "Last name is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
=======
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    // If no errors, return true, else false
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

<<<<<<< HEAD
    if (validateForm()) {
      try {
=======
    // Validate form before submitting
    if (validateForm()) {
      try {
        // Send data to the backend API
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
        const response = await axios.post("http://localhost:8000/register", {
          first_name: formData.firstName,
          last_name: formData.lastName,
          gender: formData.gender,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
        });

<<<<<<< HEAD
        setSuccessMessage("Registration successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        if (error.response) {
          setErrors({ apiError: error.response.data.detail || "An error occurred." });
        } else {
          setErrors({ apiError: "An unexpected error occurred. Please try again." });
=======
        // Show success message
        setSuccessMessage("Registration successful. You can now log in.");
        console.log("Registration successful:", response.data);

        // Redirect to login page
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        if (error.response) {
          // Server responded with an error
          setErrors({ apiError: error.response.data.detail || "An error occurred" });
          console.error("Registration failed:", error.response.data);
        } else {
          // Network or other errors
          setErrors({ apiError: "An unexpected error occurred. Please try again." });
          console.error("Error:", error);
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
        }
      }
    }
  };

  return (
<<<<<<< HEAD
    <div className="container mt-5">
      <style>
        {`
          .card {
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            background-color: #ffffff;
          }
          .card-header {
            background: linear-gradient(135deg, #00c6ff, #0072ff);
            color: white;
            text-align: center;
            padding: 20px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
          }
          .card-header h3 {
            margin: 0;
            font-size: 1.8rem;
          }
          .form-group label {
            font-weight: bold;
          }
          .form-control {
            border-radius: 5px;
            padding: 10px;
          }
          .btn-success {
            background-color: #28a745;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 1.1rem;
            transition: all 0.3s ease;
          }
          .btn-success:hover {
            background-color: #218838;
          }
          .text-danger {
            font-size: 0.9rem;
          }
          .text-success {
            font-size: 1rem;
            font-weight: bold;
            text-align: center;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #666;
            font-size: 0.9rem;
          }
          .text-primary {
            cursor: pointer;
            font-weight: bold;
          }
          .text-primary:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3><i className="fa fa-user"></i> Signup</h3>
=======
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header text-center bg-info text-white">
              <h3><i className="fa fa-user"></i> User Registration Form</h3>
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData.firstName}
<<<<<<< HEAD
                    onChange={handleChange}
=======
                    // value={firstName}
                    onChange={handleChange}
                    // onChange={(e) => setFirstName(e.target.value)}
                    // required
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
                  />
                  {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
<<<<<<< HEAD
                    onChange={handleChange}
=======
                    // value={lastName}
                    onChange={handleChange}
                    // onChange={(e) => setLastName(e.target.value)}
                    // required
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
                  />
                  {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                </div>

                <div className="form-group">
<<<<<<< HEAD
                  <label>Gender</label>
=======
                  <label>Gender:</label>
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
                  <div>
                    <label className="mr-3">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
<<<<<<< HEAD
                      /> Male
=======
                      />{" "}
                      Male
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
<<<<<<< HEAD
                      /> Female
=======
                      />{" "}
                      Female
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
                    </label>
                  </div>
                  {errors.gender && <small className="text-danger">{errors.gender}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter E-mail Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
<<<<<<< HEAD
                    placeholder="Enter Phone Number"
=======
                    placeholder="Enter your Phone Number"
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
<<<<<<< HEAD
                    placeholder="Enter Address"
=======
                    placeholder="Enter your Address"
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
                    value={formData.address}
                    onChange={handleChange}
                  />
                  {errors.address && <small className="text-danger">{errors.address}</small>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
<<<<<<< HEAD
                    placeholder="Enter Password"
=======
                    placeholder="Enter Your Password"
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                {errors.apiError && <p className="text-danger">{errors.apiError}</p>}
<<<<<<< HEAD
                {successMessage && (
                  <p className="text-success" aria-live="polite">
                    {successMessage}
                  </p>
                )}

                <button type="submit" className="btn btn-success btn-block mt-3">
=======
                {successMessage && <p className="text-success">{successMessage}</p>}

                <button type="submit" className="btn btn-success btn-block">
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
                  Register
                </button>
              </form>

              <div className="text-center mt-3">
<<<<<<< HEAD
                Already a Member?{" "}
                <span className="text-primary" onClick={() => navigate("/login")}>
=======
                Already a Member?
                <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
                  Login here
                </span>
              </div>
            </div>
          </div>
<<<<<<< HEAD
          <div className="footer">&copy; 2025 Diabetes Awareness System</div>
=======
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Signup;
=======
export default Signup;
>>>>>>> ed7611ae3604b226d42bb1657982103d8034da7c
