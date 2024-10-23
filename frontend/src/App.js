import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import Header from "./components/Header";
// import Todos from "./components/Todos"; // new
import Dashboard from "./components/Dashboard"; // new

function App() {
  return (
    <ChakraProvider>
      <Header />
      <Dashboard /> {/* new */}
    </ChakraProvider>
  );
}

export default App;
