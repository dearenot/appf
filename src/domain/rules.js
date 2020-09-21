import { getCell, getCellsNeighbours, normalizeCoord } from "./core";

export function runUnderpopulationRule(x, y, field) {
  const [normalizedX, normalizedY] = normalizeCoord(x, y, field);

  if (getCell(normalizedX, normalizedY, field) === 0) {
    return null;
  }

  const aliveNeighboursCount = getCellsNeighbours(
    normalizedX,
    normalizedY,
    field
  ).filter((cell) => cell === 1).length;

  if (aliveNeighboursCount <= 1) {
    return [normalizedX, normalizedY, 0];
  }

  return null;
}

export function runHomeostatisRule(x, y, field) {
  const [normalizedX, normalizedY] = normalizeCoord(x, y, field);

  if (getCell(normalizedX, normalizedY, field) === 0) {
    return null;
  }

  const aliveNeighboursCount = getCellsNeighbours(
    normalizedX,
    normalizedY,
    field
  ).filter((cell) => cell === 1).length;

  if (aliveNeighboursCount >= 2 && aliveNeighboursCount <= 3) {
    return null;
  }

  return null;
}

export function runOverpopulationRule(x, y, field) {
  const [normalizedX, normalizedY] = normalizeCoord(x, y, field);

  if (getCell(normalizedX, normalizedY, field) === 0) {
    return null;
  }

  const aliveNeighboursCount = getCellsNeighbours(
    normalizedX,
    normalizedY,
    field
  ).filter((cell) => cell === 1).length;

  if (aliveNeighboursCount > 3) {
    return [normalizedX, normalizedY, 0];
  }

  return null;
}

export function runReproductionRule(x, y, field) {
  const [normalizedX, normalizedY] = normalizeCoord(x, y, field);

  if (getCell(normalizedX, normalizedY, field) === 1) {
    return null;
  }

  const aliveNeighboursCount = getCellsNeighbours(
    normalizedX,
    normalizedY,
    field
  ).filter((cell) => cell === 1).length;

  if (aliveNeighboursCount === 3) {
    return [normalizedX, normalizedY, 1];
  }
  return null;
}
