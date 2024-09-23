import { GameCard } from "../components";
import { Game } from "../shared/types";

import styles from "./pages.module.css";

export const Pazaak = () => {
  return (
    <section className={styles.pageContainer}>
      <h3>Pazaak</h3>
      <GameCard game={Game.Pazaak} />
    </section>
  )
}