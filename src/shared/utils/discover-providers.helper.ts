import { globSync } from 'glob';

export function discoverProviders(
  kind: string,
  baseDir: string,
): any[] {
  const results: any[] = [];

  const normalizedBase = baseDir.replace(/\\/g, '/');
  const files = [
    ...globSync(`${normalizedBase}/**/*.${kind}.js`, { nodir: true }),
    ...globSync(`${normalizedBase}/**/*.${kind}.ts`, { nodir: true }),
  ];

  for (const file of files) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
    const mod = require(file);

    const classes = Object.values(mod).filter(
      (e: any) =>
        typeof e === 'function' &&
        e.prototype?.constructor &&
        new RegExp(`${kind}$`, 'i').test(e.name),
    );

    results.push(...classes);
  }

  return results;
}
