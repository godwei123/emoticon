import path from 'node:path';

export function generateImport(name:string, from:string) {
  if (Array.isArray(name)) name = `{${name.toString()}}`;

  return `import ${name} from "${from}";`;
}

export function generateExport(name:string, from:string) {
  const base = `export {${name.toString()}}`;

  return from ? `${base} from "${from}";` : `${base};`;
}

export function toImportPath(input:string) {
  input = input.split(path.sep).join(path.posix.sep);

  return input.charAt(0) !== '.' ? `./${input}` : input;
}
