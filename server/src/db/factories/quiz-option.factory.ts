import { randBoolean, randSentence } from "@ngneat/falso";
import { QuizOption } from "../../quizzes/entities/quiz-option.entity";
import { BaseFactory } from "./base-factory";

export class QuizOptionFactory extends BaseFactory<Partial<QuizOption>> {
  create(): Partial<QuizOption> {
    return {
      content: randSentence(),
      is_correct: randBoolean(),
    };
  }
}
