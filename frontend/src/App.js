// App.js
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Todos from "./components/Todos";
import PatientTable from "./components/PatientTable"; 

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/todos" element={<Todos />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<PatientTable />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
