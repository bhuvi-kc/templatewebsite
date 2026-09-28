import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import './App.css';
import Navbar from "./pages/Navbar";
import { InteractiveProvider, useInteractive } from "./context/InteractiveContext";
import FluidTrail from "./component/FluidTrail";
import InteractiveHUD from "./component/InteractiveHUD";

const Home = lazy(() => import("./pages/Home"));
const Resources = lazy(() => import("./pages/Resources"));
const DomeGallery = lazy(() => import("./component/DomeGallery"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const TemplateKit = lazy(() => import("./pages/Templatekit"));
const Footer = lazy(() => import("./pages/Footer"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function GlobalInteractivity() {
  const { fluidEnabled, activeTheme } = useInteractive();

  return (
    <>
      {fluidEnabled && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <FluidTrail
            color={activeTheme.color}
            mouseRadius={14}
            trailDuration={5.5}
          />
        </div>
      )}
      <InteractiveHUD />
    </>
  );
}

function App() {
  return (
    <InteractiveProvider>
      <BrowserRouter>
        <ScrollToTop />
        <GlobalInteractivity />
        <Navbar />
        <Suspense fallback={<main className="min-h-screen bg-[#080808]" aria-busy="true" />}>
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
        </Suspense>
      </BrowserRouter>
    </InteractiveProvider>
  );
}

export default App;
