import { randSentence } from "@ngneat/falso";
import { QuizQuestion } from "../../quizzes/entities/quiz-question.entity";
import { BaseFactory } from "./base-factory";

export class QuizQuestionFactory extends BaseFactory<Partial<QuizQuestion>> {
  create(): Partial<QuizQuestion> {
    return {
      question: randSentence(),
    };
  }
}