import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectRoot = new URL('../../', import.meta.url);
const git = process.platform === 'win32' ? 'git.exe' : 'git';
const prettier = fileURLToPath(new URL('../../node_modules/prettier/bin/prettier.cjs', import.meta.url));
const eslint = fileURLToPath(new URL('../../node_modules/eslint/bin/eslint.js', import.meta.url));
const typescript = fileURLToPath(new URL('../../node_modules/typescript/bin/tsc', import.meta.url));
const vitest = fileURLToPath(new URL('../../node_modules/vitest/vitest.mjs', import.meta.url));

function capture(command, args) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: 'utf8'
  });

  if (result.status !== 0) {
    process.stderr.write(result.stderr || result.stdout);
    process.exit(result.status ?? 1);
  }

  return result.stdout.split(/\r?\n/u).filter(Boolean);
}

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: 'utf8'
  });

  process.stdout.write(result.stdout ?? '');
  process.stderr.write(result.stderr ?? '');

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const changedFiles = new Set([
  ...capture(git, ['diff', '--name-only', '--diff-filter=ACMR', 'HEAD']),
  ...capture(git, ['ls-files', '--others', '--exclude-standard'])
]);

const excludedPrefixes = ['.agents/', '.codex/', 'dist/', 'node_modules/', 'temp/'];
const checkableFiles = [...changedFiles]
  .map((file) => file.replaceAll('\\', '/'))
  .filter((file) => !excludedPrefixes.some((prefix) => file.startsWith(prefix)))
  .filter((file) => existsSync(new URL(file, projectRoot)));

if (checkableFiles.length === 0) {
  console.log('No changed project files require checks.');
  process.exit(0);
}

console.log(`Checking ${checkableFiles.length} changed project file(s).`);
run(process.execPath, [prettier, '--check', '--ignore-unknown', ...checkableFiles]);

const sourceFiles = checkableFiles.filter((file) => file.startsWith('src/') && /\.[cm]?[jt]sx?$/u.test(file));

if (sourceFiles.length > 0) {
  run(process.execPath, [eslint, '--quiet', '--cache', '--report-unused-disable-directives', ...sourceFiles]);
  run(process.execPath, [typescript, '--noEmit']);
  run(process.execPath, [vitest, 'run']);
}
