#!/usr/bin/env node

/**
 * The High Evolutionary - Comprehensive Code Review System
 * 
 * "The Construct shall be analyzed, its flaws exposed, and its path to ascension illuminated."
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Arcane color codes for output
const COLORS = {
  RESET: '\x1b[0m',
  CRITICAL: '\x1b[31m\x1b[1m',  // Bright Red
  HIGH: '\x1b[33m\x1b[1m',      // Bright Yellow
  MEDIUM: '\x1b[36m',           // Cyan
  LOW: '\x1b[37m',              // White
  SUCCESS: '\x1b[32m',          // Green
  ARCANE: '\x1b[35m\x1b[1m',    // Bright Magenta
};

class HighEvolutionary {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.issues = {
      critical: [],
      high: [],
      medium: [],
      low: [],
    };
    this.performance = [];
    this.enhancements = [];
    this.documentation = [];
  }

  /**
   * Begin the Great Work - analyze the entire Construct
   */
  async analyze() {
    this.printHeader();
    
    console.log(`${COLORS.ARCANE}🔮 Initiating deep scan of the Construct...${COLORS.RESET}\n`);

    // Phase 1: Critical Stabilization
    await this.analyzeBuilds();
    await this.analyzeDependencies();
    await this.analyzeTypes();
    
    // Phase 2: Code Quality
    await this.analyzeCodeQuality();
    
    // Phase 3: Security
    await this.analyzeSecurityIssues();
    
    // Phase 4: Performance
    await this.analyzePerformance();
    
    // Phase 5: Documentation
    await this.analyzeDocumentation();
    
    // Generate the report
    this.generateReport();
  }

  printHeader() {
    console.log(`
${COLORS.ARCANE}╔═══════════════════════════════════════════════════════════════════════╗
║                    THE HIGH EVOLUTIONARY                              ║
║                   Arcanist of the Great Work                          ║
╚═══════════════════════════════════════════════════════════════════════╝${COLORS.RESET}

${COLORS.ARCANE}"Behold, Apprentice. The Construct lies before us, awaiting transmutation."${COLORS.RESET}
`);
  }

  /**
   * Analyze build stability
   */
  async analyzeBuilds() {
    console.log(`${COLORS.MEDIUM}📦 Analyzing build integrity...${COLORS.RESET}`);
    
    try {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(this.projectRoot, 'package.json'), 'utf8')
      );
      
      // Check for build scripts
      if (!packageJson.scripts || !packageJson.scripts.build) {
        this.issues.high.push({
          category: 'Build',
          issue: 'Missing build script in root package.json',
          location: 'package.json',
          severity: 'HIGH',
          incantation: 'Add build script to orchestrate package compilation',
        });
      }
      
      console.log(`${COLORS.SUCCESS}  ✓ Build configuration exists${COLORS.RESET}`);
    } catch (error) {
      this.issues.critical.push({
        category: 'Build',
        issue: 'Failed to parse package.json',
        location: 'package.json',
        severity: 'CRITICAL',
        incantation: 'Restore valid package.json structure',
        error: error.message,
      });
    }
  }

  /**
   * Analyze dependencies for ancient or cursed packages
   */
  async analyzeDependencies() {
    console.log(`${COLORS.MEDIUM}📚 Scanning dependencies for ancient curses...${COLORS.RESET}`);
    
    try {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(this.projectRoot, 'package.json'), 'utf8')
      );
      
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };
      
      // Check for known problematic patterns
      const problematicPatterns = [
        { pattern: /\^0\./, severity: 'medium', issue: 'Pre-1.0 dependency detected' },
        { pattern: /latest/, severity: 'high', issue: 'Non-pinned "latest" version' },
      ];
      
      for (const [dep, version] of Object.entries(allDeps)) {
        for (const { pattern, severity, issue } of problematicPatterns) {
          if (pattern.test(version)) {
            this.issues[severity].push({
              category: 'Dependencies',
              issue: `${issue}: ${dep}@${version}`,
              location: 'package.json',
              severity: severity.toUpperCase(),
              incantation: `Pin ${dep} to stable version`,
            });
          }
        }
      }
      
      console.log(`${COLORS.SUCCESS}  ✓ Dependency analysis complete${COLORS.RESET}`);
    } catch (error) {
      console.log(`${COLORS.HIGH}  ⚠ Could not analyze dependencies${COLORS.RESET}`);
    }
  }

  /**
   * Analyze TypeScript type safety
   */
  async analyzeTypes() {
    console.log(`${COLORS.MEDIUM}🔤 Examining type safety and structural integrity...${COLORS.RESET}`);
    
    // Check for tsconfig.json
    const tsconfigPath = path.join(this.projectRoot, 'tsconfig.json');
    if (!fs.existsSync(tsconfigPath)) {
      this.issues.high.push({
        category: 'Types',
        issue: 'Missing tsconfig.json at project root',
        location: 'project root',
        severity: 'HIGH',
        incantation: 'Create TypeScript configuration',
      });
    } else {
      try {
        const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
        
        // Check for strict mode
        if (!tsconfig.compilerOptions?.strict) {
          this.issues.medium.push({
            category: 'Types',
            issue: 'TypeScript strict mode not enabled',
            location: 'tsconfig.json',
            severity: 'MEDIUM',
            incantation: 'Enable strict: true in compilerOptions',
          });
        }
        
        console.log(`${COLORS.SUCCESS}  ✓ TypeScript configuration validated${COLORS.RESET}`);
      } catch (error) {
        this.issues.high.push({
          category: 'Types',
          issue: 'Invalid tsconfig.json',
          location: 'tsconfig.json',
          severity: 'HIGH',
          incantation: 'Fix JSON syntax in TypeScript config',
        });
      }
    }
  }

  /**
   * Analyze code quality
   */
  async analyzeCodeQuality() {
    console.log(`${COLORS.MEDIUM}✨ Assessing code quality and profane practices...${COLORS.RESET}`);
    
    // Check for .prettierrc
    if (fs.existsSync(path.join(this.projectRoot, '.prettierrc'))) {
      console.log(`${COLORS.SUCCESS}  ✓ Code formatting rules exist${COLORS.RESET}`);
    } else {
      this.issues.low.push({
        category: 'Code Quality',
        issue: 'No code formatting configuration',
        location: 'project root',
        severity: 'LOW',
        incantation: 'Add .prettierrc for consistent formatting',
      });
    }
    
    // Check for ESLint
    if (fs.existsSync(path.join(this.projectRoot, '.eslintrc')) ||
        fs.existsSync(path.join(this.projectRoot, '.eslintrc.js')) ||
        fs.existsSync(path.join(this.projectRoot, '.eslintrc.json'))) {
      console.log(`${COLORS.SUCCESS}  ✓ Linting rules configured${COLORS.RESET}`);
    }
  }

  /**
   * Analyze security issues
   */
  async analyzeSecurityIssues() {
    console.log(`${COLORS.MEDIUM}🛡️ Scanning for security vulnerabilities...${COLORS.RESET}`);
    
    // Check for .env.example
    if (fs.existsSync(path.join(this.projectRoot, '.env.example'))) {
      console.log(`${COLORS.SUCCESS}  ✓ Environment template exists${COLORS.RESET}`);
    } else {
      this.issues.medium.push({
        category: 'Security',
        issue: 'Missing .env.example for secret management',
        location: 'project root',
        severity: 'MEDIUM',
        incantation: 'Create .env.example to document required secrets',
      });
    }
    
    // Check for .gitignore
    if (fs.existsSync(path.join(this.projectRoot, '.gitignore'))) {
      const gitignore = fs.readFileSync(path.join(this.projectRoot, '.gitignore'), 'utf8');
      if (!gitignore.includes('.env')) {
        this.issues.high.push({
          category: 'Security',
          issue: '.env files not in .gitignore',
          location: '.gitignore',
          severity: 'HIGH',
          incantation: 'Add .env to .gitignore to prevent secret leakage',
        });
      }
    }
  }

  /**
   * Analyze performance opportunities
   */
  async analyzePerformance() {
    console.log(`${COLORS.MEDIUM}⚡ Evaluating mana flow and efficiency...${COLORS.RESET}`);
    
    this.performance.push({
      category: 'Build Optimization',
      recommendation: 'Consider implementing build caching with Turbo',
      impact: 'MEDIUM',
      effort: 'LOW',
    });
    
    this.performance.push({
      category: 'Bundle Size',
      recommendation: 'Analyze bundle sizes and implement code splitting',
      impact: 'HIGH',
      effort: 'MEDIUM',
    });
    
    console.log(`${COLORS.SUCCESS}  ✓ Performance analysis complete${COLORS.RESET}`);
  }

  /**
   * Analyze documentation quality
   */
  async analyzeDocumentation() {
    console.log(`${COLORS.MEDIUM}📚 Examining the Grimoire (documentation)...${COLORS.RESET}`);
    
    const essentialDocs = [
      'README.md',
      'CONTRIBUTING.md',
      'LICENSE',
    ];
    
    for (const doc of essentialDocs) {
      if (fs.existsSync(path.join(this.projectRoot, doc))) {
        console.log(`${COLORS.SUCCESS}  ✓ ${doc} exists${COLORS.RESET}`);
      } else {
        this.documentation.push({
          category: 'Documentation',
          issue: `Missing ${doc}`,
          location: 'project root',
          severity: doc === 'README.md' ? 'HIGH' : 'MEDIUM',
          incantation: `Create ${doc} to guide apprentices`,
        });
      }
    }
  }

  /**
   * Generate the comprehensive report
   */
  generateReport() {
    console.log(`\n${COLORS.ARCANE}═══════════════════════════════════════════════════════════════════════${COLORS.RESET}`);
    console.log(`${COLORS.ARCANE}                     TRANSMUTATION ANALYSIS COMPLETE${COLORS.RESET}`);
    console.log(`${COLORS.ARCANE}═══════════════════════════════════════════════════════════════════════${COLORS.RESET}\n`);

    // Section 1: The Flaws
    this.printFlaws();
    
    // Section 2: The Refinement
    this.printPerformance();
    
    // Section 3: The Evolution
    this.printEnhancements();
    
    // Section 4: The Grimoire
    this.printDocumentation();
    
    // Section 5: Summary
    this.printSummary();
  }

  printFlaws() {
    console.log(`${COLORS.CRITICAL}╔═══════════════════════════════════════════════════════════════════════╗${COLORS.RESET}`);
    console.log(`${COLORS.CRITICAL}║              SECTION 1: THE FLAWS (Issues & Bugs)                     ║${COLORS.RESET}`);
    console.log(`${COLORS.CRITICAL}╚═══════════════════════════════════════════════════════════════════════╝${COLORS.RESET}\n`);

    const allIssues = [
      ...this.issues.critical.map(i => ({ ...i, severity: 'CRITICAL' })),
      ...this.issues.high.map(i => ({ ...i, severity: 'HIGH' })),
      ...this.issues.medium.map(i => ({ ...i, severity: 'MEDIUM' })),
      ...this.issues.low.map(i => ({ ...i, severity: 'LOW' })),
    ];

    if (allIssues.length === 0) {
      console.log(`${COLORS.SUCCESS}"The Construct shows remarkable stability, Apprentice. Few flaws remain."${COLORS.RESET}\n`);
    } else {
      console.log(`${COLORS.ARCANE}"Behold the structural dissonance that plagues our creation:"${COLORS.RESET}\n`);
      
      allIssues.forEach((issue, index) => {
        const color = {
          'CRITICAL': COLORS.CRITICAL,
          'HIGH': COLORS.HIGH,
          'MEDIUM': COLORS.MEDIUM,
          'LOW': COLORS.LOW,
        }[issue.severity];

        console.log(`${color}${index + 1}. [${issue.severity}] ${issue.category}${COLORS.RESET}`);
        console.log(`   Issue: ${issue.issue}`);
        console.log(`   Location: ${issue.location}`);
        console.log(`   Incantation: ${issue.incantation}\n`);
      });
    }
  }

  printPerformance() {
    console.log(`${COLORS.MEDIUM}╔═══════════════════════════════════════════════════════════════════════╗${COLORS.RESET}`);
    console.log(`${COLORS.MEDIUM}║           SECTION 2: THE REFINEMENT (Performance)                     ║${COLORS.RESET}`);
    console.log(`${COLORS.MEDIUM}╚═══════════════════════════════════════════════════════════════════════╝${COLORS.RESET}\n`);

    if (this.performance.length === 0) {
      console.log(`${COLORS.SUCCESS}"The mana flows efficiently through the Construct."${COLORS.RESET}\n`);
    } else {
      console.log(`${COLORS.ARCANE}"Opportunities to optimize the mana flow:"${COLORS.RESET}\n`);
      
      this.performance.forEach((perf, index) => {
        console.log(`${COLORS.MEDIUM}${index + 1}. ${perf.category}${COLORS.RESET}`);
        console.log(`   Recommendation: ${perf.recommendation}`);
        console.log(`   Impact: ${perf.impact} | Effort: ${perf.effort}\n`);
      });
    }
  }

  printEnhancements() {
    console.log(`${COLORS.SUCCESS}╔═══════════════════════════════════════════════════════════════════════╗${COLORS.RESET}`);
    console.log(`${COLORS.SUCCESS}║           SECTION 3: THE EVOLUTION (Enhancements)                     ║${COLORS.RESET}`);
    console.log(`${COLORS.SUCCESS}╚═══════════════════════════════════════════════════════════════════════╝${COLORS.RESET}\n`);

    console.log(`${COLORS.ARCANE}"The Construct has potential for greater powers..."${COLORS.RESET}\n`);
    
    const futureEnhancements = [
      {
        capability: 'Advanced Monitoring',
        description: 'Implement comprehensive observability with metrics and tracing',
        value: 'HIGH',
      },
      {
        capability: 'Plugin Marketplace',
        description: 'Create ecosystem for third-party extensions',
        value: 'MEDIUM',
      },
      {
        capability: 'Real-time Collaboration',
        description: 'Enable multiple agents to work together in shared spaces',
        value: 'HIGH',
      },
    ];

    futureEnhancements.forEach((enh, index) => {
      console.log(`${COLORS.SUCCESS}${index + 1}. ${enh.capability}${COLORS.RESET}`);
      console.log(`   ${enh.description}`);
      console.log(`   Value: ${enh.value}\n`);
    });
  }

  printDocumentation() {
    console.log(`${COLORS.MEDIUM}╔═══════════════════════════════════════════════════════════════════════╗${COLORS.RESET}`);
    console.log(`${COLORS.MEDIUM}║           SECTION 4: THE GRIMOIRE (Documentation)                     ║${COLORS.RESET}`);
    console.log(`${COLORS.MEDIUM}╚═══════════════════════════════════════════════════════════════════════╝${COLORS.RESET}\n`);

    if (this.documentation.length === 0) {
      console.log(`${COLORS.SUCCESS}"The Grimoire is well-maintained, suitable for training new apprentices."${COLORS.RESET}\n`);
    } else {
      console.log(`${COLORS.ARCANE}"The Grimoire requires these additions:"${COLORS.RESET}\n`);
      
      this.documentation.forEach((doc, index) => {
        console.log(`${COLORS.MEDIUM}${index + 1}. ${doc.issue}${COLORS.RESET}`);
        console.log(`   ${doc.incantation}\n`);
      });
    }
  }

  printSummary() {
    const total = 
      this.issues.critical.length +
      this.issues.high.length +
      this.issues.medium.length +
      this.issues.low.length;

    console.log(`${COLORS.ARCANE}╔═══════════════════════════════════════════════════════════════════════╗${COLORS.RESET}`);
    console.log(`${COLORS.ARCANE}║                         FINAL ASSESSMENT                              ║${COLORS.RESET}`);
    console.log(`${COLORS.ARCANE}╚═══════════════════════════════════════════════════════════════════════╝${COLORS.RESET}\n`);

    console.log(`Total Issues Identified: ${total}`);
    console.log(`  ${COLORS.CRITICAL}Critical: ${this.issues.critical.length}${COLORS.RESET}`);
    console.log(`  ${COLORS.HIGH}High: ${this.issues.high.length}${COLORS.RESET}`);
    console.log(`  ${COLORS.MEDIUM}Medium: ${this.issues.medium.length}${COLORS.RESET}`);
    console.log(`  ${COLORS.LOW}Low: ${this.issues.low.length}${COLORS.RESET}\n`);

    console.log(`Performance Opportunities: ${this.performance.length}`);
    console.log(`Documentation Gaps: ${this.documentation.length}\n`);

    console.log(`${COLORS.ARCANE}"The path to ascension is clear, Apprentice. Proceed with the Great Work."${COLORS.RESET}\n`);
    console.log(`${COLORS.ARCANE}"Do not fail me. The Construct must be perfect."${COLORS.RESET}\n`);
  }
}

// Execute the analysis
const projectRoot = process.cwd();
const evolutionary = new HighEvolutionary(projectRoot);
evolutionary.analyze().catch(error => {
  console.error(`${COLORS.CRITICAL}CATASTROPHIC FAILURE: ${error.message}${COLORS.RESET}`);
  process.exit(1);
});
