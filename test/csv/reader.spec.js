import { expect } from 'chai';

import csvReader from '../../src/csv/reader';

const inputFileFolder = 'test/fixtures/upload';
const inputFileName = 'inputFile.csv';

describe('CSV Reader', function () {
  describe('readData', function () {
    it('reads data from a given file successfully', async function () {
      const inputPath = `${inputFileFolder}/${inputFileName}`;

      const response = await csvReader.readData(inputPath);

      const expectedResult = [
        ['b1 b2 +', '2 b2 3 * -', '3', '+'],
        ['a1', '5', '', '7 2 /'],
        ['c2 3 *', '1 2', '', '5 1 2 + 4 * + 3 -'],
      ];

      expect(response).to.deep.equal(expectedResult);
    });
  });
});
