import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import Todos from "./components/Todos"; // new
import Dashboard from "./components/Dashboard"; // new
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      {/* <Todos></Todos> */}
      <Routes>
        <Route path="/todos" element={<Todos />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
