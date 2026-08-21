import fs from 'fs';
import path from 'path';

const dir = 'clients/lajupage-umkm-48jam/src/portfolio';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const topbarHtml = '<div class="lamaju-demo-topbar" style="background:#141414;color:#f4f0e7;font-family:system-ui,-apple-system,sans-serif;font-size:12px;line-height:1.4;padding:8px 16px;border-bottom:1px solid rgba(255,255,255,0.15);display:flex;align-items:center;justify-content:space-between;gap:12px;position:relative;z-index:9999;"><span style="opacity:0.85;">💡 Demo Portfolio Lamaju · Brand & data fiktif</span><div style="display:flex;align-items:center;gap:12px;"><a href="index.html" style="color:#c9ff4d;text-decoration:none;font-weight:700;font-size:12px;">← Galeri Demo</a><a href="../#kontak" style="background:#c9ff4d;color:#141414;padding:4px 12px;border-radius:999px;font-weight:800;font-size:11px;text-decoration:none;text-transform:uppercase;letter-spacing:0.04em;">Pesan LP ↗</a></div></div>';

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('<div class="demo-bar">')) {
    content = content.replace(/<div class="demo-bar">[\s\S]*?<\/div><\/div>/, topbarHtml);
  } else if (content.includes('<div class="demo">')) {
    content = content.replace(/<div class="demo">[\s\S]*?<\/div>/, topbarHtml);
  } else if (content.includes('<div class="notice">')) {
    content = content.replace(/<div class="notice">[\s\S]*?<\/div>/, topbarHtml);
  } else if (content.includes('<div class="topbar">')) {
    content = content.replace(/<div class="topbar">[\s\S]*?<\/div>/, topbarHtml);
  } else if (content.includes('<div class="top">Portfolio fiktif')) {
    content = content.replace(/<div class="top">[\s\S]*?<\/div>/, topbarHtml);
  } else if (!content.includes('lamaju-demo-topbar')) {
    content = content.replace(/(<body[^>]*>)/i, '$1\n' + topbarHtml);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + f);
});
