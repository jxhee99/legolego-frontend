import React from 'react';
import styles from './HoverCard.module.css';
import { Link } from 'react-router-dom';

const HoverCard = ({ imageSrc, title, overlayTitle, overlayText, overlayExplain, buttonText, link }) => {

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt={title} className={styles.image} />
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <div className={styles.textTop}>
                <h4>{overlayText}</h4>
            </div>
            <div className={styles.titleMiddle}>
                <h2>{overlayTitle}</h2>
                <p>{overlayExplain}</p>
            </div>
            <Link to={link}>
            <button className={styles.button}>{buttonText}</button>
            </Link>
          </div>
        </div>
      </div>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

export default HoverCard;