import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../components/Modal';
import styles from '../styles/methods.module.scss';

const Methods: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [customQuestions, setCustomQuestions] = useState<number | ''>('');
  const [methodDetails, setMethodDetails] = useState({
    checkpoints: 4,
    dailyQuestions: 30,
    examDate: '18/02',
    schedule: [
      '13/02 - Checkpoint 1',
      '14/02 - Checkpoint 2',
      '15/02 - Checkpoint 3',
      '16/02 - Checkpoint 4',
      '17/02 - Revisão Completa',
    ],
  });

  const handleMethod = (quantity: number) => {
    setMethodDetails((prev) => ({
      ...prev,
      dailyQuestions: quantity,
      checkpoints: Math.ceil(quantity / 10),
    }));
    setShowModal(true);
  };

  const handleCustomMethod = () => {
    if (customQuestions && customQuestions > 0) {
      handleMethod(customQuestions);
    } else {
      alert('Por favor, insira um número válido de questões!');
    }
  };

  const closeModal = () => setShowModal(false);

  const startQuiz = () => {
    localStorage.setItem('selectedMethod', String(methodDetails.dailyQuestions));
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

        {/* Adição da seção de personalização */}
        <div className={styles.methodsBox}>
          <h2>Personalize seu método de estudo:</h2>
          <h5>Digite quantas questões quer estudar por dia</h5>
          <div className={styles.customMethod}>
            <input
              type="number"
              placeholder="🥳 Você consegue! 🥳"
              value={customQuestions}
              onChange={(e) => setCustomQuestions(Number(e.target.value))}
              min="1"
              max="100"
              className={styles.customInput}
            />
            <button className={styles.customButton} onClick={handleCustomMethod}>
              Escolher
            </button>
          </div>
        </div>
      </main>

      {/* Modal Dinâmico */}
      <CustomModal
        isOpen={showModal}
        onClose={closeModal}
        methodDetails={methodDetails}
        startQuiz={startQuiz}
      />

      <footer className={styles.methodsFooter}>
        <p>Matheus Meissner | João Pedro Granelli</p>
      </footer>
    </div>
  );
};

export default Methods;
