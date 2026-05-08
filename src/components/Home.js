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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      setLoading(false);
    }
  };

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
    </div>
  );
};

export default Home;