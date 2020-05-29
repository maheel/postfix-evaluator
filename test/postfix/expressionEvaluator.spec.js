import { expect } from 'chai';

import expressionEvaluator from '../../src/postfix/expressionEvaluator';

describe('expressionEvaluator', function () {
  describe('evaluate', function () {
    it('evaluates correct expressions successfully', function () {
      const csvData = [
        ['2 10 3 * -', '5 5 +', '81 9 /', '8 9 3 / +'],
        ['20 6 %', '15 3 / 18 3 * -', '3 9 - 13 + 2 *', '9 3 * 2 /'],
      ];
      const expression = '3 9 - 13 + 2 *';

      const response = expressionEvaluator.evaluate(expression, csvData);
      const expectedResult = 14;

      expect(response).to.equal(expectedResult);
    });

    it('returns operand value when there is only one operand is found', function () {
      const csvData = [
        ['2 10 3 * -', '5 5', '81 9 /', '1 +'],
        ['20 6 %', '15', '3 9 *', '9 3 * 2 /'],
      ];
      const expression = '15';

      const response = expressionEvaluator.evaluate(expression, csvData);
      const expectedResult = 15;

      expect(response).to.equal(expectedResult);
    });

    it('returns zero (0) for empty expression', function () {
      const csvData = [
        ['2 10 3 * -', '', '81 9 /', '1 +'],
        ['20 6 %', '15', '3 9 *', '9 3 * 2 /'],
      ];
      const expression = '';

      const response = expressionEvaluator.evaluate(expression, csvData);
      const expectedResult = 0;

      expect(response).to.equal(expectedResult);
    });

    it('returns correct error message when no operator found', function () {
      const csvData = [
        ['2 10 3 * -', '5 5', '81 9 /', '8 9 3 / +'],
        ['20 6 %', '15 3 6 7', '3 9 *', '9 3 * 2 /'],
      ];
      const expression = '5 5';

      try {
        expressionEvaluator.evaluate(expression, csvData);
      } catch (e) {
        const expectedErrorMessage = 'Invalid expression!';
        expect(e.message).to.equal(expectedErrorMessage);
      }
    });

    it('returns correct error message when no sufficient operands found', function () {
      const csvData = [
        ['2 10 3 * -', '5 5', '81 9 /', '1 +'],
        ['20 6 %', '15 3 6 7', '3 9 *', '9 3 * 2 /'],
      ];
      const expression = '1 +';

      try {
        expressionEvaluator.evaluate(expression, csvData);
      } catch (e) {
        const expectedErrorMessage = 'No sufficient operands!';
        expect(e.message).to.equal(expectedErrorMessage);
      }
    });

    it('returns correct error message for invalid cell reference', function () {
      const csvData = [
        ['2 10 3 * -', '5 5', '81 9 /', '1 +'],
        ['20 6 %', '15 3 6 7', '3 9 *', '9 3 * 2 /'],
      ];
      const expression = 'abc 1 +';

      try {
        expressionEvaluator.evaluate(expression, csvData);
      } catch (e) {
        const expectedErrorMessage = 'No sufficient operands!';
        expect(e.message).to.equal(expectedErrorMessage);
      }
    });

    it('returns correct error message for invalid operators', function () {
      const csvData = [
        ['2 10 3 * -', '5 5', '81 9 /', '1 +'],
        ['20 6 %', '15 3 6 7', '3 9 *', '9 3 * 2 /'],
      ];
      const expression = '5 1 ^';

      try {
        expressionEvaluator.evaluate(expression, csvData);
      } catch (e) {
        const expectedErrorMessage = 'Invalid expression!';
        expect(e.message).to.equal(expectedErrorMessage);
      }
    });
  });
});
