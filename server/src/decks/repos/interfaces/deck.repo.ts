import { Deck } from "../../models/deck.model";

export interface DeckRepository {
  save(deck: Deck): Promise<Deck>;
  findAll(): Promise<Deck[]>;
  findById(id: number): Promise<Deck>;
  delete(id: number): Promise<void>;
}

export const DeckRepository = Symbol('DeckRepository');
