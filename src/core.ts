import { lstat, readdir, rename } from '@beenotung/tslib/fs';
import * as path from 'path';
import { config } from './config';
import { fixWindowsFilename, WindowsFilenameMapping } from './utils';

WindowsFilenameMapping['*'] = 'x';

export async function checkFile(pathname: string) {
  const filename = path.basename(pathname);
  const fixedFilename = fixWindowsFilename(filename).replace(/\n/g, ' ');
  if (filename !== fixedFilename) {
    const dirname = path.dirname(pathname);
    const newPathname = path.join(dirname, fixedFilename);
    console.log(
      'rename in',
      JSON.stringify(dirname),
      ':',
      JSON.stringify(filename),
      '~~>',
      JSON.stringify(fixedFilename),
    );
    if (!config.dryRun) {
      await rename(pathname, newPathname);
    }
  }
}

export async function checkDir(pathname: string) {
  const ss = await readdir(pathname);
  const ps = [];
  for (const s of ss) {
    const childPathname = path.join(pathname, s);
    const stat = await lstat(childPathname);
    if (stat.isDirectory()) {
      ps.push(checkDir(childPathname).then(() => checkFile(childPathname)));
    } else {
      ps.push(checkFile(childPathname));
    }
  }
  await Promise.all(ps);
}
