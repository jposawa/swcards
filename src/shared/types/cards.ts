import { GameCategory } from ".";

export enum PazaakSign {
  Both = "both",
  Minus = "minus",
  Plus = "plus",
  Special = "special",
  Standard = "standard",
}

export type SignInfo = {
  color: string[];
  label?: string;
};

// There are "prettier" ways to do this, but it could mess with code reading
export type PazaakCardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | string;

export type PazaakCore = {
  sign: PazaakSign;
  value: PazaakCardValue;
};

export type CardPazaakSpec = PazaakCore & {
  game: GameCategory.Pazaak;
};

export enum KSabaccDeck {
  Blood = "blood",
  Sand = "sand",
}

export enum KSabaccSpecial {
  Sylop = -100,
  Imposter = -10,
}

export type KSabaccCardValue = KSabaccSpecial | 1 | 2 | 3 | 4 | 5 | 6;

export type KesselSabacc = {
  game: GameCategory.KesselSabacc;
  deck: KSabaccDeck;
  value: KSabaccCardValue;
};

// Doing like that to expect other Sabacc variants
export type CardSabaccSpec = KesselSabacc;

export type CardType = CardPazaakSpec | CardSabaccSpec;
