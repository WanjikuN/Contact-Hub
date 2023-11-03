import logo from "./logo.svg";
import React from "react";
import { Routes, Route, Link } from 'react-router-dom'; 
import "./App.css";
import NavbarComp from "./Components/Navbar";
import Contacts from "./Components/Contacts";
import Organizations from "./Components/Organizations";
import OrganizationDetails from "./Components/OrganizationDetails";
import Profile from "./Components/Profile";
import NavbarComp from "./Components/Navbar/Navbar";
import LoginSignup from "./Components/LoginSignup/LoginSignup";

function App() {
  return (
    <div className="App">
      <NavbarComp />
      <Routes>
          <Route exact path='/' element={<LoginSignup />} />
          <Route  path='/contacts' element={<Contacts />} />
          <Route  path='/contacts/:id' element={<Profile />} />
          <Route  path='/organizations' element={<Organizations />} />
          <Route path="/organizations/:id" element={<OrganizationDetails />} />
          
      </Routes>
      
      
      
    </div>
  );
}

export default App;
