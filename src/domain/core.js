import {
  runHomeostatisRule,
  runOverpopulationRule,
  runReproductionRule,
  runUnderpopulationRule,
} from "./rules";

export function createField(width = 8, heigth = 8, initialField) {
  if (initialField !== null && initialField !== undefined) {
    return initialField;
  }

  const res = [];

  for (let i = 0; i < heigth; i++) {
    res[i] = [];
    for (let j = 0; j < width; j++) {
      res[i].push(0);
    }
  }

  return res;
}

export function getCell(x, y, field) {
  const [normalizedX, normalizedY] = normalizeCoord(x, y, field);

  return field[normalizedY][normalizedX];
}

export function normalizeCoord(x, y, field) {
  let newXcoord = x;
  let newYcoord = y;

  const fieldWidth = field[0].length;
  const fieldHeight = field.length;

  if (x < 0) {
    newXcoord = newXcoord + fieldWidth;
  } else if (x >= fieldWidth) {
    newXcoord = newXcoord - fieldWidth;
  }

  if (y < 0) {
    newYcoord = newYcoord + fieldHeight;
  } else if (y >= fieldHeight) {
    newYcoord = newYcoord - fieldHeight;
  }

  return [newXcoord, newYcoord];
}

export function getCellsNeighbours(x, y, field) {
  const neighbours = [];
  for (let yIndex = y - 1; yIndex < y + 2; yIndex++) {
    for (let xIndex = x - 1; xIndex < x + 2; xIndex++) {
      const [normalizedX, normalizedY] = normalizeCoord(xIndex, yIndex, field);

      if (!(x === normalizedX && y === normalizedY)) {
        neighbours.push(field[normalizedY][normalizedX]);
      }
    }
  }

  return neighbours;
}

export function setCellAlive(x, y, field) {
  const [normalizedX, normalizedY] = normalizeCoord(x, y, field);

  if (getCell(normalizedX, normalizedY, field) === 1) {
    return null;
  }

  return [normalizedX, normalizedY, 1];
}

export function setCellDead(x, y, field) {
  const [normalizedX, normalizedY] = normalizeCoord(x, y, field);

  if (getCell(normalizedX, normalizedY, field) === 0) {
    return null;
  }

  return [normalizedX, normalizedY, 0];
}

// IT HAPPENS SIMULTANEOUSLY - we save state of field

export function runTurnSimulation(field) {
  const fieldHeight = field.length;
  const fieldWidth = field[0].length;

  let results = [];

  for (let yIndex = 0; yIndex < fieldHeight; yIndex++) {
    for (let xIndex = 0; xIndex < fieldWidth; xIndex++) {
      const pureFieldCopy = JSON.parse(JSON.stringify(field));

      const cellIsAlive = getCell(xIndex, yIndex, pureFieldCopy) === 1;

      let underpopulationResult = null;
      let homeostasisResult = null;
      let overpopulationResult = null;
      let reproductionResult = null;

      if (cellIsAlive) {
        underpopulationResult = runUnderpopulationRule(
          xIndex,
          yIndex,
          pureFieldCopy
        );
      }

      if (cellIsAlive) {
        homeostasisResult = runHomeostatisRule(xIndex, yIndex, pureFieldCopy);
      }

      if (cellIsAlive) {
        overpopulationResult = runOverpopulationRule(
          xIndex,
          yIndex,
          pureFieldCopy
        );
      }

      if (cellIsAlive === false) {
        reproductionResult = runReproductionRule(xIndex, yIndex, pureFieldCopy);
      }

      if (underpopulationResult !== null) {
        results.push(underpopulationResult);
      }

      if (homeostasisResult !== null) {
        results.push(homeostasisResult);
      }

      if (overpopulationResult !== null) {
        results.push(overpopulationResult);
      }

      if (reproductionResult !== null) {
        results.push(reproductionResult);
      }
    }
  }

  return results;
}

export function applyDiff(diffResults, field) {
  const pureFieldCopy = JSON.parse(JSON.stringify(field));

  for (const diff of diffResults) {
    if (diff === null) continue;
    const [x, y, value] = diff;

    if (value === 0) {
      pureFieldCopy[y][x] = 0;
    } else if (value === 1) {
      pureFieldCopy[y][x] = 1;
    }
  }

  return pureFieldCopy;
}

export function reverseDiff(diff) {
  if (diff === null) return null;

  const [x, y, value] = diff;

  if (value === 0) {
    return [x, y, 1];
  }

  if (value === 1) {
    return [x, y, 0];
  }
}

//return field
export function addRow(field) {
  const pureFieldCopy = JSON.parse(JSON.stringify(field));

  const fieldWidth = field[0].length;

  const row = [];

  for (let i = 0; i < fieldWidth; i++) {
    row.push(0);
  }

  pureFieldCopy.push(row);

  return pureFieldCopy;
}

export function removeRow(field) {
  const pureFieldCopy = JSON.parse(JSON.stringify(field));

  const fieldHeight = field.length;

  if (fieldHeight === 1) return pureFieldCopy;

  return pureFieldCopy.slice(0, fieldHeight - 1);
}

export function addColumn(field) {
  const pureFieldCopy = JSON.parse(JSON.stringify(field));

  const fieldHeight = field.length;

  for (let i = 0; i < fieldHeight; i++) {
    pureFieldCopy[i].push(0);
  }

  return pureFieldCopy;
}

export function removeColumn(field) {
  const pureFieldCopy = JSON.parse(JSON.stringify(field));

  const fieldWidth = field[0].length;

  if (fieldWidth === 1) return pureFieldCopy;

  const fieldHeight = field.length;

  for (let i = 0; i < fieldHeight; i++) {
    pureFieldCopy[i].pop();
  }

  return pureFieldCopy;
}
