import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/methods.scss';

const Methods: React.FC = () => {
  const navigate = useNavigate();

  const handleMethod = (quantity: number) => {
    localStorage.setItem('selectedMethod', String(quantity));
    navigate('/quiz');
  };

  return (
    <div className="methods-container">
      <h1>🏅 Métodos de Estudo 🏅</h1>
      <div className="buttons">
        {[30, 50, 100].map((qtd) => (
          <button key={qtd} onClick={() => handleMethod(qtd)}>
            {qtd} Questões
          </button>
        ))}
      </div>
    </div>
  );
};

export default Methods;
