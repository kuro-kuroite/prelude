import * as Promise from 'bluebird';

import fs from 'fs';

const fsAsync = Promise.promisifyAll(fs);

export default fsAsync;
