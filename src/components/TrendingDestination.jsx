import React from 'react';
import '../styles/TrendingDestination.css';

const TrendingDestination = ({ title, description }) => (
  <div className="destination">
    <div className="image-placeholder"></div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default TrendingDestination;