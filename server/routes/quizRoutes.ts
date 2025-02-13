import express from 'express';
import Question from '../models/Question';

const router = express.Router();

router.get('/:certification', async (req, res) => {
  const { certification } = req.params;
  try {
    const questions = await Question.find({ certification });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar perguntas' });
  }
});

export default router;
