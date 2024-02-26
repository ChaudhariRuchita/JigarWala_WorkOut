import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { createUser } from "../utils/API";
import Auth from "../utils/auth";
import Header from "../components/Header";

export default function Signup() {
  const loggedIn = Auth.loggedIn();

  // Set up the original state of the form
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Set up state for validation errors
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // Update state based on form input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    // Validate the input and update errors
    validateInput(name, value);
  };

  // Validate individual input field
  const validateInput = (name, value) => {
    switch (name) {
      case "username":
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: value.length < 3 ? "Username must be at least 3 characters long" : "",
        }));
        break;
      case "email":
        // Email validation with regular expression
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: emailRegex.test(value) ? "" : "Invalid email address",
        }));
        break;
      case "password":
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: value.length < 6 ? "Password must be at least 6 characters long" : "",
        }));
        break;
      default:
        break;
    }
  };

  // Submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check for validation errors before submitting
    if (validateForm()) {
      // Use try/catch to handle errors
      try {
        // Create new user
        const response = await createUser(formState);

        // Check the response
        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message || "Something went wrong!");
        }

        // Get token and user data from the server
        const { token, user } = await response.json();

        // Use authentication functionality
        Auth.login(token);
        alert("Signup successful!");
      } catch (err) {
        console.error(err);
        // Display error message
        alert(err.message);
      }
    } else {
      // If there are validation errors, show alert
      setShowAlert(true);
    }
  };

  // Validate the entire form
  const validateForm = () => {
    const { username, email, password } = formState;

    // Validate each field
    validateInput("username", username);
    validateInput("email", email);
    validateInput("password", password);

    // Check if there are any errors
    return Object.values(errors).every((error) => error === "");
  };

  // If the user is logged in, redirect to the home page
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="signup d-flex flex-column align-items-center justify-content-center text-center">
      <Header />
      <form onSubmit={handleFormSubmit} className="signup-form d-flex flex-column">
        <label htmlFor="username">Username</label>
        <input
          className="form-input"
          value={formState.username}
          placeholder="Your username"
          name="username"
          type="text"
          onChange={handleChange}
        />
        {errors.username && <div className="error-message">{errors.username}</div>}

        <label htmlFor="email">Email</label>
        <input
          className="form-input"
          value={formState.email}
          placeholder="youremail@gmail.com"
          name="email"
          type="email"
          onChange={handleChange}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}

        <label htmlFor="password">Password</label>
        <input
          className="form-input"
          value={formState.password}
          placeholder="********"
          name="password"
          type="password"
          onChange={handleChange}
        />
        {errors.password && <div className="error-message">{errors.password}</div>}

        <div className="btn-div">
          <button className="signup-btn mx-auto my-auto">Sign Up</button>
        </div>

        <p className="link-btn">
          Already have an account?{' '}
          <Link to="/login">Log in</Link>
        </p>
        {showAlert && <div className="err-message">Signup failed or form is incomplete</div>}
      </form>
    </div>
  );
}
