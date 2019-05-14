#!/usr/bin/env node
import { catchMain } from '@beenotung/tslib/node';
import { config } from './config';
import { checkDir } from './core';

const name = 'fix-windows-filename';

for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  switch (arg) {
    case '--run':
    case '-r':
      config.dryRun = false;
      break;
    case '--help':
    case '-h':
      console.log(name, arg);
      console.log('Usage: rename files recursively to ');
      console.log();
      console.log('Mode: dry run');
      console.log('$', name);
      console.log();
      console.log('Mode: show help');
      console.log('$', name, '--help');
      console.log('$', name, '-h');
      console.log();
      console.log('Mode: do actual rename');
      console.log('$', name, '--run');
      console.log('$', name, '-r');
      process.exit();
      break;
    default:
      console.error('unknown argument:', arg);
      process.exit(1);
  }
}
catchMain(checkDir('.'));
