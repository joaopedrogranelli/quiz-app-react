import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/methods.module.scss';

const Methods: React.FC = () => {
  const navigate = useNavigate();

  const handleMethod = (quantity: number) => {
    localStorage.setItem('selectedMethod', String(quantity));
    navigate('/quiz');
  };

  return (
    <div className={styles.methodsContainer}>
      <header className={styles.methodsHeader}>
        <button className={styles.backButton} onClick={() => navigate('/')}>⟵</button>
        <h1>🏅 Métodos 🏅</h1>
      </header>

      <main className={styles.methodsMain}>
        <div className={styles.methodsBox}>
          <h2>Selecione um método de estudo:</h2>
          <h5>Escolha quantas questões quer estudar por dia</h5>
          <div className={styles.buttons}>
            {[30, 50, 100].map((qtd) => (
              <button
                key={qtd}
                className={styles.methodButton}
                onClick={() => handleMethod(qtd)}
              >
                {qtd} Questões
              </button>
            ))}
          </div>
        </div>

        <div className={styles.methodsBox}>
          <h2>Personalize seu método de estudo:</h2>
          <h5>Digite quantas questões quer estudar por dia</h5>
          <div className={styles.customMethod}>
            <input
              type="number"
              placeholder="🥳 Você consegue! 🥳"
              min="1"
              max="100"
              className={styles.customInput}
            />
            <button className={styles.customButton}>Escolher</button>
          </div>
        </div>
      </main>

      <footer className={styles.methodsFooter}>
        <p>Matheus Meissner | João Pedro Granelli</p>
      </footer>
    </div>
  );
};

export default Methods;
