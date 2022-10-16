import { ApiProperty } from "@nestjs/swagger";

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
}
