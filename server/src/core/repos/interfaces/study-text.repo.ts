import { StudyText } from '../../models/study-text.model';
import { FilterOptions } from './filter-options.interface';

export interface StudyTextRepository {
  save(text: StudyText): Promise<StudyText>;

  existsById(id: number): Promise<boolean>;

  findAll(): Promise<StudyText[]>;
  findById(id: number): Promise<StudyText>;
  findByCreatorId(id: number): Promise<StudyText[]>;
  findFiltered(opts: FilterOptions): Promise<StudyText[]>;

  delete(id: number): Promise<void>;
}

export const StudyTextRepository = Symbol('StudyTextRepository');
