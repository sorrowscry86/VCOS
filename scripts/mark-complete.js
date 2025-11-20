#!/usr/bin/env node

/**
 * Mark a task as complete in tobefixed.md
 * Usage: node scripts/mark-complete.js <phase> <task-number>
 * Example: node scripts/mark-complete.js 1 1
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: node scripts/mark-complete.js <phase> <task-number>');
  console.log('Example: node scripts/mark-complete.js 1 1');
  console.log('');
  console.log('Phase numbers:');
  console.log('  1 - CRITICAL STABILIZATION');
  console.log('  2 - CORE MATRIX');
  console.log('  3 - WARDS & SECURITY');
  console.log('  4 - EFFICIENCY & FLOW');
  console.log('  5 - HIGHER FUNCTIONS');
  console.log('  6 - THE GRIMOIRE (DOCS)');
  console.log('  7 - FUTURE ASCENSION');
  process.exit(1);
}

const phase = parseInt(args[0]);
const taskNumber = parseInt(args[1]);

if (phase < 1 || phase > 7) {
  console.error('Error: Phase must be between 1 and 7');
  process.exit(1);
}

const toBeFixedPath = path.join(__dirname, '..', 'tobefixed.md');

try {
  let content = fs.readFileSync(toBeFixedPath, 'utf8');
  const lines = content.split('\n');
  
  let currentPhase = 0;
  let taskCount = 0;
  let marked = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect phase header
    if (line.match(/^### Phase (\d+):/)) {
      currentPhase = parseInt(RegExp.$1);
      taskCount = 0;
      continue;
    }
    
    // Detect task line
    if (currentPhase === phase && line.match(/^- \[ \] \*\*\[/)) {
      taskCount++;
      if (taskCount === taskNumber) {
        lines[i] = line.replace('- [ ]', '- [x]');
        marked = true;
        console.log(`✅ Marked task ${taskNumber} in Phase ${phase} as complete`);
        break;
      }
    }
  }
  
  if (!marked) {
    console.error(`Error: Could not find task ${taskNumber} in Phase ${phase}`);
    process.exit(1);
  }
  
  fs.writeFileSync(toBeFixedPath, lines.join('\n'), 'utf8');
  console.log('📝 tobefixed.md updated');
  console.log('');
  console.log('Run "npm run high-evolutionary:progress" to update progress visualization');
  
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
