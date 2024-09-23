import React from "react";
import styles from "./Backface.module.css";

export const BackfaceStandard: React.FC = () => {
  return (
    <div className={`${styles.backface} ${styles.standard}`}>
      Back side
    </div>
  );
}