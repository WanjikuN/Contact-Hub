import logo from "./logo.svg";
import React from "react";
//import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavbarComp from "./Components/Navbar/Navbar";
import LoginSignup from "./Components/LoginSignup/LoginSignup";

function App() {
  return (
    <div className="App">
      <NavbarComp />
      <h2>Contact Hub</h2>
      {/* <Routes>
        <Route path="/" />
      </Routes> */}
      <LoginSignup />
    </div>
  );
}

export default App;
