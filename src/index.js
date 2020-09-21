import React, { useCallback, useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import { appActionType } from "./actions/appActions";
import { MemoizedCell } from "./components/Cell";
import { UI } from "./components/UI";
import { Glider } from "./domain/patterns/glider";
import { Lwss } from "./domain/patterns/lwss";
import { INITIAL_STATE, reducer } from "./reducer/appReducer";
import styles from "./styles.scss";

const SIMULATION_TICK = 1000;

const App = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [timeout, updateTimeout] = useState(null);

  useEffect(() => {
    dispatch({ type: appActionType.INIT, data: { width: 8, height: 8 } });

    return () => {
      toggleAutosimulationOff();
    };
  }, [dispatch]);

  const handleCellClick = useCallback(
    (clickEvent) => {
      const clickedCoord = clickEvent.target.getAttribute("name");

      if (clickedCoord !== null) {
        const [x, y] = clickedCoord.split("_");
        dispatch({ type: appActionType.SET_CELL, data: [x, y] });
      }
    },
    [dispatch]
  );

  const handleNextButtonClick = useCallback(() => {
    dispatch({ type: appActionType.NEXT_STEP });
  }, [dispatch]);

  const handleToggleSimulationClick = useCallback(() => {
    dispatch({ type: appActionType.TOGGLE_AUTOSIMULATION });
  }, [dispatch]);

  useEffect(() => {
    const { isSimulationOn } = state;

    if (isSimulationOn) {
      toggleAutosimulationOn();
    } else {
      toggleAutosimulationOff();
    }
  }, [dispatch, state.isSimulationOn]);

  const toggleAutosimulationOn = () => {
    const cb = () => {
      dispatch({ type: appActionType.NEXT_STEP });

      clearTimeout(timeout);
      updateTimeout(setTimeout(cb, SIMULATION_TICK));
    };

    updateTimeout(setTimeout(cb, SIMULATION_TICK));
  };

  const toggleAutosimulationOff = () => {
    clearTimeout(timeout);
    updateTimeout(null);
  };

  const handlePrevButtonClick = () => {
    dispatch({ type: appActionType.PREV_STEP });
  };

  const handleAddRow = () => {
    dispatch({ type: appActionType.ADD_ROW });
  };

  const handleRemoveRow = () => {
    dispatch({ type: appActionType.REMOVE_ROW });
  };

  const handleAddColumn = () => {
    dispatch({ type: appActionType.ADD_COLUMN });
  };

  const handleRemoveColumn = () => {
    dispatch({ type: appActionType.REMOVE_COLUMN });
  };

  const handleReset = () => {
    if (state.isSimulationOn) {
      dispatch({ type: appActionType.TOGGLE_AUTOSIMULATION });
    }
    dispatch({ type: appActionType.INIT, data: { width: 8, height: 8 } });
  };

  const createGlider = () => {
    if (state.isSimulationOn) {
      dispatch({ type: appActionType.TOGGLE_AUTOSIMULATION });
    }
    dispatch({
      type: appActionType.INIT,
      data: { width: null, height: null, pattern: Glider },
    });
    dispatch({ type: appActionType.TOGGLE_AUTOSIMULATION });
  };

  const createLwss = () => {
    if (state.isSimulationOn) {
      dispatch({ type: appActionType.TOGGLE_AUTOSIMULATION });
    }
    dispatch({
      type: appActionType.INIT,
      data: { width: null, height: null, pattern: Lwss },
    });
    dispatch({ type: appActionType.TOGGLE_AUTOSIMULATION });
  };

  const fieldWidth = state.field[0]?.length;
  const fieldHeight = state.field.length;

  return (
    <>
      <div id="app_wrapper" className={styles.app_wrapper}>
        <div id="ui_container" className={styles.ui_container}>
          <div className={styles.ui_wrapper}>
            <UI
              isSimulationOn={state.isSimulationOn}
              handleNextButtonClick={handleNextButtonClick}
              handleToggleSimulationClick={handleToggleSimulationClick}
              handlePrevButtonClick={handlePrevButtonClick}
              isPrevEnabled={
                state.gameHistory.length && state.currentTurnNumber >= 1
              }
              handleAddRow={handleAddRow}
              handleRemoveRow={handleRemoveRow}
              handleAddColumn={handleAddColumn}
              handleRemoveColumn={handleRemoveColumn}
              handleReset={handleReset}
              createGlider={createGlider}
              createLwss={createLwss}
            />
          </div>
        </div>
        <div className={styles.fieldContainerContainer}>
          <div
            className={[
              styles.fieldContainer,
              styles[`columns-${fieldWidth}`],
              styles[`rows-${fieldHeight}`],
            ].join(" ")}
            onClick={handleCellClick}
          >
            {state.field.map((fieldColumn, indexY) => {
              return fieldColumn.map((field, indexX) => {
                const coord = `${indexX}_${indexY}`;

                return (
                  <MemoizedCell
                    value={field}
                    key={coord}
                    indexX={indexX}
                    indexY={indexY}
                  />
                );
              });
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const appRoot = document.getElementById("appRoot");
ReactDOM.render(<App></App>, appRoot);
