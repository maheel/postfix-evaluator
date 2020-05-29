const csvReader = require('./../csv/reader.js');
const csvWriter = require('./../csv/writer.js');
const postfixGridCalculator = require('./gridCalculator.js');

const inputFileFolder = 'upload';
const outputFileFolder = 'download';

/**
 * Process csv files with postfix expressions
 *
 * @param {string} inputFileName
 * @param {string} outputFileName
 */
const process = async (inputFileName, outputFileName) => {
  const inputPath = `${inputFileFolder}/${inputFileName}`;

  const csvData = await csvReader.readData(inputPath);

  const outputData = await postfixGridCalculator.calculate(csvData);

  const outputPath = `${outputFileFolder}/${outputFileName}`;
  const result = await csvWriter.writeData(outputData, outputPath);

  if (result === true) {
    console.log('Successfully processed.');
  } else {
    console.log('Something went wrong, please check the file');
  }
};

module.exports = {
  process,
};
