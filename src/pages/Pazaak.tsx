import React from "react";
import { GameCard } from "../components";
import { arrayShuffle } from "../shared/helpers";
import { GameCategory, PazaakCardValue, PazaakSign } from "../shared/types";

import styles from "./pages.module.css";

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

export const Pazaak = () => {
  const [deckTable, setDeckTable] = React.useState(getTableDeck());
  const [deckPlayer1, setDeckPlayer1] = React.useState<number[]>([]);
  const [deckPlayer2, setDeckPlayer2] = React.useState<number[]>([]);
  const [playerTurn, setPlayerTurn] = React.useState<1 | 2>(1);

  const flipCard = React.useCallback((state: number[], setState: (param: number[]) => void) => {
    const topCard = deckTable[deckTable.length - 1];
    const updatedPlayerDeck = [...state, topCard];
    const _deckTable = [...deckTable];
    _deckTable.pop();
    setDeckTable(_deckTable);
    setState(updatedPlayerDeck);
  }, [deckTable]);

  const handleFlipCard = () => {
    if (playerTurn === 1) {
      flipCard(deckPlayer1, setDeckPlayer1);
    } else {
      flipCard(deckPlayer2, setDeckPlayer2);
    }
    setPlayerTurn(playerTurn === 1 ? 2 : 1);
  };

  return (
    <>
      <h3>Pazaak</h3>

      <section className={styles.decksGroup}>
        <div className={styles.tableDeckContainer}>
          <h4>Table Deck</h4>
          <p>
            {deckTable.length} card{deckTable.length !== 1 && "s"}
          </p>
          {deckTable.length > 0 && (
            <div className={styles.actionContainer}>
              <button onClick={handleFlipCard}>Flip top card</button>
            </div>
          )}
          <div className={styles.cardsContainer}>
            {deckTable.map((value, index) => (
              <GameCard
                key={`${value}-${index}`}
                game={GameCategory.Pazaak}
                sign={PazaakSign.Standard}
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
          <div className={styles.deckContainer}>
            <h4>Player 1</h4>
            <p>
              {deckPlayer1.length} card{deckPlayer1.length !== 1 && "s"}
            </p>

            {deckPlayer1.map((value, index) => (
              <GameCard
                key={`${value}-${index}`}
                game={GameCategory.Pazaak}
                sign={PazaakSign.Standard}
                value={value as PazaakCardValue}
                className={styles.stackDeck}
                size="6rem"
                style={
                  {
                    "--offset": `${4.5 * index}rem`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>

          <div className={styles.deckContainer}>
            <h4>Player 2</h4>
            <p>
              {deckPlayer2.length} card{deckPlayer2.length !== 1 && "s"}
            </p>

            {deckPlayer2.map((value, index) => (
              <GameCard
                key={`${value}-${index}`}
                game={GameCategory.Pazaak}
                sign={PazaakSign.Standard}
                value={value as PazaakCardValue}
                className={styles.stackDeck}
                size="6rem"
                style={
                  {
                    "--offset": `${4.5 * index}rem`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
