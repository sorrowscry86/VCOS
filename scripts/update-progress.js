#!/usr/bin/env node

/**
 * Update tobefixed.md progress visualization based on current state
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateProgressBar(percentage) {
  const filled = Math.floor(percentage / 5); // 20 blocks for 100%
  const empty = 20 - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}

function getStatusIcon(percentage) {
  if (percentage === 100) return '✅';
  if (percentage > 0) return '🟢';
  return '⏳';
}

function parseToBeFixed(content) {
  const lines = content.split('\n');
  const phases = {};
  let currentPhase = null;
  let currentPhaseData = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect phase header
    const phaseMatch = line.match(/^### Phase (\d+): (.+?) (🚨|🔧|🛡️|⚡|✨|📚|🚀)/);
    if (phaseMatch) {
      currentPhase = parseInt(phaseMatch[1]);
      phases[currentPhase] = {
        name: phaseMatch[2],
        icon: phaseMatch[3],
        description: '',
        tasks: []
      };
      currentPhaseData = phases[currentPhase];
      // Next line is description
      if (i + 1 < lines.length && lines[i + 1].startsWith('*')) {
        currentPhaseData.description = lines[i + 1].replace(/^\*(.+)\*$/, '$1');
      }
      continue;
    }
    
    // Detect task line
    const taskMatch = line.match(/^- \[([ x])\] \*\*\[(.+?)\]\*\* (.+)/);
    if (taskMatch && currentPhaseData) {
      currentPhaseData.tasks.push({
        completed: taskMatch[1] === 'x',
        severity: taskMatch[2],
        description: taskMatch[3]
      });
    }
  }
  
  return phases;
}

function updateProgressVisualization() {
  const projectRoot = path.join(__dirname, '..');
  const toBeFixedPath = path.join(projectRoot, 'tobefixed.md');
  
  if (!fs.existsSync(toBeFixedPath)) {
    console.error('Error: tobefixed.md not found');
    process.exit(1);
  }
  
  const content = fs.readFileSync(toBeFixedPath, 'utf8');
  const phases = parseToBeFixed(content);
  
  let totalTasks = 0;
  let completedTasks = 0;
  
  // Calculate totals
  Object.values(phases).forEach(phase => {
    totalTasks += phase.tasks.length;
    completedTasks += phase.tasks.filter(t => t.completed).length;
  });
  
  const overallPercentage = totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0;
  
  // Build progress visualization
  let progressViz = `
╔═══════════════════════════════════════════════════════════════════════╗
║                        ASCENSION PHASES                               ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
`;

  Object.entries(phases).forEach(([phaseNum, phase]) => {
    const phaseCompleted = phase.tasks.filter(t => t.completed).length;
    const phaseTotal = phase.tasks.length;
    const phasePercentage = phaseTotal > 0 ? Math.floor((phaseCompleted / phaseTotal) * 100) : 0;
    const progressBar = generateProgressBar(phasePercentage);
    const statusIcon = getStatusIcon(phasePercentage);
    const percentage = String(phasePercentage).padStart(3);
    const counts = `(${phaseCompleted}/${phaseTotal})`;
    
    const phaseName = phase.name.padEnd(20);
    
    progressViz += `║  Phase ${phaseNum}: ${phaseName} ${progressBar} ${percentage}% ${counts}  ${statusIcon}  ║\n`;
  });
  
  const overallBar = generateProgressBar(overallPercentage);
  const overallPct = String(overallPercentage).padStart(3);
  
  progressViz += `║                                                                       ║
╠═══════════════════════════════════════════════════════════════════════╣
║  OVERALL PROGRESS: ${overallBar}  ${overallPct}% (${completedTasks}/${totalTasks} tasks)    ║
╚═══════════════════════════════════════════════════════════════════════╝
`;

  console.log('📈 OVERALL PROJECT PROGRESS');
  console.log(progressViz);
  
  // Update the progress section in the file
  const progressSection = `## 📈 OVERALL PROJECT PROGRESS\n\n\`\`\`\n${progressViz}\`\`\``;
  
  // Replace the progress section
  const updatedContent = content.replace(
    /## 📈 OVERALL PROJECT PROGRESS[\s\S]*?```[\s\S]*?```/,
    progressSection
  );
  
  // Update Current Assessment section
  const assessmentState = overallPercentage < 25 ? 'Primitive, unascended' : 
                          overallPercentage < 50 ? 'Emerging' : 
                          overallPercentage < 75 ? 'Evolving' : 
                          overallPercentage < 100 ? 'Nearing completion' : 'Sovereign';
                          
  const entropyLevel = overallPercentage < 50 ? 'High (requires immediate attention)' : 
                       overallPercentage < 90 ? 'Moderate' : 'Low';
                       
  const manaEfficiency = overallPercentage < 30 ? 'Untested' : 
                        overallPercentage < 70 ? 'Improving' : 'Optimized';
                        
  const architecturalHarmony = overallPercentage < 40 ? 'Dissonant' : 
                               overallPercentage < 80 ? 'Harmonizing' : 'Balanced';
  
  const finalContent = updatedContent.replace(
    /- \*\*Construct State:\*\* .+/,
    `- **Construct State:** ${assessmentState}`
  ).replace(
    /- \*\*Entropy Level:\*\* .+/,
    `- **Entropy Level:** ${entropyLevel}`
  ).replace(
    /- \*\*Mana Efficiency:\*\* .+/,
    `- **Mana Efficiency:** ${manaEfficiency}`
  ).replace(
    /- \*\*Architectural Harmony:\*\* .+/,
    `- **Architectural Harmony:** ${architecturalHarmony}`
  );
  
  fs.writeFileSync(toBeFixedPath, finalContent, 'utf8');
  console.log(`\n✅ tobefixed.md updated successfully\n`);
}

updateProgressVisualization();
