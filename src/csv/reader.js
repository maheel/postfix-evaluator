const csv = require('fast-csv');

/**
 * Read data from a given csv file
 *
 * @param {string} inputFilePath
 * @returns {Promise}
 */
const readData = (inputFilePath) => {
  const csvData = [];

  return new Promise((resolve, reject) => {
    csv
      .fromPath(inputFilePath)
      .on('data', (data) => {
        csvData.push(data);
      })
      .on('end', () => {
        resolve(csvData);
      })
      .on('error', () => {
        reject(new Error('Something went wrong while reading the CSV file.'));
      });
  });
};

module.exports = {
  readData,
};
