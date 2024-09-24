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
}

export enum Game {
  Pazaak = "pazaak",
  KesselSabacc = "kessel_sabacc",
}

export type PazaakCore = {
  sign: PazaakSign;
  // There is more "pretty" ways to do this, but it could mess with code reading
  value: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};

export type CardPazaakSpec = PazaakCore & {
  game: Game.Pazaak;
};

export enum KSabaccDeck {
  Blood = "blood",
  Sand = "sand",
}

export enum KSabaccSpecial {
  Sylop = -100,
  Imposter = -10,
}

export type KesselSabacc = {
  game: Game.KesselSabacc;
  deck: KSabaccDeck;
  value: KSabaccSpecial | 1 | 2 | 3 | 4 | 5 | 6;
};

// Doing like that to expect other Sabacc variants
export type CardSabaccSpec = KesselSabacc;

export type CardType = CardPazaakSpec | CardSabaccSpec;
