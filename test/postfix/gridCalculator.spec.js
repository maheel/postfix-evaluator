import { expect } from 'chai';

import gridCalculator from '../../src/postfix/gridCalculator';

describe('gridCalculator', function () {
  describe('calculate', function () {
    it('processes data grid successfully with all correct expressions', async function () {
      const csvData = [
        ['5 5 +', '2 10 3 * -', '81 9 /', '8 9 3 / +'],
        ['20 6 %', '15 3 / 18 3 * -', '3 9 - 13 + 2 *', '9 3 * 2 /'],
        ['3 4 * 8 +', '-2 15 3 % -', '18 6 /', '9 9 4 5 + / *'],
      ];

      const expectedResult = [
        [10, -28, 9, 11],
        [2, -49, 14, 13.5],
        [20, -2, 3, 9],
      ];

      const response = await gridCalculator.calculate(csvData);
      expect(response).to.deep.equal(expectedResult);
    });

    it('processes data grid which has cell references successfully with all correct expressions', async function () {
      const csvData = [
        ['b1 b2 +', '2 b2 3 * -', '3', '5 6 +'],
        ['a1', '5', '7 3 *', '7 2 /'],
        ['21 3 *', 'd1 2 *', '15 4 %', '5 1 2 + 4 * + 3 -'],
      ];

      const expectedResult = [
        [-8, -13, 3, 11],
        [-8, 5, 21, 3.5],
        [63, 22, 3, 14],
      ];

      const response = await gridCalculator.calculate(csvData);

      expect(response).to.deep.equal(expectedResult);
    });

    it('returns error for incorrect expressions', async function () {
      const csvData = [
        ['b1 b2 +', '2 b2 3 * -', '3', '+'],
        ['a1', '5', ' ', '7 2 /'],
        ['c2 3 *', '1 2', ' ', '5 1 2 + 4 * + 3 -'],
      ];
      const expectedResult = [
        [-8, -13, 3, '#ERR'],
        [-8, 5, 0, 3.5],
        [0, '#ERR', 0, 14],
      ];

      const response = await gridCalculator.calculate(csvData);

      expect(response).to.deep.equal(expectedResult);
    });
  });
});
