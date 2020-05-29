const math = require('mathjs');

/**
 * Get corresponding number of given English letter
 *
 * @param string
 * @returns {int}
 */
const getNumberByLetter = (string) => {
  const tokens = string.toUpperCase().split('');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return tokens.reduce((sum, token, index) => (
    sum + math.pow(alphabet.length, (tokens.length - index - 1)) * (alphabet.indexOf(token) + 1)
  ), 0);
};

/**
 * Get corresponding array index of a given Excel cell reference
 *
 * @param cellReference
 * @returns {{}}
 */
const getArrayIndex = (cellReference) => {
  const arrayIndex = {};

  const columnPattern = /^[a-zA-Z]+/;
  const rowPattern = /\d+$/;

  const columnFound = cellReference.match(columnPattern);
  const rowFound = cellReference.match(rowPattern);

  if (columnFound && rowFound) {
    arrayIndex.column = getNumberByLetter(columnFound[0]) - 1;
    arrayIndex.row = Number(rowFound[0]) - 1;
  } else {
    throw new Error('Invalid cell reference');
  }

  return arrayIndex;
};

module.exports = {
  getArrayIndex,
};
