import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";

import Todos from "./components/Todos"; // new
import Dashboard from "./components/Dashboard"; // new
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        {/* <Route exact path="/todo" component={Todos} />
        <Route path="/dashboard" component={Dashboard} /> */}
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
