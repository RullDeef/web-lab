import { randWord } from "@ngneat/falso";
import { Card } from "../../decks/entities/card.entity";
import { BaseFactory } from "./base-factory";

export class CardFactory extends BaseFactory<Partial<Card>> {
  create(): Partial<Card> {
    return {
      word: randWord(),
      reading: `[${randWord()}]`,
      translation: randWord(),
    };
  }
}