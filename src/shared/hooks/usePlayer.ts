import React from "react";
import { useSetRecoilState } from "recoil";
import { currentPlayerAtom } from "../state";
import { PlayerData } from "../types";
import { fetchPlayerData } from "../services";

type PlayerDataCore = Omit<PlayerData, "id"> & { id?: string };

export const usePlayer = () => {
  const setCurrentPlayerData = useSetRecoilState(currentPlayerAtom);

  /**
   * Get player data and update currentPlayerAtom recoil state
   */
  const getPlayerData = React.useCallback(
    (playerId: string) => {
      const playerData = fetchPlayerData(playerId) as PlayerData;

      setCurrentPlayerData(playerData);
    },
    [setCurrentPlayerData]
  );

  const updatePlayerData = React.useCallback(
    (playerData: PlayerDataCore) => {
      const { id: playerId = self.crypto.randomUUID() } = playerData;

      playerData.id = playerId;

      setCurrentPlayerData(playerData as PlayerData);
    },
    [setCurrentPlayerData]
  );

  const activateMockAccount = React.useCallback(() => {
    setCurrentPlayerData({
      id: "mock-player",
      name: "Mocked Player",
      email: "mockplayer@domain.co",
      matches: {},
    })
  }, [setCurrentPlayerData])

  return {
    getPlayerData,
    updatePlayerData,
    activateMockAccount,
  };
};
