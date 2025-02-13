import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import quizRoutes from './routes/quizRoutes';
import cors from 'cors';

// 🔍 Carrega as variáveis do .env
dotenv.config();

// 🔌 Conecta ao Banco de Dados
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// 🔍 Rotas para o Quiz
app.use('/api/quiz', quizRoutes);

// 🖥️ Inicialização do Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
