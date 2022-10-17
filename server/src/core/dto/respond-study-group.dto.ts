import { ApiProperty } from '@nestjs/swagger';
import { StudyGroup } from '../entities/study-group.entity';
import { RespondUserDto } from './respond-user.dto';

export class RespondStudyGroupDto {
  @ApiProperty({
    description: 'Идентификатор учебной группы',
    type: 'number',
  })
  id: number;

  @ApiProperty({
    description: 'Название учебной группы',
  })
  title: string;

  @ApiProperty({
    description: 'Преподаватель группы',
    type: RespondUserDto,
  })
  tutor: RespondUserDto;

  @ApiProperty({
    description: 'Студенты группы',
    type: RespondUserDto,
    isArray: true,
  })
  students: RespondUserDto[];

  constructor(group: StudyGroup) {
    this.id = group.id;
    this.title = group.title;
    this.tutor = new RespondUserDto(group.tutor);
    this.students = group.students.map((s) => new RespondUserDto(s));
  }
}
