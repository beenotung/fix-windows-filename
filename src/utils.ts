export let WindowsFilenameMapping = {
  /* replace colon : to Modifier Letter Colon (U+A789) */
  ':': '꞉',
  '<': '＜',
  '>': '＞',
  '|': '｜',
  '?': '？',
  '*': '＊',
  '"': "''",
};

export function fixWindowsFilename(filename: string): string {
  Object.entries(WindowsFilenameMapping).forEach(([k, v]) => {
    filename = filename.replace(new RegExp('\\' + k, 'g'), v);
  });
  return filename;
}
