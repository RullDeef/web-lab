import { randParagraph, randSentence } from "@ngneat/falso";
import { StudyText } from "../../core/entities/study-text.entity";
import { BaseFactory } from "./base-factory";

export class StudyTextFactory extends BaseFactory<Partial<StudyText>> {
  create(): Partial<StudyText> {
    return {
      title: randSentence(),
      content: randParagraph()
    };
  }
}
