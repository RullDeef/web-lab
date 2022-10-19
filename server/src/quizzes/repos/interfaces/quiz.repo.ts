import { Quiz } from '../../models/quiz.model';

export interface QuizRepository {
  save(quiz: Quiz): Promise<Quiz>;
  findAll(): Promise<Quiz[]>;
  findById(id: number): Promise<Quiz>;
  delete(id: number): Promise<void>;
}

export const QuizRepository = Symbol('QuizRepository');
