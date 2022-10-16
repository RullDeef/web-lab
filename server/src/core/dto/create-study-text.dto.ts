import { ApiProperty } from '@nestjs/swagger';

export class CreateStudyTextDto {
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
}
