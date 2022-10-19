import { ApiProperty } from '@nestjs/swagger';
import { QuizQuestion } from '../models/quiz-quiestion.model';

export class RespondQuizQuestionDto {
  @ApiProperty({
    description: 'Идентификатор вопроса',
  })
  id: number;

  @ApiProperty({
    description: 'Текст вопроса',
  })
  question: string;

  @ApiProperty({
    description: 'Список вариантов ответов',
    type: String,
    isArray: true,
  })
  options: string[];

  constructor(question: QuizQuestion) {
    this.id = question.id;
    this.question = question.question;
    this.options = question.options.map((o) => o.content);
  }
}
