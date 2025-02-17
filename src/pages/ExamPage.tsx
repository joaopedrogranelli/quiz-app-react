import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/exam.module.scss';
import { useNavigate } from 'react-router-dom';

interface Question {
  title: string;
  image: string;
  answer: string;
}

const ExamPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const navigate = useNavigate();
  const certification = localStorage.getItem('selectedCertification') || 'AI-900';
  const [customQuestion, setCustomQuestion] = useState<number | ''>('');

  // Função para pular para a pergunta
const handleGoToQuestion = () => {
    const index = Number(customQuestion) - 1;
    if (index >= 0 && index < questions.length) {
      setCurrentQuestion(index);
      setShowAnswer(false);
    } else {
      alert('Número de pergunta inválido!');
    }
  };

  // Busca as perguntas ao montar o componente
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

  // Retorna mensagem enquanto carrega as perguntas
  return (
    <div className={styles.container}>
      <header className={styles.header}>

        {/* Barra de Pesquisa */}
        <div className={styles.searchBar}>
            {/* Botão de Voltar */}
            <button className={styles.searchButton} onClick={() => navigate('/')}>
                ⟵
            </button>
            <input
            type="number"
            placeholder=""
            value={customQuestion}
            onChange={(e) => setCustomQuestion(Number(e.target.value))}
            min="1"
            max={questions.length}
            className={styles.searchInput}
            />
            <button 
            className={styles.searchButton} 
            onClick={handleGoToQuestion}
            >
            🔍
            </button>
        </div>

        {/* Título */}
        <h1>{certification} - Simulado</h1>

        {/* Botão de Ver/Ocultar Resposta */}
        <div className={styles.buttons}>
            <button 
                id="toggle-answer" 
                className={styles.answerButton} 
                onClick={() => setShowAnswer((prev) => !prev)}
                >
                {showAnswer ? 'Desabilitar' : 'Ver Resposta'}
            </button>
        </div>
        </header>

      
  
      <main className={styles.main}>
        {/* Verifica se existem perguntas, se não, mostra um aviso */}
        {questions.length > 0 ? (
          <>
            <h2>Pergunta {currentQuestion + 1}</h2>
            <h3>{questions[currentQuestion].title}</h3>
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
          </>
        ) : (
          <p className={styles.warning}>🚨 Nenhuma pergunta disponível! Adicione questões no banco. 🚨</p>
        )}
      </main>
  
      <footer className={styles.footer}>
        <div className={styles.navigation}>
          <button onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
            ⟵️
          </button>
          <button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>
            ⟶️
          </button>
        </div>
        <button className={styles.resetButton} onClick={resetToFirstQuestion}>
          ↩︎
        </button>
      </footer>
    </div>
  );
  

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/')}>⟵ Voltar</button>
        <h1>{certification} - Simulado</h1>
        <button 
          className={styles.answerButton} 
          onClick={() => setShowAnswer((prev) => !prev)}
        >
          {showAnswer ? 'Ocultar Resposta' : 'Ver Resposta'}
        </button>
      </header>

      <main className={styles.main}>
        <h2>Pergunta {currentQuestion + 1}</h2>
        <h3>{questions[currentQuestion].title}</h3>
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
            className={styles.navButton}
          >
            ⬅️ Anterior
          </button>
          <button 
            onClick={handleNextQuestion} 
            disabled={currentQuestion === questions.length - 1}
            className={styles.navButton}
          >
            Próxima ➡️
          </button>
        </div>
        <button className={styles.resetButton} onClick={resetToFirstQuestion}>
          ↩︎ Reiniciar
        </button>
      </footer>
    </div>
  );
};

export default ExamPage;
