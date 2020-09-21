import React from "react";
import styles from "./ui.scss";

export const UI = ({
  isSimulationOn,
  handleNextButtonClick,
  handlePrevButtonClick,
  handleToggleSimulationClick,
  isPrevEnabled,
  handleAddRow,
  handleRemoveRow,
  handleAddColumn,
  handleRemoveColumn,
  handleReset,
  createGlider,
  createLwss,
}) => {
  return (
    <>
      <button className={styles.button} onClick={handleToggleSimulationClick}>
        {isSimulationOn ? "stop simulation" : "start simulation"}
      </button>
      <button
        className={styles.button}
        disabled={!isPrevEnabled}
        onClick={handlePrevButtonClick}
      >
        go to previous step
      </button>

      <button onClick={handleNextButtonClick} className={styles.button}>
        go to next step
      </button>

      <button className={styles.button} onClick={handleAddRow}>
        add row
      </button>

      <button className={styles.button} onClick={handleRemoveRow}>
        remove row
      </button>

      <button className={styles.button} onClick={handleAddColumn}>
        add column
      </button>

      <button className={styles.button} onClick={handleRemoveColumn}>
        remove column
      </button>

      <button className={styles.button} onClick={handleReset}>
        reset
      </button>
      <button className={styles.button} onClick={createGlider}>
        Glider
      </button>
      <button className={styles.button} onClick={createLwss}>
        Lwss
      </button>
    </>
  );
};
