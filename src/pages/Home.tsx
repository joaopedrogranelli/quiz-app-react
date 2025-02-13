import React from 'react';
import CertificationCard from '../components/CertificationCard';
import styles from '../styles/Home.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1>📚 Simulados 📚</h1>
      </header>

      <main className={styles.main}>
        <h2>Primeiro passo, escolha sua certificação:</h2>
        <div className={styles.cardContainer}>
          <CertificationCard name="AI-102" />
          <CertificationCard name="AI-900" />
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Matheus Meissner | João Pedro Granelli</p>
      </footer>
    </div>
  );
};

export default Home;
