import { ApiProperty } from '@nestjs/swagger';
import { Quiz } from '../models/quiz.model';
import { CreateQuizQuestionDto } from './create-quiz-question.dto';

export class CreateQuizDto {
  @ApiProperty({
    description: 'Название теста',
  })
  title: string;

  @ApiProperty({
    description: 'Список вопросов теста',
    type: [CreateQuizQuestionDto],
  })
  questions: CreateQuizQuestionDto[];

  toModel(): Quiz {
    const quiz = new Quiz();

    quiz.title = this.title;
    quiz.questions = this.questions.map((q) => q.toModel());
    quiz.study_groups = [];

    return quiz;
  }
}
