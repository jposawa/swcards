import { GameCard } from "../components";
import { Game, PazaakSign } from "../shared/types";

import styles from "./pages.module.css";

export const Pazaak = () => {
  return (
    <section className={styles.pageContainer}>
      <h3>Pazaak</h3>
      <GameCard
        game={Game.Pazaak}
        sign={PazaakSign.Both}
        value={1}
        size="12rem"
        startTurned
      />
    </section>
  );
};
