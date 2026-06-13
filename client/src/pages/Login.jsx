import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {GoogleLogin} from "@react-oauth/google";
import Dashboard from "./Dashboard";  

import { FaEnvelope, FaLock } from "react-icons/fa";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "",password: ""});

  const googleSuccess =async(response)=>{
  try{

   const res =await axios.post( `/api/auth/google`,
    {
      credential:
      response.credential
    }

   );

   console.log("Google Response:", res.data);
   console.log("Token:", res.data.token);


   localStorage.setItem( "token", res.data.token);

   console.log(res.data);

   console.log( "Stored Token:", localStorage.getItem("token")
);

   navigate( "/dashboard");
 }
 catch(error){
   console.log(error);
 }

};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "/api/auth/login", form );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||"Login Failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-icon">🔐</div>

        <div className="login-title">Login</div>

        <div className="title-line"></div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>

        <div className="divider">
          <hr />
          <span>OR</span>
        </div>

        <div className="google-section">
          <h3>Sign in with Google</h3>
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={() => console.log("Google Login Failed")}
          />
        </div>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;