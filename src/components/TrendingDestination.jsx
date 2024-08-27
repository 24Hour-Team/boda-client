import React from 'react';
import styles from '../styles/TrendingDestination.module.css';

const TrendingDestination = ({ title, description }) => (
  <div className={styles.destination}>
    <div className={styles.imagePlaceholder}></div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default TrendingDestination;
