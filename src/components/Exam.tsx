import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/exam.module.scss';

interface Question {
  title: string;
  image: string;
  answer: string;
}

const ExamPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false); // 👈 Adicionando estado para controle da cor
  const certification = localStorage.getItem('selectedCertification') || 'AI-900';

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/quiz/${certification}`)
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error('Erro ao carregar perguntas:', error));
  }, [certification]);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
    setShowAnswer(false);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    setShowAnswer(false);
  };

  const resetToFirstQuestion = () => {
    setCurrentQuestion(0);
    setShowAnswer(false);
  };

  // 👉 Função para alternar botão
  const toggleAnswer = () => {
    setShowAnswer((prev) => !prev);
    setIsDisabled((prev) => !prev);
  };

  if (!questions.length) return <p>Carregando perguntas...</p>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button 
          className={styles.backButton} 
          onClick={() => window.history.back()}
        >
          ⟵ Voltar
        </button>

        <h1>{certification}</h1>

        {/* 🟡 Alteração aqui: Usando classes dinâmicas para o botão */}
        <button 
          className={`${styles.answerButton} ${isDisabled ? styles.disabled : ''}`} 
          onClick={toggleAnswer}
        >
          {showAnswer ? 'Desabilitar' : 'Ver Resposta'}
        </button>
      </header>

      <main className={styles.main}>
        <h2>{questions[currentQuestion].title}</h2>
        <img 
          src={questions[currentQuestion].image} 
          alt={`Pergunta ${currentQuestion + 1}`} 
          className={styles.questionImage}
        />

        {showAnswer && (
          <div className={styles.answer}>
            <h3>Resposta Correta:</h3>
            <img 
              src={questions[currentQuestion].answer} 
              alt={`Resposta ${currentQuestion + 1}`} 
              className={styles.answerImage}
            />
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.navigation}>
          <button 
            onClick={handlePrevQuestion} 
            disabled={currentQuestion === 0}
          >
            ⬅️ Anterior
          </button>
          <button 
            onClick={handleNextQuestion} 
            disabled={currentQuestion === questions.length - 1}
          >
            Próxima ➡️
          </button>
        </div>
        <button 
          className={styles.resetButton} 
          onClick={resetToFirstQuestion}
        >
          ↩︎ Reiniciar
        </button>
      </footer>
    </div>
  );
};

export default ExamPage;
