
import React, { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import Header from "../components/Header";

export default function Admin() {
    const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);

  const loggedIn = Auth.loggedIn();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Hardcoded admin credentials
    const adminCredentials = {
      email: "admin@example.com",
      password: "adminPassword",
    };

    // Check if entered credentials match the hardcoded admin credentials
    if (
      formState.email === adminCredentials.email &&
      formState.password === adminCredentials.password
    ) {
      // Hardcoded admin authentication
      Auth.login("adminToken"); // Use your admin token or authentication method

      // Redirect to admin page or perform necessary actions
      // For now, just log a message
      console.log("Admin login successful");
    } else {
      // Show alert for incorrect admin credentials
      setShowAlert(true);
    }

    // Clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  // If the user is logged in, redirect to the home page
  if (loggedIn) {
    // return <Navigate to="/admindashboard" />;
    return navigate('/admindashboard');
  }

  return (
    <div className="signup d-flex flex-column align-items-center justify-content-center text-center">
     
      <form onSubmit={handleFormSubmit} className="signup-form d-flex flex-column">
        {/* --------------------email-------------------- */}
        <label htmlFor="email">Admin Email</label>
        <input
          className="form-input"
          value={formState.email}
          placeholder="admin@example.com"
          name="email"
          type="email"
          onChange={handleChange}
        />

        {/* -------------------- password-------------------- */}
        <label htmlFor="password">Admin Password</label>
        <input
          className="form-input"
          value={formState.password}
          placeholder="********"
          name="password"
          type="password"
          onChange={handleChange}
        />

        {/* --------------------login btn-------------------- */}
        <div className="btn-div">
            <button className="btn btn-primary" type="submit">Login</button>
          {/* <button
            disabled={!(formState.email && formState.password)}
            className="signup-btn mx-auto my-auto"
          >
            Admin Login
          </button> */}
        </div>
        {/* --------------------error message-------------------- */}
        {showAlert && <div className="err-message">Admin login failed</div>}
      </form>
    </div>
  );
}
