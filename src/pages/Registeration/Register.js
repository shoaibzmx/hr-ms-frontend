import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("https://hr-ms-backend.vercel.app/api/auth/register", formData);
       console.log("Registration successful:", res.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
   <>
    
    <div className="register-container">
    <div className="icon-box">
        ☐ <span>Logo</span>
      </div>
      <div className="register-box">
        <div className="left-section">
          <img
            src={`${process.env.PUBLIC_URL}/register.png`}
            alt="Profile"
            className="register-pic"
            style={{ height: "200px", width: "100%" }}
          />
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit asdb aksdkadb kadjassd</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit asdb aksdkadb kadjassd dakjdah akdkajdhkadh adkjsdadkhd kjajdaskjdhhask jkasdkajdakdh sdajksdkjasdhkjh.</p>
        </div>
        <div className="right-section">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group password-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group password-field">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={handleChange}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit" className="register-btn">
              Register
            </button>
          </form>
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
