import { expect } from 'chai';

import gridCalculator from '../../src/util/csvCellToArrayIndexMapper';

describe('csvCellToArrayIndexMapper', function () {
  describe('getArrayIndex', function () {
    it('returns array index for valid cell reference successfully', function () {
      const actualResult = gridCalculator.getArrayIndex('B1');
      const expectedResult = { column: 1, row: 0 };

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('returns array index for valid cell reference successfully (double letters)', function () {
      const actualResult = gridCalculator.getArrayIndex('AB1');
      const expectedResult = { column: 27, row: 0 };

      expect(actualResult).to.deep.equal(expectedResult);
    });

    it('throws error for invalid cell reference (column value only)', function () {
      try {
        gridCalculator.getArrayIndex('BB');
      } catch (e) {
        expect(e.message).to.equal('Invalid cell reference');
      }
    });

    it('throws error for invalid cell reference (row value only)', function () {
      try {
        gridCalculator.getArrayIndex('23');
      } catch (e) {
        expect(e.message).to.equal('Invalid cell reference');
      }
    });
  });
});
