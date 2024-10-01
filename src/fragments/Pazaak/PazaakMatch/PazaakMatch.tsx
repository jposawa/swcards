import React from "react";
import { GameCard } from "../../../components";
import {
  arrayShuffle,
  getSumPazaakDeck,
  randomNumber,
} from "../../../shared/helpers";
import {
  GameCategory,
  PazaakCardValue,
  PazaakCore,
  PazaakSign,
} from "../../../shared/types";
import { PazaakDeckPlayer } from "../../../fragments";
import {
  BUTTON_DISABLED_TIME,
  PAZAAK_PLAYERS,
} from "../../../shared/constants";

import styles from "./PazaakMatch.module.css";

const getTableDeck = (
  options: {
    numCopies?: number;
    shuffle?: boolean;
  } = {}
) => {
  // Standard values
  const { numCopies = 4, shuffle = true } = options;
  const deckTableValues = [];

  /**
   * This first for will run 10 times, from 1 to 10 (included)
   */
  for (let i = 1; i <= 10; i++) {
    /**
     * This one will run 4 times, from 0 to 4 (excluded)
     * Note the comparison symbol at the middle statement
     */
    for (let j = 0; j < numCopies; j++) {
      deckTableValues.push(i);
    }
  }

  if (shuffle) {
    return arrayShuffle(deckTableValues);
  }

  return deckTableValues;
};

export const PazaakMatch = () => {
  const [deckTable, setDeckTable] = React.useState(getTableDeck());
  const [deckPlayer1, setDeckPlayer1] = React.useState<PazaakCore[]>([]);
  const [deckPlayer2, setDeckPlayer2] = React.useState<PazaakCore[]>([]);
  const [playerTurn, setPlayerTurn] = React.useState<0 | 1>(0);
  const [isButtonsDisabled, setIsButtonsDisabled] = React.useState(false);

  const switchPlayer = () => {
    setPlayerTurn(playerTurn === 0 ? 1 : 0);
  };

  const flipCard = React.useCallback(
    (
      state: PazaakCore[],
      setState: (param: PazaakCore[]) => void,
      alternateOnTarget = true
    ) => {
      setIsButtonsDisabled(true);

      const _deckTable = [...deckTable];
      const topCard = _deckTable[_deckTable.length - 1];
      const updatedPlayerDeck = [
        ...state,
        {
          value: topCard,
          sign: PazaakSign.Standard,
        } as PazaakCore,
      ];
      const updatedScore = getSumPazaakDeck(updatedPlayerDeck);
      _deckTable.pop();
      setDeckTable(_deckTable);
      setState(updatedPlayerDeck);

      if (alternateOnTarget && updatedScore === 20) {
        switchPlayer();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deckTable]
  );

  const handleFlipCard = (
    options: {
      alternate?: boolean;
      explodeAlternate?: boolean;
    } = {}
  ) => {
    const { alternate = false, explodeAlternate = true } = options;
    const referenceData =
      playerTurn === 0
        ? {
            state: deckPlayer1,
            setState: setDeckPlayer1,
          }
        : {
            state: deckPlayer2,
            setState: setDeckPlayer2,
          };

    const currentPlayerScore = getSumPazaakDeck(referenceData.state);

    const autoAlternate = explodeAlternate && currentPlayerScore > 20;

    flipCard(referenceData.state, referenceData.setState);

    if (alternate || autoAlternate) {
      switchPlayer();
    }
  };

  React.useEffect(() => {
    const rawRandomValue = randomNumber(1, 100);
    // The chosen player index will be 0 or 1, to match the array
    // So I'm using the mod operator (%) that returns the missing part of a division
    const chosenPlayerIndex = rawRandomValue % 2;

    setPlayerTurn(chosenPlayerIndex as 0 | 1);
  }, []);

  React.useEffect(() => {
    // TODO improve this state usage
    const deckCurrentPlayer = playerTurn === 0 ? deckPlayer1 : deckPlayer2;
    const scoreCurrentPlayer = getSumPazaakDeck(deckCurrentPlayer);

    setTimeout(() => {
      setIsButtonsDisabled(scoreCurrentPlayer >= 20);
    }, BUTTON_DISABLED_TIME);
  }, [deckTable]);

  const currentPlayer = React.useMemo(() => {
    const activePlayer = PAZAAK_PLAYERS[playerTurn];

    return activePlayer;
  }, [playerTurn]);

  return (
    <>
      <section className={styles.decksGroup}>
        <div className={styles.tableDeckContainer}>
          <div className={styles.actionContainer}>
            <h3>Table Deck</h3>
            <p>
              {deckTable.length} card{deckTable.length !== 1 && "s"}
            </p>
            <p>
              Current player: <b>{currentPlayer.name}</b>
            </p>
            {deckTable.length > 0 && (
              <>
                <p>
                  <button
                    onClick={() => handleFlipCard()}
                    disabled={isButtonsDisabled}
                  >
                    Get a card
                  </button>
                </p>

                <br />

                <p>
                  <button onClick={switchPlayer} disabled={isButtonsDisabled}>
                    Finish turn
                  </button>
                </p>
              </>
            )}
          </div>

          <div className={styles.tableCardsContainer}>
            {deckTable.map((value, index) => (
              <GameCard
                key={`${value}-${index}`}
                game={GameCategory.Pazaak}
                sign={PazaakSign.Standard}
                size="8.5rem"
                value={value as PazaakCardValue}
                className={styles.stackDeck}
                style={
                  {
                    "--offset": `${0.1 * index}rem`,
                  } as React.CSSProperties
                }
                turned
              />
            ))}
          </div>
        </div>

        <div className={styles.playerDecksGroup}>
          <PazaakDeckPlayer
            playerInfo={PAZAAK_PLAYERS[0]}
            cards={deckPlayer1}
          />

          <PazaakDeckPlayer
            playerInfo={PAZAAK_PLAYERS[1]}
            cards={deckPlayer2}
          />
        </div>
      </section>
    </>
  );
};
