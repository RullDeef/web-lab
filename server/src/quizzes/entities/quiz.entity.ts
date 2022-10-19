import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudyGroupEntity } from '../../core/repos/typeorm/entities/study-group.entity';
import { UserEntity } from '../../core/repos/typeorm/entities/user.entity';
import { QuizQuestion } from './quiz-question.entity';

@Entity({ name: 'quizzes' })
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @OneToMany(() => QuizQuestion, (q) => q.quiz, { eager: true })
  questions: QuizQuestion[];

  @ManyToMany(() => StudyGroupEntity)
  @JoinTable({
    name: 'study_groups_quizzes',
    joinColumn: { name: 'study_group_id' },
    inverseJoinColumn: { name: 'quiz_id' },
  })
  study_groups: StudyGroupEntity[];

  @CreateDateColumn()
  created_at: Date;
}
