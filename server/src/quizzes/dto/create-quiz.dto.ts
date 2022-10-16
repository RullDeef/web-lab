import { ApiProperty } from "@nestjs/swagger";
import { CreateQuizQuestionDto } from "./create-quiz-question.dto";

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
}
