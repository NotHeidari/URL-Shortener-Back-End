import * as path from 'path';
import * as dotenv from 'dotenv';

export function loadEnv() {
  const envFile = process.env.NODE_ENV === 'production' ? '.env.local' : '.env';
  dotenv.config({ path: path.resolve(process.cwd(), envFile) });
}
