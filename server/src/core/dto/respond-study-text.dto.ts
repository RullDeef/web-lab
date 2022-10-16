import { ApiProperty } from "@nestjs/swagger";
import { StudyText } from "../entities/study-text.entity";

export class RespondStudyTextDto {
  @ApiProperty({
    description: 'Идентификатор текста'
  })
  id: number;

  @ApiProperty({
    description: 'Название текста',
    example: 'London is the capital of Great Britain',
  })
  title: string;

  @ApiProperty({
    description: 'Сам текст',
    example:
      "London is the capital of Great Britain, its political, economic and cultural centre. It's one of the largest cities in the world.",
  })
  content: string;

  constructor(text: StudyText) {
    this.id = text.id;
    this.title = text.title;
    this.content = text.content;
  }
}
