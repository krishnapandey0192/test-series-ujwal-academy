// import React from "react";
import { Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Banner from "./components/Banner";
import About from "./components/About";
import Courses from "./components/Courses";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Leaderboard from "./components/Leaderboard";

function App() {
  return (
    <>
      <Hero />
      <Banner />
      <About />
      <Courses />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
}

export default App;
