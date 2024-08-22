import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TravelRecommendation from "./pages/TravelRecommendation";
import RecommendationResult from "./pages/RecommendationResult";
import SpotDetail from "./pages/SpotDetail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recommend" element={<Layout><TravelRecommendation /></Layout>} />
        <Route path="/result" element={<Layout><RecommendationResult /></Layout>} />
        <Route path="/spot" element={<Layout><SpotDetail /></Layout>} />      
      </Routes>
    </Router>
  );
}

export default App;
