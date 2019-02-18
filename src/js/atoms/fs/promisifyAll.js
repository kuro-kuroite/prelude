// import * as Promise from 'bluebird';

import fs from 'fs';
import * as util from 'util';

// HACK: npm lib の時に上手く動かないので以下で代用する
// const fsAsync = Promise.promisifyAll(fs);
const fsAsync = {
  readFile: util.promisify(fs.readFile),
  writeFile: util.promisify(fs.writeFile),
};

export default fsAsync;
