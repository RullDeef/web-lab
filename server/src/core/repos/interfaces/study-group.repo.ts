import { StudyGroup } from '../../models/study-group.model';

export interface StudyGroupRepository {
  save(group: StudyGroup): Promise<StudyGroup>;

  existsById(id: number): Promise<boolean>;

  findAll(): Promise<StudyGroup[]>;
  findById(id: number): Promise<StudyGroup>;

  delete(id: number): Promise<void>;
}

export const StudyGroupRepository = Symbol('StudyGroupRepository');
