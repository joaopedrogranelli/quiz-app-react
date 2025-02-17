import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Methods from './pages/Methods';
import ExamPage from './pages/ExamPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/methods" element={<Methods />} />
        <Route path="/exam" element={<ExamPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
