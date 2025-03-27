import React from 'react';
import styles from './styles.module.css';

export const Spinner: React.FC = () => {
  return (
    <div className={styles.spinnerOverlay}>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
        <span className={styles.text}>Carregando</span>
      </div>
    </div>
  );
};
