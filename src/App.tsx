import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Methods from './pages/Methods';
import QuizPage from './pages/QuizPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/methods" element={<Methods />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
