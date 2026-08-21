import fs from 'fs';
import path from 'path';

const dir = 'clients/lajupage-umkm-48jam/src/portfolio';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');
let errors = 0;
let totalImages = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const imgMatches = [...content.matchAll(/(?:src|data-img)=["'](\.\.\/assets\/portfolio\/images\/[^"']+)["']/g)];
  for (const m of imgMatches) {
    totalImages++;
    const relPath = m[1];
    const fullPath = path.resolve(dir, relPath);
    if (!fs.existsSync(fullPath)) {
      console.error(`MISSING ASSET in ${file}: ${relPath} -> ${fullPath}`);
      errors++;
    }
  }
  console.log(`${file}: ${imgMatches.length} images checked.`);
}

console.log(`\nTotal images checked: ${totalImages}`);
if (errors === 0) {
  console.log('✓ ALL PORTFOLIO IMAGE REFERENCES RESOLVED CORRECTLY!');
} else {
  console.error(`✗ Found ${errors} missing images.`);
  process.exit(1);
}
