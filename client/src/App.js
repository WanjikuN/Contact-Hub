import logo from "./logo.svg";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import NavbarComp from "./Components/Navbar";
import LoginSignup from "./Components/LoginSignup/LoginSignup";
import Contacts from "./Components/Contacts";
import Organizations from "./Components/Organizations";
import OrganizationDetails from "./Components/OrganizationDetails";
function App() {
  return (
    <div className="App">
      <NavbarComp />

      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/:id" element={<OrganizationDetails />} />
      </Routes>
    </div>
  );
}

export default App;
