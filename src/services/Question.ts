import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    certification: { type: String, required: true },
    title: { type: String, required: true }
  });
  