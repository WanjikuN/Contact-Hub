import logo from "./logo.svg";
import React from "react";
import { Routes, Route, Link } from 'react-router-dom'; 
import "./App.css";
import NavbarComp from "./Components/Navbar";
import Contacts from "./Components/Contacts";
function App() {
  return (
    <div className="App">
      <NavbarComp />
      <Routes>
          <Route exact path='/contacts' element={<Contacts />} />
      </Routes>
      
    </div>
  );
}

export default App;
