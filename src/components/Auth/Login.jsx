import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import your CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform authentication logic (e.g., API call)
    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Authentication successful, redirect to appropriate page
        navigate("/"); // Replace with your desired landing page
      } else {
        const data = await response.json();
        setError(data.error || "Authentication failed");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError("An error occurred during authentication");
    }
  };

  return (
    <div className="authentication-page">
      <h1>HCSTsync</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
