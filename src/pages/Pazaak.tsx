import React from "react";

// import styles from "./pages.module.css";
import { PazaakMatch } from "../fragments";
import { useRecoilValue } from "recoil";
import { currentPlayerAtom } from "../shared/state";
import { CurrentMatchData, GameCategory } from "../shared/types";
import { PAZAAK_PLAYERS, PAZAAK_PLAYERS_AI } from "../shared/constants";
import { randomNumber } from "../shared/helpers";

export const Pazaak = () => {
  const [activeMatch, setActiveMatch] = React.useState(false);
  const currentPlayerData = useRecoilValue(currentPlayerAtom);

  const newMatch = React.useMemo(() => {
    const match: CurrentMatchData = {
      id: self.crypto.randomUUID(),
      category: GameCategory.Pazaak,
      date: new Date(),
      playersList: [],
    };
    const humanPlayer = currentPlayerData ?? Object.values(PAZAAK_PLAYERS)[0];
    const aiPlayersList = Object.values(PAZAAK_PLAYERS_AI);
    const aiPlayerIndex = randomNumber(0, aiPlayersList.length, false);
    const aiPlayer = aiPlayersList[aiPlayerIndex];

    match.playersList.push(humanPlayer, aiPlayer);

    return match;
  }, [currentPlayerData])

  if (activeMatch) {
    return <PazaakMatch match={newMatch} />;
  }

  return (
    <>
      <h3>Pazaak</h3>

      {!currentPlayerData?.name ? (
        <>
          <p>I couldn't identify you. Do you want to sign in?</p>
          <p>It's not necessary, but doing it would enable match history</p>
          <br />
        </>
      ) : (
        <p>
          Welcome <b>{currentPlayerData.name}</b>
        </p>
      )}

      <p>
        Do you want to start a <b>Pazaak</b> match?
      </p>
      <br />
      <button
        type="button"
        onClick={() => {
          setActiveMatch(true);
        }}
        style={{
          margin: "auto auto 45%",
        }}
      >
        Start match
      </button>
    </>
  );
};
