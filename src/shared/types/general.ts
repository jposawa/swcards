export enum Theme {
  Light = "light",
  Dark = "dark",
}

export enum CardBackface {
  Default = "default",
}

export enum GameCategory {
  Pazaak = "pazaak",
  KesselSabacc = "kessel_sabacc",
}

export type MatchData = {
  id: string;
  category: GameCategory;
  winnerId: string;
  date: Date;
}

export type PlayerData = {
  id: string;
  name: string;
  email: string;
  matches: Record<string, MatchData>;
  activeMatch?: string;
}
