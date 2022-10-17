import { rand } from "@ngneat/falso";
import { StudyGroup } from "../../core/entities/study-group.entity";
import { BaseFactory } from "./base-factory";

export class StudyGroupFactory extends BaseFactory<Partial<StudyGroup>> {
  create(): Partial<StudyGroup> {
    return {
      title: rand(['ИУ', 'СМ', 'РК', 'РЛ', 'СГН', 'МТ']) +
        rand(['1', '3', '5', '7']) + '-' + rand(['1', '3', '5']) +
        rand(['1', '2', '3', '4', '5', '6']) + rand(['Б', 'C', 'И']),
    };
  }
}