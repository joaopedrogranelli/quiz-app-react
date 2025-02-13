import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css'

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
    <div className="certification-card">
      <h3>{name}</h3>
      <button onClick={handleStart}>Praticar</button>
    </div>
  );
};

export default CertificationCard;
