import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import './App.css'
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Resources from "./pages/Resources";
import DomeGallery from "./component/DomeGallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TemplateKit from "./pages/TemplateKit";
import Footer from "./pages/Footer";

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
         <Route path="/about" element={<About />} />
         <Route path="/template-kit" element={<TemplateKit />} />
         <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App