import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Home.module.scss';

interface CertificationCardProps {
  name: string;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ name }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    localStorage.setItem('selectedCertification', name);
    navigate('/methods');
  };

  return (
    <div className={styles.certificationCard}>
      <h3>{name}</h3>
      <p>Perguntas Cadastradas:</p>
      <button onClick={handleStart}>Praticar</button>
    </div>
  );
};

export default CertificationCard;
