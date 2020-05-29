import { expect } from 'chai';
import sinon from 'sinon';

import csvProcessor from '../../src/postfix/csvProcessor';
import csvWriter from '../../src/csv/writer';
import csvReader from '../../src/csv/reader';
import gridCalculator from '../../src/postfix/gridCalculator';

describe('CSV Processor', function () {
  describe('process', function () {
    let readData;
    let calculate;
    let writeData;

    afterEach(() => {
      readData.restore();
      calculate.restore();
      writeData.restore();
    });

    const inputFileName = 'input.csv';
    const outputFileName = 'output.csv';

    it('processes data successfully and writes output to a file', async function () {
      const csvData = [
        ['b1 b2 +', '2 b2 3 * -', '3', '+'],
        ['a1', '5', '', '7 2 /'],
        ['c2 3 *', '1 2', '', '5 1 2 + 4 * + 3 -'],
      ];

      const outputData = [
        [-8, -13, 3, '#ERR'],
        [-8, 5, 0, 3.5],
        [0, '#ERR', 0, 14],
      ];

      readData = sinon
        .stub(csvReader, 'readData')
        .returns(Promise.resolve(csvData));

      calculate = sinon
        .stub(gridCalculator, 'calculate')
        .returns(Promise.resolve(outputData));

      writeData = sinon
        .stub(csvWriter, 'writeData')
        .returns(Promise.resolve(true));

      await csvProcessor.process(inputFileName, outputFileName);

      expect(readData.callCount).to.equal(1);
      expect(calculate.callCount).to.equal(1);
      expect(writeData.callCount).to.equal(1);
    });
  });
});
