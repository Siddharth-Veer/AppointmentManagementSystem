// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../css/AppointmentBooking.css";
// import doctor1 from "../images/doctor-1.jpg";
// import doctor2 from "../images/doctor-2.jpg";
// import doctor3 from "../images/doctor-3.jpg";

// const doctors = [
//   {
//     id: 1,
//     name: "Dr. Nishant Clinician",
//     speciality: "Pediatrics",
//     contact: "123-456-7890",
//     profilePicture: doctor1,
//     appointments: [
//       { time: "10:00 AM", patient: "Alice" },
//       { time: "11:00 AM", patient: "Bob" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Dr. John Doe",
//     speciality: "Cardiology",
//     contact: "234-567-8901",
//     profilePicture: doctor2,
//     appointments: [{ time: "12:00 PM", patient: "Charlie" }],
//   },
//   {
//     id: 3,
//     name: "Dr. Jane Smith",
//     speciality: "Dermatology",
//     contact: "345-678-9012",
//     profilePicture: doctor3,
//     appointments: [{ time: "01:00 PM", patient: "David" }],
//   },
//   // Removed duplicate doctors
// ];

// const AppointmentBooking = () => {
//   const [selectedDoctor, setSelectedDoctor] = useState(null); // State for the selected doctor
//   const [selectedDate, setSelectedDate] = useState(new Date()); // State for the selected date
//   const [patientName, setPatientName] = useState(""); // State for the patient's name

