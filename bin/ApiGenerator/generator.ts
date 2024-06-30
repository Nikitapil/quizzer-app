import { generateApi } from 'swagger-typescript-api';
import * as path from 'node:path';

const apisPaths = ['Auth', 'Users', 'Quizes'];

const generateApiByPath = (apiName: string) => {
  generateApi({
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
};

apisPaths.forEach((path) => generateApiByPath(path));
