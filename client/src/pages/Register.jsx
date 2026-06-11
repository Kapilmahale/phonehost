import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
        const res = await axios.post( "http://localhost:5000/api/auth/register",form);

        navigate("/login");
      } catch (err) {
        alert(
          err.response.data.message
        );
      }
    };

  return (
    <form onSubmit={handleSubmit}>

      <input name="name" placeholder="Name" onChange={handleChange}/>

      <input name="email" placeholder="Email"
        onChange={handleChange} />

      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      <button> Register </button>

      <p> Already have an account? <Link to="/login"> Login </Link> </p>

    </form>
  );
}

export default Register;