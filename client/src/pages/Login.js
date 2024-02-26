import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../utils/API";
import Auth from "../utils/auth";
import Header from "../components/Header";

export default function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);

  const loggedIn = Auth.loggedIn();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });

    // validate the input and update errors
    validateInput(name, value);
  };

  // validate individual input field
  const validateInput = (name, value) => {
    switch (name) {
      case "email":
        // It starts with one or more alphanumeric characters, dots, underscores, or hyphens.
        // Followed by the "@" symbol.
        // Followed by one or more alphanumeric characters, dots, or hyphens.
        // Followed by the "." symbol.
        // Ends with two to six alphabetical characters.

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

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check for validation errors before submitting
    if (validateForm()) {
      // use try/catch to handle errors
      try {
        const response = await loginUser(formState);

        if (!response.ok) {
          throw new Error("something went wrong");
        }

        const { token, user } = await response.json();
        Auth.login(token);
        alert("Login successful!");

      } catch (err) {
        console.error(err);
        alert("Login failed. Please check your credentials.");
      }

      // clear form values
      setFormState({
        email: "",
        password: "",
      });
    } else {
      // If there are validation errors, show alert
      setShowAlert(true);
    }
  };

  // validate the entire form
  const validateForm = () => {
    const { email, password } = formState;

    // validate each field
    validateInput("email", email);
    validateInput("password", password);

    // check if there are any errors
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
        {/* --------------------email-------------------- */}
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

        {/* -------------------- password-------------------- */}
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

        {/* --------------------login btn-------------------- */}
        <div className="btn-div">
          <button
            // disabled={!(formState.email && formState.password)}
            className="signup-btn mx-auto my-auto"
          >
            Login
          </button>
        </div>

        {/* --------------------signup link-------------------- */}
        <p className="link-btn">
          New to JigarWala Workout?{' '}
          <Link to="/signup" >Create one</Link>
        </p>
        {showAlert && <div className="err-message">Login failed / form is incomplete</div>}
      </form>
    </div>
  );
}










// import React, { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import { loginUser } from "../utils/API";
// import Auth from "../utils/auth";
// import Header from "../components/Header";

// export default function Login() {
//   const [formState, setFormState] = useState({ email: "", password: "" });
//   const [showAlert, setShowAlert] = useState(false);

//   const loggedIn = Auth.loggedIn();

//   // update state based on form input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

//   // submit form
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     // check the response
//     try {
//       const response = await loginUser(formState);

//       if (!response.ok) {
//         throw new Error("something went wrong");
//       }

//       // use authentication function
//       const { token, user } = await response.json();
//       Auth.login(token);
//       alert("Login successful!");

//     } catch (err) {
//       console.error(err);
//       alert("Login failed. Please check your credentials.");
//     }

//     // clear form values
//     setFormState({
//       email: "",
//       password: "",
//     });
//   };

//   // If the user is logged in, redirect to the home page
//   if (loggedIn) {
//     return <Navigate to="/" />;
//   }

//   return (
//     <div className="signup d-flex flex-column align-items-center justify-content-center text-center">
//       <Header />
//       <form onSubmit={handleFormSubmit} className="signup-form d-flex flex-column">
//         {/* --------------------email-------------------- */}
//         <label htmlFor="email">Email</label>
//         <input
//           className="form-input"
//           value={formState.email}
//           placeholder="youremail@gmail.com"
//           name="email"
//           type="email"
//           onChange={handleChange}
//         />

//         {/* -------------------- password-------------------- */}
//         <label htmlFor="password">Password</label>
//         <input
//           className="form-input"
//           value={formState.password}
//           placeholder="********"
//           name="password"
//           type="password"
//           onChange={handleChange}
//         />

//         {/* --------------------login btn-------------------- */}
//         <div className="btn-div">
//           <button disabled={!(formState.email && formState.password)}
//             className="signup-btn mx-auto my-auto">Login</button>
//         </div>
//         {/* --------------------signup link-------------------- */}
//         <p className="link-btn">
//           New to JigarWala Workout?{' '}
//           <Link to="/signup" >Create one</Link>
//         </p>
//         {showAlert && <div className="err-message">Login failed</div>}
//       </form>
//     </div>
//   );
// }
