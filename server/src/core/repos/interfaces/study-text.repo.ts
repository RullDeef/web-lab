import { StudyText } from '../../models/study-text.model';

export interface StudyTextRepository {
  save(text: StudyText): Promise<StudyText>;

  existsById(id: number): Promise<boolean>;

  findAll(): Promise<StudyText[]>;
  findById(id: number): Promise<StudyText>;

  delete(id: number): Promise<void>;
}

export const StudyTextRepository = Symbol('StudyTextRepository');
