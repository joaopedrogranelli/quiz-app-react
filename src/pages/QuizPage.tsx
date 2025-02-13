import axios from 'axios';
import { Question } from '../types/question';
import { useEffect, useState } from 'react';

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const certification = localStorage.getItem('selectedCertification');
    axios
      .get(`http://localhost:5000/api/quiz/${certification}`)
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error('Erro ao carregar perguntas:', error));
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  if (!questions.length) return <p>Carregando perguntas...</p>;

  return (
    <div className="quiz-container">
      <h2>{questions[currentQuestion].title}</h2>
      <img src={questions[currentQuestion].image} alt={`Pergunta ${currentQuestion + 1}`} />
      <button onClick={handlePrevQuestion}>⬅️ Anterior</button>
      <button onClick={handleNextQuestion}>Próxima ➡️</button>
    </div>
  );
};

export default QuizPage;
