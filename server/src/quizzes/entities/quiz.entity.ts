import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StudyGroup } from "../../core/entities/study-group.entity";
import { User } from "../../core/entities/user.entity";
import { QuizQuestion } from "./quiz-question.entity";

@Entity({ name: 'quizzes' })
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @OneToMany(() => QuizQuestion, q => q.quiz, { eager: true })
  questions: QuizQuestion[];

  @ManyToMany(() => StudyGroup)
  @JoinTable({
    name: 'study_groups_quizzes',
    joinColumn: { name: 'study_group_id' },
    inverseJoinColumn: { name: 'quiz_id' },
  })
  study_groups: StudyGroup[];

  @CreateDateColumn()
  created_at: Date;
}
