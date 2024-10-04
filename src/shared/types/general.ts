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

export enum BehaviorType {
  Standard,
  Agressive,
}

export type PlayerData = {
  id: string;
  name: string;
  email: string;
  matches: Record<string, CurrentMatchData>;
  activeMatch?: string;
  token?: string;
  behaviorModule?: BehaviorType;
};

export type MatchData = {
  id: string;
  category: GameCategory;
  date: Date;
  playerIds: string[];
  winnerId?: string | "draw"; //Undefined winner means it's still active
  playersList?: PlayerData[];
};

export type CurrentMatchData = Omit<MatchData, "playerIds"> & {
  playersList: PlayerData[];
};

export enum StorageKey {
  Players = "playersList",
}
