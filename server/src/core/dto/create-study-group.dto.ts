import { ApiProperty } from '@nestjs/swagger';

export class CreateStudyGroupDto {
  @ApiProperty({
    description: 'Название учебной группы',
  })
  title: string;

  @ApiProperty({
    description: 'Идентификатор преподавателя',
  })
  tutor_id: number;

  @ApiProperty({
    description: 'Массив идентификаторов студентов',
    type: ['number'],
  })
  students_ids: number[];
}
