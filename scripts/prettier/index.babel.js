/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

// Based on similar script in Jest
// https://github.com/facebook/jest/blob/a7acc5ae519613647ff2c253dd21933d6f94b47f/scripts/prettier.js

import chalk from 'chalk';
import * as fs from 'fs';
import * as glob from 'glob';
import * as prettier from 'prettier';
import cosmiconfig from 'cosmiconfig';
import { listChangedFiles } from '../shared/listChangedFiles';

const mode = process.argv[2] || 'check';
const shouldWrite = mode === 'write' || mode === 'write-changed';
const onlyChanged = mode === 'check-changed' || mode === 'write-changed';

const changedFiles = onlyChanged ? listChangedFiles() : null;
let didWarn = false;
let didError = false;

const files = glob
  .sync('**/*.js', { ignore: ['**/node_modules/**', '**/dist/**'] })
  .filter(f => !onlyChanged || changedFiles.has(f));

if (!files.length) {
  process.exit(0);
}

files.forEach(file => {
  const options = cosmiconfig('prettier').searchSync().config;

  try {
    const input = fs.readFileSync(file, 'utf8');
    if (shouldWrite) {
      const output = prettier.format(input, options);
      if (output !== input) {
        fs.writeFileSync(file, output, 'utf8');
      }
    } else {
      if (!prettier.check(input, options)) {
        if (!didWarn) {
          console.log(
            '\n' +
              chalk.red(
                `  This project uses prettier to format all JavaScript code.\n`,
              ) +
              chalk.dim(`    Please run `) +
              chalk.reset('yarn prettier:all') +
              chalk.dim(
                ` and add changes to files listed below to your commit:`,
              ) +
              `\n\n`,
          );
          didWarn = true;
        }
        console.log(file);
      }
    }
  } catch (error) {
    didError = true;
    console.log('\n\n' + error.message);
    console.log(file);
  }
});

if (didWarn || didError) {
  process.exit(1);
}