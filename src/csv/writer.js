const csv = require('fast-csv');

/**
 * Write output data to a csv file
 *
 * @param {string} outputData
 * @param {string} outputPath
 * @returns {Promise}
 */
const writeData = (outputData, outputPath) => (
  new Promise((resolve, reject) => {
    csv
      .writeToPath(outputPath, outputData, { headers: false })
      .on('finish', () => {
        resolve(true);
      })
      .on('error', () => {
        reject(new Error('Something went wrong while saving data'));
      });
  })
);

module.exports = {
  writeData,
};
