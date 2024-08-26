import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TravelRecommendation from "./pages/TravelRecommendation";
import RecommendationResult from "./pages/RecommendationResult";
import SpotDetail from "./pages/SpotDetail";
import MyPage from "./pages/MyPage";
import UserInfo from "./pages/UserInfo";
import Bookmark from "./pages/Bookmark";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/recommend" element={<Layout><TravelRecommendation /></Layout>} />
        <Route path="/result/:resultId" element={<Layout><RecommendationResult /></Layout>} />
        <Route path="/spot/:spotId" element={<Layout><SpotDetail /></Layout>} /> 
        <Route path="/mypage" element={<Layout><MyPage /></Layout>} /> 
        <Route path="/userinfo" element={<Layout><UserInfo /></Layout>} />
        <Route path="/bookmark/:bookmarkId" element={<Layout><Bookmark /></Layout>} /> 
      </Routes>
    </Router>
  );
}

export default App;
