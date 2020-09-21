import { appActionType } from "../actions/appActions";
import {
  addColumn,
  addRow,
  applyDiff,
  createField,
  getCell,
  removeColumn,
  removeRow,
  reverseDiff,
  runTurnSimulation,
  setCellAlive,
  setCellDead,
} from "../domain/core";

export const INITIAL_STATE = {
  field: [],
  isSimulationOn: false,
  gameHistory: [],
  currentTurnNumber: 0,
};

export function reducer(state, action) {
  switch (action.type) {
    case appActionType.INIT: {
      const { width, height, pattern } = action.data;
      return { ...state, field: createField(width, height, pattern) };
    }
    case appActionType.SET_CELL: {
      const [x, y] = action.data;
      const { field } = state;

      const cellState = getCell(x, y, field);

      let result = null;

      if (cellState === 0) {
        result = setCellAlive(x, y, field);
      }

      if (cellState === 1) {
        result = setCellDead(x, y, field);
      }

      const newField = applyDiff([result], field);

      return { ...state, field: newField };
    }
    case appActionType.NEXT_STEP: {
      const { field, gameHistory, currentTurnNumber } = state;

      // if we are back in time - use history

      if (gameHistory.length === currentTurnNumber) {
        const simulationResult = runTurnSimulation(field);

        const nextStepField = applyDiff(simulationResult, field);
        return {
          ...state,
          field: nextStepField,
          gameHistory: [...gameHistory, simulationResult],
          currentTurnNumber: currentTurnNumber + 1,
        };
      } else {
        const historyDiff = gameHistory[currentTurnNumber];
        const nextStepField = applyDiff(historyDiff, field);

        return {
          ...state,
          field: nextStepField,
          currentTurnNumber: currentTurnNumber + 1,
        };
      }
    }
    case appActionType.PREV_STEP: {
      const { field, gameHistory, currentTurnNumber } = state;

      if (currentTurnNumber >= 1) {
        const reversedDiffs = gameHistory[currentTurnNumber - 1].map(
          reverseDiff
        );
        const nextStepField = applyDiff(reversedDiffs, field);

        return {
          ...state,
          field: nextStepField,
          currentTurnNumber: currentTurnNumber - 1,
        };
      }

      return state;
    }

    case appActionType.TOGGLE_AUTOSIMULATION: {
      const { isSimulationOn } = state;

      return { ...state, isSimulationOn: !isSimulationOn };
    }

    case appActionType.ADD_COLUMN: {
      return { ...state, field: addColumn(state.field) };
    }

    case appActionType.REMOVE_COLUMN: {
      return { ...state, field: removeColumn(state.field) };
    }

    case appActionType.ADD_ROW: {
      return { ...state, field: addRow(state.field) };
    }

    case appActionType.REMOVE_ROW: {
      return { ...state, field: removeRow(state.field) };
    }

    default:
      return state;
  }
}
