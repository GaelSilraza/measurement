import * as path from 'path';
import { addAliases } from 'module-alias';

export const basePath = path.resolve(__dirname, '../../..');

addAliases({
  '@src': path.join(basePath, 'src'),
  '@test': path.join(basePath, 'test'),
});
