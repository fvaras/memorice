import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../components/navbar";
import Routes from '../routes'

const Main = () => {
    return (
        <Router>
    
          <NavBar />
    
          <Routes />
    
        </Router>
      );
}

export default Main