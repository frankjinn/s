// App.js
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Todos from "./pages/Todos";
import PatientTable from "./pages/patientTable/PatientTable";
import Navbar from "./components/Navbar";
import MyCalendar from "./pages/calendar/MyCalendar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/patients" element={<PatientTable />} />
        <Route path="/schedule" element={<MyCalendar />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </>
  );
}

export default App;