//   // Fetch patient name on component mount
//   useEffect(() => {
//     const fetchPatientName = async () => {
//       try {
//         // Retrieve the email passed from SignIn and use it to fetch user details
//         const email = new URLSearchParams(window.location.search).get("email");
//         const response = await axios.get(
//           `http://localhost:5000/api/auth/user`,
//           {
//             params: { email }, // Send email as a query parameter
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`, // Token for authorization
//             },
//           }
//         );
//         setPatientName(response.data.name); // Update the patient's name in state
//       } catch (error) {
//         console.error("Error fetching patient name:", error);
//       }
//     };

//     fetchPatientName();
//   }, []);

//   // Generate days for the calendar
//   const populateDays = (year, month) => {
//     const firstDay = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const days = [];

//     for (let i = 0; i < firstDay; i++) {
//       days.push(<span key={`empty-${i}`}></span>); // Empty spaces for days before the 1st
//     }

//     for (let i = 1; i <= daysInMonth; i++) {
//       days.push(
//         <span key={i} onClick={() => handleDateChange(i, month, year)}>
//           {i}
//         </span>
//       );
//     }

//     return days;
//   };

//   // Handle date change when user selects a new day
//   const handleDateChange = (day, month, year) => {
//     const newDate = new Date(year, month, day);
//     setSelectedDate(newDate);
//   };

//   // Change to the previous month
//   const handlePrevMonth = () => {
//     const newDate = new Date(
//       selectedDate.setMonth(selectedDate.getMonth() - 1)
//     );
//     setSelectedDate(newDate);
//   };

//   // Change to the next month
//   const handleNextMonth = () => {
//     const newDate = new Date(
//       selectedDate.setMonth(selectedDate.getMonth() + 1)
//     );
//     setSelectedDate(newDate);
//   };

//   return (
//     <div className="appointment-booking">
//       <div className="top-menu">
//         <h2>Welcome {patientName}!</h2>
//         <div className="buttons">
//           <button className="appointment_btn">Appointments</button>
//           <button className="appointment_btn">Walk-In</button>
//         </div>
//       </div>
//       {selectedDoctor ? (
//         <div className="appointment-content">
//           <div className="appointment-header">
//             <img
//               src={selectedDoctor.profilePicture}
//               alt={selectedDoctor.name}
//               className="doctor-profile-picture"
//             />
//             <p>{selectedDoctor.name}</p>
//             <p>{selectedDoctor.speciality}</p>
//             <p>Contact: {selectedDoctor.contact}</p>
//             <button onClick={() => setSelectedDoctor(null)}>Go Back</button>
//           </div>
//           <div className="appointment-body">
//             <div className="left-sidebar">
//               <div className="calendar">
//                 <div className="calendar-header">
//                   <button onClick={handlePrevMonth}>&lt;</button>
//                   <span>
//                     {selectedDate.toLocaleString("default", { month: "long" })}{" "}
//                     {selectedDate.getFullYear()}
//                   </span>
//                   <button onClick={handleNextMonth}>&gt;</button>
//                 </div>
//                 <div className="calendar-body">
//                   <div className="day-names">
//                     <span>Sun</span>
//                     <span>Mon</span>
//                     <span>Tue</span>
//                     <span>Wed</span>
//                     <span>Thu</span>
//                     <span>Fri</span>
//                     <span>Sat</span>
//                   </div>
//                   <div className="days">
//                     {populateDays(
//                       selectedDate.getFullYear(),
//                       selectedDate.getMonth()
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="right-content">
//               <h2>Available Slots</h2>
//               <div className="appointment-slots">
//                 <div className="slots">
//                   <h3>Morning</h3>
//                   <div className="slot-times">
//                     <button>9:00 AM</button>
//                     <button>10:00 AM</button>
//                     <button>11:00 AM</button>
//                   </div>
//                 </div>
//                 <div className="slots">
//                   <h3>Evening</h3>
//                   <div className="slot-times">
//                     <button>3:00 PM</button>
//                     <button>4:00 PM</button>
//                     <button>5:00 PM</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="doctors-list">
//           <div className="doctors-table">
//             <div className="doctors-table-header">
//               <div className="doctors-table-cell">Doctor's Name</div>
//               <div className="doctors-table-cell">Speciality</div>
//               <div className="doctors-table-cell">Contact</div>
//             </div>
//             {doctors.map((doctor) => (
//               <div
//                 key={doctor.id}
//                 className="doctors-table-row"
//                 onClick={() => setSelectedDoctor(doctor)}
//               >
//                 <div className="doctors-table-cell">
//                   <img
//                     src={doctor.profilePicture}
//                     alt={doctor.name}
//                     className="doctor-profile-picture"
//                   />
//                   {doctor.name}
//                 </div>
//                 <div className="doctors-table-cell">{doctor.speciality}</div>
//                 <div className="doctors-table-cell">{doctor.contact}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentBooking;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../css/AppointmentBooking.css";
import doctor1 from "../images/doctor-1.jpg";
import doctor2 from "../images/doctor-2.jpg";
import doctor3 from "../images/doctor-3.jpg";

// Sample doctor data (you may want to fetch this from an API)
const doctors = [
  {
    id: 1,
    name: "Dr. Nishant Clinician",
    speciality: "Pediatrics",
    contact: "123-456-7890",
    profilePicture: doctor1,
    appointments: [
      { time: "10:00 AM", patient: "Alice" },
      { time: "11:00 AM", patient: "Bob" },
    ],
  },
  {
    id: 2,
    name: "Dr. John Doe",
    speciality: "Cardiology",
    contact: "234-567-8901",
    profilePicture: doctor2,
    appointments: [{ time: "12:00 PM", patient: "Charlie" }],
  },
  {
    id: 3,
    name: "Dr. Jane Smith",
    speciality: "Dermatology",
    contact: "345-678-9012",
    profilePicture: doctor3,
    appointments: [{ time: "01:00 PM", patient: "David" }],
  },
  // Removed duplicate doctors
];

const AppointmentBooking = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State for the selected doctor
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for the selected date
  const [patientName, setPatientName] = useState(""); // State for the patient's name
  const [appointments, setAppointments] = useState([]); // State for appointments
  const location = useLocation();

  // Fetch patient name and appointments on component mount
  useEffect(() => {
    // Retrieve the patient’s name from local storage or route state
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setPatientName(storedName);
    } else if (location.state && location.state.name) {
      setPatientName(location.state.name);
    }

    // Fetch appointments (example endpoint)
    axios
      .get("http://localhost:5000/api/appointments")
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error("Error fetching appointments:", error));
  }, [location.state]);

  // Generate days for the calendar
  const populateDays = (year, month) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<span key={`empty-${i}`}></span>); // Empty spaces for days before the 1st
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <span key={i} onClick={() => handleDateChange(i, month, year)}>
          {i}
        </span>
      );
    }

    return days;
  };

  // Handle date change when user selects a new day
  const handleDateChange = (day, month, year) => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
  };

  // Change to the previous month
  const handlePrevMonth = () => {
    const newDate = new Date(
      selectedDate.setMonth(selectedDate.getMonth() - 1)
    );
    setSelectedDate(newDate);
  };

  // Change to the next month
  const handleNextMonth = () => {
    const newDate = new Date(
      selectedDate.setMonth(selectedDate.getMonth() + 1)
    );
    setSelectedDate(newDate);
  };

  return (
    <div className="appointment-booking">
      <div className="top-menu">
        <h2>Welcome, {patientName}!</h2> {/* Display the patient's name */}
        <div className="buttons">
          <button className="appointment_btn">Appointments</button>
          <button className="appointment_btn">Walk-In</button>
        </div>
      </div>

      {/* Show available doctors */}
      {!selectedDoctor ? (
        <div className="doctors-list">
          <div className="doctors-table">
            <div className="doctors-table-header">
              <div className="doctors-table-cell">Doctor's Name</div>
              <div className="doctors-table-cell">Speciality</div>
              <div className="doctors-table-cell">Contact</div>
            </div>
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="doctors-table-row"
                onClick={() => setSelectedDoctor(doctor)}
              >
                <div className="doctors-table-cell">
                  <img
                    src={doctor.profilePicture}
                    alt={doctor.name}
                    className="doctor-profile-picture"
                  />
                  {doctor.name}
                </div>
                <div className="doctors-table-cell">{doctor.speciality}</div>
                <div className="doctors-table-cell">{doctor.contact}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="appointment-content">
          <div className="appointment-header">
            <img
              src={selectedDoctor.profilePicture}
              alt={selectedDoctor.name}
              className="doctor-profile-picture"
            />
            <p>{selectedDoctor.name}</p>
            <p>{selectedDoctor.speciality}</p>
            <p>Contact: {selectedDoctor.contact}</p>
            <button onClick={() => setSelectedDoctor(null)}>Go Back</button>
          </div>
          <div className="appointment-body">
            <div className="left-sidebar">
              <div className="calendar">
                <div className="calendar-header">
                  <button onClick={handlePrevMonth}>&lt;</button>
                  <span>
                    {selectedDate.toLocaleString("default", { month: "long" })}{" "}
                    {selectedDate.getFullYear()}
                  </span>
                  <button onClick={handleNextMonth}>&gt;</button>
                </div>
                <div className="calendar-body">
                  <div className="day-names">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>
                  <div className="days">
                    {populateDays(
                      selectedDate.getFullYear(),
                      selectedDate.getMonth()
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="right-content">
              <h2>Available Slots</h2>
              <div className="appointment-slots">
                <div className="slots">
                  <h3>Morning</h3>
                  <div className="slot-times">
                    <button>9:00 AM</button>
                    <button>10:00 AM</button>
                    <button>11:00 AM</button>
                  </div>
                </div>
                <div className="slots">
                  <h3>Evening</h3>
                  <div className="slot-times">
                    <button>3:00 PM</button>
                    <button>4:00 PM</button>
                    <button>5:00 PM</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;
