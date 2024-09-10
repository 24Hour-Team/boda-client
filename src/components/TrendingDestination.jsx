import React from 'react';
import styles from '../styles/TrendingDestination.module.css';

const TrendingDestination = ({ title, description, image }) => (
  <div className={styles.destination}>
    <div className={styles.imageContainer}>
      <img src={image} alt={title} className={styles.image} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default TrendingDestination;