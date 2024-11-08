// App.js
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Covered from "./pages/Covered"; // Import the new page
import Dashboard from "./pages/dashboard/Dashboard";
import Todos from "./pages/Todos";
import PatientTable from "./pages/patientTable/PatientTable";
import CustomSidenav from "./pages/CustomSidenav";

function App() {
  return (
    <div className="Home" style={{ display: "flex", minHeight: "100vh" }}>
      <CustomSidenav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/patients" element={<PatientTable />} />
        <Route path="/covered" element={<Covered />} />
      </Routes>
    </div>
  );
}

export default App;
