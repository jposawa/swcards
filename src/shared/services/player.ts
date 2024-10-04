import { PAZAAK_PLAYERS } from "../constants";
import { loadStorage, saveStorage } from "../helpers";
import { PlayerData, StorageKey } from "../types";

export const fetchPlayersList = (): Record<string, PlayerData> => {
  const playersList =
    loadStorage(StorageKey.Players, { needParse: true }) || PAZAAK_PLAYERS;

  return playersList;
};

/**
 * Return selected player data
 * Or list of all player data if no player is selected
 *
 * @param {string} [playerId]
 */
export const fetchPlayerData = (
  playerId?: string
): PlayerData | Record<string, PlayerData> => {
  // For now it's pretty simple, since it's using mocked data
  /**
   * Ideally, the service request receive the Id and fetches the right information without needing of fetching the whole list here
   * However, it's being done that way while we don't connect it with any DB
   */
  const playersList = fetchPlayersList();

  if (!playerId) {
    return playersList;
  }

  const selectedPlayer = playersList[playerId];

  return selectedPlayer;
};

export const savePlayerData = (playerData: PlayerData) => {
  const playersList = fetchPlayersList();
  // I know this is already done at usePlayer, but keeping it here just to be sure
  const { id: playerId = self.crypto.randomUUID() } = playerData;

  playerData.id = playerId;

  playersList[playerId] = playerData;

  saveStorage(StorageKey.Players, playersList, { needParse: true });
};

// TODO: Implement player data remove
