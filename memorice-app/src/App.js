import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/navbar";
import Routes from './routes'
import ContentLayout from './layouts/content'

export default function App() {
  return (
    <Router>

      <NavBar />

      <ContentLayout>
        <Routes />
      </ContentLayout>

    </Router>
  );
}
