import React from 'react';
import Modal from 'react-modal';
import styles from '../styles/modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  methodDetails: {
    checkpoints: number;
    dailyQuestions: number;
    examDate: string;
    schedule: string[];
  };
  startQuiz: () => void;
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, methodDetails, startQuiz }) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalFrame}>
        <h3>Serão {methodDetails.checkpoints} checkpoints no total</h3>
        <p>
          Checkpoints com <strong>{methodDetails.dailyQuestions} Questões</strong>
        </p>

        <div className={styles.startButtons}>
          <button className={styles.startToday}>Começar hoje</button>
          <button className={styles.startTomorrow}>Começar amanhã</button>
        </div>

        <div className={styles.schedule}>
          {methodDetails.schedule.map((day, index) => (
            <p key={index}>{day}</p>
          ))}
        </div>

        <h3>Data Sugerida Para Realização do Exame</h3>
        <p className={styles.dateHighlight}>🏆 {methodDetails.examDate} 🏆</p>

        <div className={styles.modalButtons}>
          <button className={styles.start} onClick={startQuiz}>
            Ir para o Simulado
          </button>
          <button className={styles.scheduleButton}>Agendar Exame</button>
          <button className={styles.close} onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
