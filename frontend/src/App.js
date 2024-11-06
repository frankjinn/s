// App.js
import "./App.css";
import { Router, Switch, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Todos from "./pages/Todos";
import PatientTable from "./pages/patientTable/PatientTable";
import NavBar from "./pages/NavBar";

function App() {
  return (
    <>
      <Router>
        <NavBar style={{ position: "relative", zIndex: "1" }} />
        <Switch>
          <Route
            path="/"
            element={<Dashboard />}
            style={{ position: "relative", zIndex: "5" }}
          />
          <Route path="/todos" element={<Todos />} />
          <Route path="/patients" element={<PatientTable />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
