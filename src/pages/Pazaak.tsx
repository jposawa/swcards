import React from "react";

// import styles from "./pages.module.css";
import { PazaakMatch } from "../fragments";
import { useRecoilValue } from "recoil";
import { currentPlayerAtom } from "../shared/state";
import { CurrentMatchData, GameCategory } from "../shared/types";
import { PAZAAK_PLAYERS, PAZAAK_PLAYERS_AI } from "../shared/constants";
import { randomNumber } from "../shared/helpers";
import { Button } from "../components";
import { usePlayer } from "../shared/hooks";

export const Pazaak = () => {
  const [activeMatch, setActiveMatch] = React.useState(false);
  const currentPlayerData = useRecoilValue(currentPlayerAtom);
  const { activateMockAccount } = usePlayer();

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
  }, [currentPlayerData]);

  if (activeMatch) {
    return <PazaakMatch match={newMatch} />;
  }

  const callLogin = () => {
    window.alert("Logging in with mock account");

    activateMockAccount();
  };

  return (
    <>
      <h3>Pazaak</h3>

      {!currentPlayerData?.name ? (
        <>
          <p>
            I couldn't identify you. Do you want to{" "}
            <Button preset="link" onClick={callLogin}>
              sign in
            </Button>
            ?
          </p>
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
      <Button
        onClick={() => {
          setActiveMatch(true);
        }}
        style={{
          margin: "auto auto 45%",
        }}
      >
        Start match
      </Button>
    </>
  );
};
