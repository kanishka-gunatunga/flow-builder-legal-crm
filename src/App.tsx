import "reactflow/dist/style.css";
import FlowPanel from "./components";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import English from "./pages/English";
import Sinhala from "./pages/Slinhala";
import Tamil from "./pages/Tamil";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/english" element={<English />} />
        <Route path="/sinhala" element={<Sinhala />} />
        <Route path="/tamil" element={<Tamil />} />
      </Routes>
    </>
  );
}

export default App;
