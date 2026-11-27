// Construye el sitio y deja un zip de dist/ para Cloudflare Pages
// (Workers & Pages → Create → Pages → Upload assets → arrastrar el zip).
// Uso: npm run zip:cloudflare
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const stamp = new Date().toISOString().slice(0, 10);
const out = `../entregas/superior-striping-cloudflare-${stamp}.zip`;
if (!existsSync('../entregas')) mkdirSync('../entregas');
execSync('npm run build', { stdio: 'inherit' });

// Cloudflare Pages rechaza archivos de más de 25 MiB
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const big = walk('dist').filter((f) => statSync(f).size > 25 * 1024 * 1024);
if (big.length) throw new Error(`Archivos de más de 25 MiB: ${big.join(', ')}`);

execSync(`cd dist && rm -f "../${out}" && zip -qr "../${out}" . -x "*.DS_Store"`, { stdio: 'inherit' });
console.log(`Listo: ${out.replace('../', '')}`);
