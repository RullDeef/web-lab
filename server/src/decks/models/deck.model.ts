import { StudyGroup } from "../../core/models/study-group.model";
import { User } from "../../core/models/user.model";
import { Card } from "./card.model";

export class Deck {
  id?: number;
  title: string;
  cards: Card[];
  study_groups: StudyGroup[];
  creator: User;
  created_at: Date;
}
