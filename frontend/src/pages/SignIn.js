// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate, useLocation } from "react-router-dom";
// import "../css/SignIn.css";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       if (user) {
//         console.log("User signed in:", user);
//         const name = location.state?.name || "User";
//         navigate("/book-appointment", { state: { name } }); // Pass the user's name to AppointmentBooking
//       } else {
//         setError("Failed to sign in");
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>Sign In</h2>
//         {error && <p className="error">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Sign In</button>
//           <p>
//             <a href="/forgot-password" className="forgot-password-link">
//               Forgot Password?
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        // Fetch the user name from the server
        const response = await axios.get(
          "http://localhost:5000/api/auth/user",
          { params: { email } }
        );
        const userName = response.data.name;

        // Set session or local storage as needed here
        localStorage.setItem("userName", userName);

        navigate("/book-appointment", { state: { name: userName } });
      } else {
        setError("Failed to sign in");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Sign In</button>
          <p>
            <a href="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
