import { expect } from 'chai';

import csvWriter from '../../src/csv/writer';

const outputFileFolder = 'test/fixtures/download';
const outputFileName = 'outputFile.csv';

describe('CSV Writer', function () {
  describe('writeData', function () {
    it('writes data successfully to a file successfully', async function () {
      const outputPath = `${outputFileFolder}/${outputFileName}`;

      const data = [
        [-8, -13, 3, '#ERR'],
        [-8, 5, 0, 3.5],
        [0, '#ERR', 0, 14],
      ];

      const response = await csvWriter.writeData(data, outputPath);

      expect(response).to.be.true;
    });
  });
});
