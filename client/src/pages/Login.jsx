import { useState } from "react";

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  return (
    <div>
      <h1>LOGIN PAGE</h1>

      <input
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value
          })
        }
      />
    </div>
  );
}

export default Login;