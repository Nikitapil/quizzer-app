import { generateApi } from 'swagger-typescript-api';
import * as path from 'node:path';

const apisPaths = ['auth-yaml', 'users-yaml', 'quizes-yaml'];

const generateApiByPath = (apiPath: string) => {
  const apiName = apiPath.split('-')[0];

  generateApi({
    name: 'Api',
    output: path.resolve(process.cwd(), `./src/api/swagger/${apiName}`),
    templates: path.resolve(process.cwd(), './bin/ApiGenerator/templates'),
    url: `http://localhost:5000/api/docs/${apiPath}`,
    httpClientType: 'axios',
    extractEnums: true,
    extractRequestParams: true,
    unwrapResponseData: true,
    cleanOutput: true,
    modular: true
  });
};

apisPaths.forEach((path) => generateApiByPath(path));
