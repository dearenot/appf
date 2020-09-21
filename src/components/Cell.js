import React from "react";
import styles from "./cell.scss";

const Cell = ({ value, indexX, indexY }) => {
  return (
    <div
      className={styles.cell}
      name={`${indexX}_${indexY}`}
      value={value.toString()}
      // data-cellSize={8}
    >
      {/* {value} {`${indexX}_${indexY}`} */}
    </div>
  );
};

export const MemoizedCell = React.memo(Cell);
