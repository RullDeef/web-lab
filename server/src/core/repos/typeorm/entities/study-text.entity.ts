import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StudyText } from '../../../models/study-text.model';
import { UserEntity } from './user.entity';

@Entity({ name: 'texts' })
export class StudyTextEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  toModel(): StudyText {
    const text = new StudyText();

    text.id = this.id;
    text.title = this.title;
    text.content = this.content;
    text.creator = this.creator.toModel();
    text.created_at = this.created_at;

    return text;
  }

  static fromModel(text: StudyText) {
    const ent = new StudyTextEntity();

    ent.id = text.id;
    ent.title = text.title;
    ent.content = text.content;
    ent.creator = UserEntity.fromModel(text.creator);
    ent.created_at = text.created_at;

    return ent;
  }
}
