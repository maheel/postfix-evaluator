const yargs = require('yargs');

const postfixCsvProcessor = require('./postfix/csvProcessor.js');

/**
 * Commandline to run the postfix evaluation program
 *
 * Ex: node src/index.js postfix --inputFile="inputFile.csv" --outputFile="outputFile.csv"
 */
yargs.command({
  command: 'postfix',
  describe: 'Postfix notation',
  builder: {
    inputFile: {
      describe: 'Input file',
      demandOption: true,
      type: 'string',
    },
    outputFile: {
      describe: 'Output file',
      demandOption: true,
      type: 'string',
    },
  },
  handler: async (argv) => {
    await postfixCsvProcessor.process(argv.inputFile, argv.outputFile);
  },
});

console.log(yargs.argv);
