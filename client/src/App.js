import logo from "./logo.svg";
import React from "react";
import { Routes, Route, Link } from 'react-router-dom'; 
import "./App.css";
import NavbarComp from "./Components/Navbar";
import Contacts from "./Components/Contacts";
import Organizations from "./Components/Organizations";
function App() {
  return (
    <div className="App">
      <NavbarComp />
      <Routes>
          <Route exact path='/contacts' element={<Contacts />} />
          <Route exact path='/organizations' element={<Organizations />} />

      </Routes>
      
    </div>
  );
}

export default App;
