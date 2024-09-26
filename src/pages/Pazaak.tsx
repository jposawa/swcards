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
  const [deckTable] = React.useState(getTableDeck());

  const handleFlipCard = () => {};

  return (
    <section className={styles.pageContainer}>
      <h3>Pazaak</h3>

      <div className={styles.deckContainer}>
        <h4>Table Deck</h4>
        <p>
          {deckTable.length} card{deckTable.length !== 1 && "s"}
        </p>

        <div className={styles.actionContainer}>
          <button onClick={handleFlipCard}>Flip top card</button>
        </div>

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
            startTurned
          />
        ))}
      </div>
    </section>
  );
};
