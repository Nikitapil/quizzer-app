import { generateApi } from 'swagger-typescript-api';
import * as path from 'node:path';
import { MockGenerator } from 'ts-mocker';

const apisPaths = ['Auth', 'Users', 'Quizes'];

const generateApiByPath = async (apiName: string) => {
  await generateApi({
    name: apiName,
    moduleNameIndex: 1,
    output: path.resolve(process.cwd(), `./src/api/swagger/${apiName}`),
    templates: path.resolve(process.cwd(), './bin/ApiGenerator/templates'),
    url: `http://localhost:5000/api/docs/${apiName}-yaml`,
    httpClientType: 'axios',
    extractEnums: true,
    extractRequestParams: true,
    unwrapResponseData: true,
    cleanOutput: true,
    modular: true
  });

  const mockGenerator = new MockGenerator({
    filePath: path.resolve(
      process.cwd(),
      `./src/api/swagger/${apiName}/data-contracts.ts`
    ),
    outputPath: path.resolve(
      process.cwd(),
      `./src/api/swagger/${apiName}`,
      'mock.ts'
    ),
    needImportsTypePrefix: true,
    allowImportingTsExtensions: false
  });

  mockGenerator.generate();
};

apisPaths.forEach((path) => generateApiByPath(path));
