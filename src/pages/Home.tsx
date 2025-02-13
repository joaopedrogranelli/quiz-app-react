import React from 'react';
import CertificationCard from '../components/CertificationCard';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>📚 Simulados 📚</h1>
      <h2>Escolha sua certificação:</h2>
      <div className="card-container">
        <CertificationCard name="AI-102" />
        <CertificationCard name="AI-900" />
      </div>
    </div>
  );
};

export default Home;
