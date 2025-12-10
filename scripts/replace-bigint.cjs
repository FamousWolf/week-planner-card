#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function walk(dir) {
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const p = path.join(dir, entry);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) walk(p);
    else if (p.endsWith('.js')) {
      let s = fs.readFileSync(p, 'utf8');
      const re = /\b(\d+)n\b/g;
      if (re.test(s)) {
        s = s.replace(re, (m, n) => `(typeof BigInt!=='undefined'?BigInt('${n}'):Number('${n}'))`);
        fs.writeFileSync(p, s, 'utf8');
        console.log('patched', p);
      }
    }
  }
}

if (!fs.existsSync('dist')) {
  console.error('dist directory not found, nothing to patch');
  process.exit(0);
}

walk('dist');
console.log('replace-bigint completed');
