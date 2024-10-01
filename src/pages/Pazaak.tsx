import React from "react";

// import styles from "./pages.module.css";
import { PazaakMatch } from "../fragments";

export const Pazaak = () => {
  const [activeMatch, setActiveMatch] = React.useState(false);

  if (activeMatch) {
    return <PazaakMatch />;
  }

  return (
    <>
      <h3>Pazaak</h3>

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
