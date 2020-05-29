const crypto = require('crypto');
const math = require('mathjs');

const csvCellToArrayIndexMapper = require('./../util/csvCellToArrayIndexMapper.js');

const calculatedTokens = {};
const visitedExpressions = {};

/**
 * Check if the token is an operator
 *
 * @param token
 * @returns {boolean}
 */
const isOperator = (token) => {
  switch (token) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '%':
      return true;
    default:
      return false;
  }
};

/**
 * Check if the token is an operand
 *
 * @param {string} token
 * @returns {boolean}
 */
const isOperand = (token) => (
  (!token === false && Number.isNaN(Number(token)) === false)
);

/**
 * Check if the token is a cell reference
 *
 * @param token
 * @returns {boolean}
 */
const isCellReference = (token) => (/^[a-zA-Z]+\d+$/.test(token));

/**
 * Calculates and basic arithmetic operation
 *
 * @param {number} operand1
 * @param {number} operand2
 * @param {string} operator
 * @returns {(number|float)}
 */
const calculate = (operand1, operand2, operator) => (
  math.round(math.eval(`${operand1} ${operator} ${operand2}`), 2)
);

/**
 * Evaluate postfix expression in Excel format
 *
 * @param {string} expression
 * @param {array} csvData
 * @returns {*}
 */
const evaluate = (expression, csvData) => {
  const expressionHash = crypto.createHash('md5').update(expression).digest('hex');

  if (expressionHash in visitedExpressions) {
    return visitedExpressions[expressionHash];
  }

  const tokens = expression.split(' ');
  const tokenStack = [];

  tokens.forEach((currentToken) => {
    if (isOperator(currentToken)) {
      if (tokenStack.length < 2) {
        throw new Error('No sufficient operands!');
      }

      const operand2 = tokenStack.pop();
      const operand1 = tokenStack.pop();

      const result = calculate(Number(operand1), Number(operand2), currentToken);

      tokenStack.push(result);
    } else if (isOperand(currentToken)) {
      tokenStack.push(Number(currentToken));
    } else if (isCellReference(currentToken)) {
      if (currentToken in calculatedTokens) {
        tokenStack.push(calculatedTokens[currentToken]);
      } else {
        const arrayIndex = csvCellToArrayIndexMapper.getArrayIndex(currentToken);
        const cellValue = csvData[arrayIndex.row][arrayIndex.column];

        const cellReferenceExpressionHash = crypto.createHash('md5').update(cellValue).digest('hex');

        const evaluatedCellValue = evaluate(cellValue, csvData);

        tokenStack.push(evaluatedCellValue);
        calculatedTokens[currentToken] = evaluatedCellValue;
        visitedExpressions[cellReferenceExpressionHash] = evaluatedCellValue;
      }
    }
  });

  if (tokenStack.length === 0) {
    return 0;
  }

  if (tokenStack.length === 1) {
    return tokenStack.pop();
  }

  throw new Error('Invalid expression!');
};

module.exports = {
  evaluate,
};
