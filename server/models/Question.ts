import mongoose, { Document } from 'mongoose';

interface IQuestion extends Document {
  certification: string;
  title: string;
  image: string;
  answer: string;
}

const QuestionSchema = new mongoose.Schema({
  certification: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  answer: { type: String, required: true }
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);
