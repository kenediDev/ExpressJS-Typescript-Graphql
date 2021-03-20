import fs from 'fs';
import path from 'path';

export const secretKey = fs.readFileSync(
  path.join(__dirname, '../../jwtRS256.key')
);
