import { ApiProperty } from '@nestjs/swagger';
import { QuizOption } from '../models/quiz-option.model';
import { QuizQuestion } from '../models/quiz-quiestion.model';

export class CreateQuizQuestionDto {
  @ApiProperty({
    description: 'Содержание вопроса',
  })
  question: string;

  @ApiProperty({
    description: 'Список вариантов ответов',
    type: [String],
  })
  options: string[];

  @ApiProperty({
    description: 'Список номеров правильных ответов',
    type: [Number],
  })
  correct_options: number[];

  toModel(): QuizQuestion {
    const question = new QuizQuestion();

    question.question = this.question;
    question.options = this.options.map((o, i) => {
      const opt = new QuizOption();
      opt.content = o;
      opt.is_correct = this.correct_options.includes(i);
      return opt;
    });

    return question;
  }
}
