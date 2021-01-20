import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/navbar";
import Routes from './routes'

export default function App() {
  return (
    <Router>

      <NavBar />

      <Routes />

    </Router>
  );
}
