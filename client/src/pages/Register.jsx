import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post( "/api/auth/register",form);

        navigate("/login");
      } catch (err) {
        alert(
          err.response.data.message
        );
      }
    };

  return (
     <div className="login-container">
      <div className="login-card">

        <div className="login-icon">👤</div>

        <div className="login-title">
          Register
        </div>

        <div className="title-line"></div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="login-btn"
          >
            Register
          </button>

        </form>

        <p className="register-link">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;