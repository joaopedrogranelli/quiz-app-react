import axios from 'axios';
import { useEffect, useState } from 'react';
import './QuizPage.css';

interface Question {
  title: string;
  image: string;
  answer: string;
}

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const certification = localStorage.getItem('selectedCertification');
    axios.get(`http://localhost:5000/api/quiz/${certification}`)
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Erro ao carregar perguntas:', error));
  }, []);

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
    setShowAnswer(false);
  };

  const handlePrev = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    setShowAnswer(false);
  };

  const toggleAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  if (!questions.length) return <p>Carregando perguntas...</p>;

  return (
    <div className="quiz-container">
      <h2>{questions[currentQuestion].title}</h2>
      <img src={questions[currentQuestion].image} alt={`Pergunta ${currentQuestion + 1}`} />
      <div className="navigation-buttons">
        <button onClick={handlePrev}>⬅️ Anterior</button>
        <button onClick={toggleAnswer}>{showAnswer ? 'Esconder Resposta' : 'Ver Resposta'}</button>
        <button onClick={handleNext}>Próxima ➡️</button>
      </div>
      {showAnswer && (
        <div className="answer-container">
          <h3>Resposta:</h3>
          <p>{questions[currentQuestion].answer}</p>
        </div>
      )}
    </div>
  );
};

export default QuizPage;