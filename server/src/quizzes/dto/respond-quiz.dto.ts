import { ApiProperty } from '@nestjs/swagger';
import { Quiz } from '../entities/quiz.entity';
import { RespondQuizQuestionDto } from './respond-quiz-question.dto';

export class RespondQuizDto {
  @ApiProperty({
    description: 'Идентификатор теста',
  })
  id: number;

  @ApiProperty({
    description: 'Название теста',
  })
  title: string;

  @ApiProperty({
    description: 'Список вопросов теста',
    type: RespondQuizQuestionDto,
    isArray: true,
  })
  questions: RespondQuizQuestionDto[];

  constructor(quiz: Quiz) {
    this.id = quiz.id;
    this.title = quiz.title;
    this.questions = quiz.questions.map((q) => new RespondQuizQuestionDto(q));
  }
}
