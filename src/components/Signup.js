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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submitting
    if (validateForm()) {
      try {
        // Send data to the backend API
        const response = await axios.post("http://localhost:8000/register", {
          first_name: formData.firstName,
          last_name: formData.lastName,
          gender: formData.gender,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          password: formData.password,
        });

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
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-header text-center bg-info text-white">
              <h3><i className="fa fa-user"></i> User Registration Form</h3>
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
                    // value={firstName}
                    onChange={handleChange}
                    // onChange={(e) => setFirstName(e.target.value)}
                    // required
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
                    // value={lastName}
                    onChange={handleChange}
                    // onChange={(e) => setLastName(e.target.value)}
                    // required
                  />
                  {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                </div>

                <div className="form-group">
                  <label>Gender:</label>
                  <div>
                    <label className="mr-3">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                      />{" "}
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                      />{" "}
                      Female
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
                    placeholder="Enter your Phone Number"
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
                    placeholder="Enter your Address"
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
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>

                {errors.apiError && <p className="text-danger">{errors.apiError}</p>}
                {successMessage && <p className="text-success">{successMessage}</p>}

                <button type="submit" className="btn btn-success btn-block">
                  Register
                </button>
              </form>

              <div className="text-center mt-3">
                Already a Member?
                <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
                  Login here
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;