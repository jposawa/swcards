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
  const [deckTurned1, setDeckTurned1] = React.useState<number[]>([]);

  const handleFlipCard = () => {
    const topCard = deckTable[deckTable.length - 1];
    const updatedDeckTurned1 = [...deckTurned1, topCard];
    const _deckTable = [...deckTable];
    _deckTable.pop();
    setDeckTable(_deckTable);
    setDeckTurned1(updatedDeckTurned1);
  };

  return (
    <>
      <h3>Pazaak</h3>

      <section className={styles.decksGroup}>
        <div className={styles.deckContainer}>
          <h4>Table Deck</h4>
          <p>
            {deckTable.length} card{deckTable.length !== 1 && "s"}
          </p>
          {deckTable.length > 0 && (
            <div className={styles.actionContainer}>
              <button onClick={handleFlipCard}>Flip top card</button>
            </div>
          )}

          {deckTable.map((value, index) => (
            <GameCard
              key={`${value}-${index}`}
              game={GameCategory.Pazaak}
              sign={PazaakSign.Standard}
              value={value as PazaakCardValue}
              className={styles.stackDeck}
              style={
                {
                  "--offset": `${0.02 * index}rem`,
                } as React.CSSProperties
              }
              turned
            />
          ))}
        </div>

        <div className={styles.deckContainer}>
          <h4>Turned Deck</h4>
          <p>
            {deckTurned1.length} card{deckTurned1.length !== 1 && "s"}
          </p>

          {deckTurned1.map((value, index) => (
            <GameCard
              key={`${value}-${index}`}
              game={GameCategory.Pazaak}
              sign={PazaakSign.Standard}
              value={value as PazaakCardValue}
              className={styles.stackDeck}
              style={
                {
                  "--offset": `${0.02 * index}rem`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </section>
    </>
  );
};
