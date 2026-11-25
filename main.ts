// One Line, One Laugh — make.fun entry.
//
// Writes a single funny line to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The joke: the one tool whose whole job is remembering forgets,
// so its owner and it end up in a silent staring contest.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My password manager forgot my password, so now we just stare at each other in silence.";

function outputDir(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!dir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  return dir;
}

function checked(line: string): string {
  const trimmed = line.trim();
  if (trimmed.length < 1 || trimmed.length > 140) {
    throw new Error(`line is ${trimmed.length} chars, must be 1-140`);
  }
  if (trimmed !== line) {
    throw new Error("line must not start or end with whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("line must fit on one line");
  }
  return trimmed;
}

function main(): void {
  const line = checked(JOKE);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, line, { encoding: "utf-8", mode: 0o644 });
  chmodSync(target, 0o644);
  console.log(`wrote ${line.length} chars to ${target}`);
}

try {
  main();
} catch (error) {
  console.error(`error: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
