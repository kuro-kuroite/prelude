import dotenv from 'dotenv';
import path from 'path';

const projectPath = '../../../../../../';

export default function configEnv(dotEnvPath = projectPath) {
  const result = dotenv.config({
    path: path.resolve(__dirname, dotEnvPath, '.env'),
  });

  if (result.error) {
    throw result.error;
  }
}
