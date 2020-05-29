const expressionEvaluator = require('./expressionEvaluator.js');

/**
 * Calculates postfix expressions as a multidimensional array
 *
 * @param {array} csvData
 * @returns {array}
 */
const calculate = (csvData) => (
  csvData.map((row) => row.map((cell) => {
    try {
      return expressionEvaluator.evaluate(cell, csvData);
    } catch (error) {
      return '#ERR';
    }
  }))
);

module.exports = {
  calculate,
};
