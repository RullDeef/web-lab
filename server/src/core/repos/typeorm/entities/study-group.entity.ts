import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudyGroup } from '../../../models/study-group.model';
import { UserEntity } from './user.entity';

@Entity({ name: 'study_groups' })
export class StudyGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'tutor_id' })
  tutor: UserEntity;

  @ManyToMany(() => UserEntity, { eager: true, onDelete: 'SET NULL' })
  @JoinTable({
    name: 'study_groups_users',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
  })
  students: UserEntity[];

  @CreateDateColumn()
  created_at: Date;

  toModel(): StudyGroup {
    const group = new StudyGroup();

    group.id = this.id;
    group.title = this.title;
    group.tutor = this.tutor?.toModel();
    group.students = this.students.map((s) => s.toModel());
    group.created_at = this.created_at;

    return group;
  }

  static fromModel(group: StudyGroup) {
    const res = new StudyGroupEntity();

    res.id = group.id;
    res.title = group.title;
    res.tutor = UserEntity.fromModel(group.tutor);
    res.students = group.students.map(UserEntity.fromModel);
    res.created_at = group.created_at;

    return res;
  }
}
