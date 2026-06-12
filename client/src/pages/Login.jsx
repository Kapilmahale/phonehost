import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {GoogleLogin} from "@react-oauth/google";
import { API_URL } from "../config";  
import Dashboard from "./Dashboard";  

const googleSuccess =async(response)=>{
  try{

   const res =await axios.post( `/api/auth/google`,
    {
      credential:
      response.credential
    }

   );

   localStorage.setItem( "token", res.data.token);

   console.log(res.data);

   navigate( "/dashboard");
 }
 catch(error){
   console.log(error);
 }

};

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "",password: ""});

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
    <div style={{
        maxWidth: "400px",
        margin: "100px auto",
        padding: "20px",
        border: "1px solid #0d0d0d",
        borderRadius: "10px",
      }}
    >
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange}
          style={{
            width: "90%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input name="password" type="password" placeholder="Password"
          value={form.password} onChange={handleChange}
          style={{
            width: "90%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button type="submit" style={{ width: "90%", padding: "10px",background:"green"}}>
          Login
        </button>
      </form>
      
      <hr />

      <h3> Sign in with Google </h3>

      <GoogleLogin onSuccess={googleSuccess}  onError={()=>{
         console.log(
           "Google Login Failed"
         );
       }}
     />

      <p style={{ marginTop: "15px" }}>
        Don't have an account?{" "}
        <Link to="/register" style={{color:"blueviolet"}}> Register </Link>
      </p>
    </div>
  );
}

export default Login;