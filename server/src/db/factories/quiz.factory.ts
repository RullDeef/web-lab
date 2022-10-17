import { randSentence } from "@ngneat/falso";
import { Quiz } from "../../quizzes/entities/quiz.entity";
import { BaseFactory } from "./base-factory";

export class QuizFactory extends BaseFactory<Partial<Quiz>> {
  create(): Partial<Quiz> {
    return {
      title: randSentence(),
    };
  }
}
