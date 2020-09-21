import * as coreFunctions from "./core";
import * as rules from "./rules";

describe("core", () => {
  describe("createField", () => {
    it("must be a function", () => {
      expect(typeof coreFunctions.createField).toBe("function");
    });

    it("must accept width and height arguments", () => {
      const spy = jest.spyOn(coreFunctions, "createField");

      coreFunctions.createField(15, 16);

      expect(spy).toHaveBeenCalledWith(15, 16);
    });

    it("must return array of width length  each containing array of length height", () => {
      const resultField = coreFunctions.createField(5, 4);

      const expectedField = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];

      expect(resultField).toEqual(expectedField);
    });

    it("must create field with initial values if passed", () => {
      const initialField = [
        [1, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 1],
      ];

      const result = coreFunctions.createField(7, 7, initialField);

      expect(result).toEqual(initialField);
    });
  });

  describe("getCell", () => {
    it("must be a function", () => {
      expect(typeof coreFunctions.getCell).toBe("function");
    });
    it("must accept x, y and field as arguments", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [[0]]);
      const mockedField = createFieldMock();

      const spy = jest.spyOn(coreFunctions, "getCell");

      coreFunctions.getCell(0, 0, mockedField);

      expect(spy).toHaveBeenCalledWith(0, 0, mockedField);
    });

    it("must get proper cell from field", () => {
      const initialField = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
      ];
      const field = coreFunctions.createField(null, null, initialField);

      const result = coreFunctions.getCell(3, 2, field);

      expect(result).toBe(1);
    });

    it("must get normalized cell if both x and y out of bounds", () => {
      const initialField = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
      ];
      const field = coreFunctions.createField(null, null, initialField);

      const result = coreFunctions.getCell(-2, -2, field);

      expect(result).toBe(1);
    });

    it("must get normalized cell if x is out of bounds", () => {
      const initialField = [
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      const field = coreFunctions.createField(null, null, initialField);

      const result = coreFunctions.getCell(-2, 0, field);

      expect(result).toBe(1);
    });

    it("must get normalized cell if y is out of bounds", () => {
      const initialField = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ];
      const field = coreFunctions.createField(null, null, initialField);

      const result = coreFunctions.getCell(0, 6, field);

      expect(result).toBe(1);
    });
  });

  describe("normalizeCoord", () => {
    it("must be a function", () => {
      expect(typeof coreFunctions.normalizeCoord).toBe("function");
    });

    it("must accept x, y and field as args", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [[0]]);
      const mockedField = createFieldMock();

      const spy = jest.spyOn(coreFunctions, "normalizeCoord");

      coreFunctions.normalizeCoord(0, 0, mockedField);

      expect(spy).toHaveBeenCalledWith(0, 0, mockedField);
    });

    it("must return same coordinates if they are both in bounds", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [[0]]);

      const mockedField = createFieldMock();

      const result = coreFunctions.normalizeCoord(0, 0, mockedField);

      expect(result).toEqual([0, 0]);
    });

    it("must normalize x coord if it is below zero", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = coreFunctions.normalizeCoord(-1, 0, mockedField);

      expect(result).toEqual([4, 0]);
    });

    it("must normalize x coord if it is greater than field width", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = coreFunctions.normalizeCoord(5, 0, mockedField);

      expect(result).toEqual([0, 0]);
    });

    it("must normalize y coord if it is below zero", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = coreFunctions.normalizeCoord(0, -1, mockedField);

      expect(result).toEqual([0, 3]);
    });

    it("must normalize y coord if it is greater than height", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = coreFunctions.normalizeCoord(0, 4, mockedField);

      expect(result).toEqual([0, 0]);
    });
  });

  describe("getCellsNeighbours", () => {
    it("must return 8 neighbour cells in happy path case", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 2, 3, 4, 0],
          [0, 5, 0, 6, 0],
          [0, 7, 8, 9, 0],
        ]);

      const mockedField = createFieldMock();

      const result = coreFunctions.getCellsNeighbours(2, 2, mockedField);
      expect(result).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("must return 8 neighbour cells in top left corner", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 2, 0, 0, 7],
          [4, 3, 0, 0, 8],
          [0, 0, 0, 0, 0],
          [5, 6, 0, 0, 9],
        ]);

      const mockedField = createFieldMock();

      const result = coreFunctions.getCellsNeighbours(0, 0, mockedField);
      expect(result).toEqual([9, 5, 6, 7, 2, 8, 4, 3]);
    });

    it("must return 8 neighbour cells in top right corner", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [6, 0, 0, 5, 0],
          [9, 0, 0, 7, 8],
          [0, 0, 0, 0, 0],
          [4, 0, 0, 2, 3],
        ]);

      const mockedField = createFieldMock();

      const result = coreFunctions.getCellsNeighbours(4, 0, mockedField);
      expect(result).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("must return 8 neighbour cells in bottom left corner", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [8, 9, 0, 0, 7],
          [0, 0, 0, 0, 0],
          [3, 4, 0, 0, 2],
          [0, 6, 0, 0, 5],
        ]);

      const mockedField = createFieldMock();

      const result = coreFunctions.getCellsNeighbours(0, 3, mockedField);
      expect(result).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("must return 8 neighbour cells in bottom right corner", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [9, 0, 0, 7, 8],
          [0, 0, 0, 0, 0],
          [4, 0, 0, 2, 3],
          [6, 0, 0, 5, 0],
        ]);

      const mockedField = createFieldMock();

      const result = coreFunctions.getCellsNeighbours(4, 3, mockedField);
      expect(result).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });
  describe("setCellAlive", () => {
    it("must be a function", () => {
      expect(typeof coreFunctions.setCellAlive).toBe("function");
    });

    it("must set dead cell to alive and return diff [x, y, new_value]", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const resultDiff = coreFunctions.setCellAlive(4, 2, mockedField);

      const expected = [4, 2, 1];

      expect(resultDiff).toEqual(expected);
    });

    it("must do nothing with already alive cell", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0],
          [0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const resultDiff = coreFunctions.setCellAlive(3, 1, mockedField);

      const expected = null;

      expect(resultDiff).toEqual(expected);
    });
  });

  describe("setCellDead", () => {
    it("must be a function", () => {
      expect(typeof coreFunctions.setCellDead).toBe("function");
    });

    it("must set alive cell to dead", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 1, 0],
          [0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const resultDiff = coreFunctions.setCellDead(1, 2, mockedField);

      const expected = [1, 2, 0];

      expect(resultDiff).toEqual(expected);
    });

    it("must do nothing with already dead cell", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const resultDiff = coreFunctions.setCellDead(1, 1, mockedField);

      const expected = null;

      expect(resultDiff).toEqual(expected);
    });
  });

  // MUST WORK ONLY FOR ALIVE
  describe("runUnderpopulationRule", () => {
    it("must be a function", () => {
      expect(typeof rules.runUnderpopulationRule).toBe("function");
    });

    it("must return null if cell is already dead", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runUnderpopulationRule(1, 1, mockedField);

      expect(result).toEqual(null);
    });

    it("must return dead diff if neighbours count is 1", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runUnderpopulationRule(1, 1, mockedField);

      expect(result).toEqual([1, 1, 0]);
    });

    it("must return dead diff if neighbours count is 0", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runUnderpopulationRule(2, 1, mockedField);

      expect(result).toEqual([2, 1, 0]);
    });

    it("must return null if cell is already dead", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 1, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runUnderpopulationRule(1, 2, mockedField);

      expect(result).toBe(null);
    });

    it("must return null in other cases", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 1, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runUnderpopulationRule(1, 1, mockedField);

      expect(result).toBe(null);
    });
  });

  // MUST WORK ONLY FOR ALIVE
  describe("runHomeostatisRule", () => {
    it("must be a function", () => {
      expect(typeof rules.runHomeostatisRule).toBe("function");
    });
    it("must return null if cell is dead already", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runHomeostatisRule(1, 1, mockedField);

      expect(result).toEqual(null);
    });

    it("must return null if has 2 neighbours", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 1, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runHomeostatisRule(1, 1, mockedField);

      expect(result).toBe(null);
    });

    it("must return null if has 3 neighbours", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runHomeostatisRule(2, 1, mockedField);

      expect(result).toBe(null);
    });
  });

  describe("runOverpopulationRule", () => {
    it("must be a function", () => {
      expect(typeof rules.runOverpopulationRule).toBe("function");
    });

    it("must return null if cell is dead already", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runOverpopulationRule(1, 1, mockedField);

      expect(result).toEqual(null);
    });

    it("must return dead diff if cell has more than 3 neighbours", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 1, 0, 0, 0],
          [0, 0, 1, 1, 0],
          [0, 0, 1, 1, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runOverpopulationRule(2, 1, mockedField);

      expect(result).toEqual([2, 1, 0]);
    });
  });

  describe("runReproductionRule", () => {
    it("must be a function", () => {
      expect(typeof rules.runReproductionRule).toBe("function");
    });

    it("must return null if cell is alive already", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 1, 0, 0, 0],
          [0, 0, 1, 1, 0],
          [0, 0, 1, 1, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runReproductionRule(1, 0, mockedField);

      expect(result).toEqual(null);
    });

    it("must return alive diff if dead cell has exactly three neighbours", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 1, 0, 0, 0],
          [0, 0, 0, 1, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runReproductionRule(2, 1, mockedField);

      expect(result).toEqual([2, 1, 1]);
    });

    it("must return null if dead cell has more than 3 neighbours", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 1, 1, 1, 0],
          [0, 0, 0, 1, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
        ]);

      const mockedField = createFieldMock();

      const result = rules.runReproductionRule(2, 1, mockedField);

      expect(result).toEqual(null);
    });
  });

  describe("runTurnSimulation", () => {
    it("must be a function", () => {
      expect(typeof coreFunctions.runTurnSimulation).toBe("function");
    });

    it("must run 4 rules for every cell", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 1, 1],
          [0, 0, 0],
          [0, 0, 1],
        ]);

      const mockedField = createFieldMock();

      const underpopulationSpy = jest
        .spyOn(rules, "runUnderpopulationRule")
        .mockImplementationOnce(() => {});
      const homeostasisSpy = jest
        .spyOn(rules, "runHomeostatisRule")
        .mockImplementationOnce(() => {});
      const overpopulationSpy = jest
        .spyOn(rules, "runOverpopulationRule")
        .mockImplementationOnce(() => {});
      const reproductionSpy = jest
        .spyOn(rules, "runReproductionRule")
        .mockImplementationOnce(() => {});

      coreFunctions.runTurnSimulation(mockedField);

      const expectedUnderpopulationCallResults = [
        [1, 0, mockedField],
        [2, 0, mockedField],
        [2, 2, mockedField],
      ];

      const expectedHomeostasisCallResults = [
        [1, 0, mockedField],
        [2, 0, mockedField],
        [2, 2, mockedField],
      ];

      const expectedOverpopulationCallResults = [
        [1, 0, mockedField],
        [2, 0, mockedField],
        [2, 2, mockedField],
      ];

      const expectedReproductionResult = [
        [0, 0, mockedField],
        [0, 1, mockedField],
        [1, 1, mockedField],
        [2, 1, mockedField],
        [0, 2, mockedField],
        [1, 2, mockedField],
      ];

      expect(underpopulationSpy.mock.calls).toEqual(
        expectedUnderpopulationCallResults
      );
      expect(homeostasisSpy.mock.calls).toEqual(expectedHomeostasisCallResults);
      expect(overpopulationSpy.mock.calls).toEqual(
        expectedOverpopulationCallResults
      );
      expect(reproductionSpy.mock.calls).toEqual(expectedReproductionResult);
    });

    it("must return only non-null result", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 1, 1],
          [0, 0, 0],
          [0, 0, 1],
        ]);

      const mockedField = createFieldMock();

      jest
        .spyOn(rules, "runUnderpopulationRule")
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null);

      jest
        .spyOn(rules, "runHomeostatisRule")
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null);

      jest
        .spyOn(rules, "runOverpopulationRule")
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null);

      jest
        .spyOn(rules, "runReproductionRule")
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => [1, 2, 1]);

      const simulationResult = coreFunctions.runTurnSimulation(mockedField);

      expect(simulationResult).toEqual([[1, 2, 1]]);
    });
  });

  describe("applyDiff", () => {
    it("must be a function", () => {
      expect(typeof coreFunctions.applyDiff).toBe("function");
    });

    it("must apply every diff", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 1, 1],
          [0, 0, 0],
          [0, 0, 1],
        ]);

      const mockedField = createFieldMock();

      const diffApplicationResult = coreFunctions.applyDiff(
        [null, [0, 0, 1], null, [0, 2, 1], [2, 2, 0]],
        mockedField
      );

      expect(diffApplicationResult).toEqual([
        [1, 1, 1],
        [0, 0, 0],
        [1, 0, 0],
      ]);
    });
  });

  describe("reverse diff", () => {
    it("must be a function", () => {
      expect(typeof coreFunctions.reverseDiff).toBe("function");
    });

    it("must return null if input is null", () => {
      const input = null;

      const expectedResult = null;

      expect(coreFunctions.reverseDiff(input)).toEqual(expectedResult);
    });

    it("must reverse 0 to 1", () => {
      const input = [1, 2, 0];

      const expectedResult = [1, 2, 1];

      expect(coreFunctions.reverseDiff(input)).toEqual(expectedResult);
    });

    it("must reverse 1 to 0", () => {
      const input = [1, 2, 1];

      const expectedResult = [1, 2, 0];

      expect(coreFunctions.reverseDiff(input)).toEqual(expectedResult);
    });
  });

  describe("addRow", () => {
    it("must add row", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 1, 1],
          [0, 0, 0],
          [0, 0, 1],
        ]);

      const mockedField = createFieldMock();

      const expected = [
        [0, 1, 1],
        [0, 0, 0],
        [0, 0, 1],
        [0, 0, 0],
      ];

      const result = coreFunctions.addRow(mockedField);

      expect(result).toEqual(expected);
    });
  });

  describe("removeRow", () => {
    it("must remove row", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 1, 1],
          [0, 1, 0],
          [0, 0, 1],
        ]);

      const mockedField = createFieldMock();

      const expected = [
        [0, 1, 1],
        [0, 1, 0],
      ];

      const result = coreFunctions.removeRow(mockedField);

      expect(result).toEqual(expected);
    });

    it("must return same field if only 1 row left", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [[0, 1, 1]]);

      const mockedField = createFieldMock();

      const expected = [[0, 1, 1]];

      const result = coreFunctions.removeRow(mockedField);

      expect(result).toEqual(expected);
    });
  });

  describe("addColumn", () => {
    it("must add column", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 1, 1],
          [0, 1, 0],
          [0, 0, 1],
        ]);

      const mockedField = createFieldMock();

      const expected = [
        [0, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
      ];

      const result = coreFunctions.addColumn(mockedField);

      expect(result).toEqual(expected);
    });
  });

  describe("removeColumn", () => {
    it("must return same field if column is the last", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [[0], [1], [0]]);

      const mockedField = createFieldMock();

      const expected = [[0], [1], [0]];

      const result = coreFunctions.removeColumn(mockedField);

      expect(result).toEqual(expected);
    });
    it("must return field without a column", () => {
      const createFieldMock = jest
        .spyOn(coreFunctions, "createField")
        .mockImplementationOnce(() => [
          [0, 1, 1],
          [0, 1, 0],
          [0, 0, 1],
        ]);

      const mockedField = createFieldMock();

      const expected = [
        [0, 1],
        [0, 1],
        [0, 0],
      ];

      const result = coreFunctions.removeColumn(mockedField);

      expect(result).toEqual(expected);
    });
  });
});
