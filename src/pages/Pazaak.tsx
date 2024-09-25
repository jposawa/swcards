import { GameCard } from "../components";
import { GameCategory, PazaakSign } from "../shared/types";

import styles from "./pages.module.css";

export const Pazaak = () => {
  return (
    <section className={styles.pageContainer}>
      <h3>Pazaak</h3>

      <GameCard
        game={GameCategory.Pazaak}
        sign={PazaakSign.Both}
        value={1}
        startTurned
      />
    </section>
  );
};
