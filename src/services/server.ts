import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import quizRoutes from '../../server/routes/quizRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Nova rota de perguntas do Azure
app.use('/api/quiz', quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
