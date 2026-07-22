import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import DomeGallery from "./component/DomeGallery";

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route
          path="/gallery"
          element={
            <div
              className="fixed inset-0 top-20 w-screen"
              style={{ height: "calc(100vh - 80px)", background: "#080808" }}
            >
              <DomeGallery />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App