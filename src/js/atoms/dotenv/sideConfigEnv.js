import dotenv from 'dotenv';
import path from 'path';

const projectPath = '../../../../../../';

const result = dotenv.config({
  path: path.resolve(__dirname, projectPath, '.env'),
});

if (result.error) {
  throw result.error;
}
