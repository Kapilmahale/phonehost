import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./index.css";
import App from "./App.jsx";

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <GoogleOAuthProvider
      clientId="165429758878-d4hh5k7biuvp1i46fd2nt0isoq8d3rv7.apps.googleusercontent.com"
    >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);