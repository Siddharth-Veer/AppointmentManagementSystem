// import React, { useState } from "react";
// import {
//   auth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../css/SignUp.css";

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [dateOfBirth, setDateOfBirth] = useState("");
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password || !dateOfBirth) {
//       setError("Please fill in all fields");
//       return;
//     }

//     try {
//       // Firebase sign-up
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       if (user) {
//         await updateProfile(user, { displayName: name });
//         console.log("User signed up:", user);

//         // Save user details in MongoDB
//         const idNo = generateUniqueId(); // Implement this function as needed
//         await axios.post("http://localhost:5000/api/auth/register", {
//           idNo,
//           name,
//           email,
//           dateOfBirth,
//         });

//         setSuccessMessage("User signed up successfully!");
//         navigate("/signin", { state: { name } }); // Redirect to Sign In page
//       }
//     } catch (error) {
//       console.error("Error during sign-up:", error);

//       // Handling specific Firebase errors
//       if (error.code === "auth/email-already-in-use") {
//         setError("This email is already in use.");
//       } else {
//         setError("Error during sign-up: " + error.message);
//       }
//     }
//   };

//   const generateUniqueId = () => {
//     // Implement your unique ID generation logic here
//     return Math.random().toString(36).substr(2, 9); // Example unique ID
//   };

import React, { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !dateOfBirth) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Firebase sign-up
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, { displayName: name });

        // Save user details in MongoDB
        const idNo = generateUniqueId();
        await axios.post("http://localhost:5000/api/auth/register", {
          idNo,
          name,
          email,
          dateOfBirth,
        });

        setSuccessMessage("User signed up successfully!");
        navigate("/signin", { state: { name } });
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else {
        setError("Error during sign-up: " + error.message);
      }
    }
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
