const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const syncFs = require('node:fs');
const { createRequire } = require('node:module');
// Run from the repository root. Browser tooling stays outside production dependencies.
function loadPlaywright(root) {
  if (process.env.SOCIAL_PLAYWRIGHT_MODULE) return require(process.env.SOCIAL_PLAYWRIGHT_MODULE);
  try { return createRequire(path.join(root, 'package.json'))('playwright'); } catch {}
  return require(path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'));
}
async function browserExecutable(chromium) {
  if (process.env.SOCIAL_CHROMIUM_EXECUTABLE) return process.env.SOCIAL_CHROMIUM_EXECUTABLE;
  if (syncFs.existsSync(chromium.executablePath())) return chromium.executablePath();
  const cache = path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), 'AppData/Local'), 'ms-playwright');
  const versions = (await fs.readdir(cache)).filter(name => /^chromium_headless_shell-\d+$/.test(name)).sort((a,b) => Number(b.split('-').pop()) - Number(a.split('-').pop()));
  for (const version of versions) {
    const executable = path.join(cache, version, 'chrome-headless-shell-win64/chrome-headless-shell.exe');
    if (syncFs.existsSync(executable)) return executable;
  }
  throw new Error('Set SOCIAL_CHROMIUM_EXECUTABLE to an installed Chromium headless executable.');
}
const cards = [
  { file: 'pmo-y-gobierno-de-proyectos-es', lang: 'es', title: 'PMO y Gobierno<br>de Proyectos', promise: 'Prioridades y decisiones claras.', stops: ['El reto','PMO','Project Governance','Portfolio Governance','Program Governance','Método','Resultados'] },
  { file: 'pmo-project-governance-en', lang: 'en', title: 'PMO &amp; Project<br>Governance', promise: 'Clear priorities and decisions.', stops: ['The challenge','PMO','Project Governance','Portfolio Governance','Program Governance','Method','Results'] },
  { file: 'direccion-estrategica-de-proyectos-es', lang: 'es', title: 'Dirección<br>Estratégica<br>de Proyectos', promise: 'Del objetivo a las entregas.', stops: ['El reto','Project Management','Program Management','Portfolio Management','Método','Resultados'] },
  { file: 'strategic-project-delivery-en', lang: 'en', title: 'Strategic Project<br>Delivery', promise: 'From goals to deliverables.', stops: ['The challenge','Project Management','Program Management','Portfolio Management','Method','Results'] },
];

async function main() {
  const root = process.cwd();
  const { chromium } = loadPlaywright(root);
  const executablePath = await browserExecutable(chromium);
  const previewDir = process.env.SOCIAL_PREVIEW_DIR || path.join(os.tmpdir(), 'agsit-social-previews');
  await fs.mkdir(previewDir, { recursive: true });
  const requested = process.argv.slice(2);
  const selectedCards = requested.length ? cards.filter(card => requested.includes(card.file)) : cards;
  if (requested.some(file => !cards.some(card => card.file === file))) throw new Error('Unknown social image name');
  const sharp = createRequire(path.join(root, 'package.json'))('sharp');
  const data = async (file, mime) => `data:${mime};base64,${(await fs.readFile(path.join(root, file))).toString('base64')}`;
  const logo = await data('public/assets/logo-asit.webp', 'image/webp');
  const displayFont = await data('public/fonts/cormorant-garamond-normal-latin.woff2', 'font/woff2');
  const bodyFont = await data('public/fonts/inter-normal-latin.woff2', 'font/woff2');
  for (const card of selectedCards) {
  const isEnglish = card.lang === 'en';
  const html = `<!doctype html><html lang="${isEnglish ? 'en' : 'es-MX'}"><head><meta charset="utf-8"><style>
    @font-face{font-family:Cormorant;src:url('${displayFont}') format('woff2');font-weight:300 600;font-display:block}
    @font-face{font-family:Inter;src:url('${bodyFont}') format('woff2');font-weight:300 800;font-display:block}
    *{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden}
    body{font-family:Inter,sans-serif;background:#020712;color:#f6fafe}
    header{height:76px;background:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 60px;border-bottom:1px solid rgba(8,21,43,.08)}
    header img{width:204px;height:auto;display:block}
    .header-nav{display:flex;align-items:center;gap:28.8px;color:#08152b;font-size:11.68px;font-weight:600;letter-spacing:1.168px}
    .header-nav span{opacity:.95}
    .header-nav .language{display:flex;align-items:center;justify-content:center;width:44px;height:36px;border:1px solid rgba(37,63,108,.18);border-radius:999px;letter-spacing:0}
    main{height:554px;display:grid;grid-template-columns:560px 480px;gap:64px;align-items:center;padding:0 48px;background:radial-gradient(ellipse at 73% 0%,#0d2c3b 0%,#061321 38%,#020712 78%)}
    .copy{text-align:left}
    .eyebrow{margin:0 0 18px;color:#8be2ff;font-size:12px;font-weight:800;letter-spacing:1.8px;line-height:1.4}
    h1{margin:0;font-family:Cormorant,Georgia,serif;font-size:76px;font-weight:300;line-height:.98;letter-spacing:0}
    .promise{margin:18px 0 0;color:rgba(180,197,219,.88);font-size:26px;line-height:1.4;font-weight:500}
    .cta{display:flex;align-items:center;justify-content:center;margin-top:24px;width:${isEnglish ? 210 : 246}px;height:48px;border-radius:999px;background:#41c8f6;color:#08152b;font-size:11px;font-weight:800;letter-spacing:.8px}
    .route-card{justify-self:center;width:400px;padding:30px 32px;border:1px solid rgba(242,248,255,.16);background:#020712}
    .route-card ol{position:relative;display:grid;gap:6px;margin:0;padding:0;list-style:none}
    .route-card ol::before{position:absolute;top:20px;bottom:20px;left:6px;width:1px;background:rgba(242,248,255,.16);content:''}
    .route-card li{position:relative;display:grid;grid-template-columns:14px minmax(0,1fr);gap:16px;align-items:center;min-height:40px;color:rgba(180,197,219,.88);font-size:18px;line-height:1.3;font-weight:700}
    .node{display:block;width:12px;height:12px;border:1px solid #8be2ff;border-radius:50%;background:#020712}
    .route-card li.active{color:#fff}
    .route-card li.active .node{transform:scale(1.25);border-color:#fff;background:#41c8f6}
  </style></head><body><header><img src="${logo}" alt="AGSIT"><nav class="header-nav"><span>${isEnglish ? 'HOME' : 'INICIO'}</span><span>${isEnglish ? 'SERVICES' : 'SERVICIOS'}</span><span>${isEnglish ? 'CONTACT' : 'CONTACTO'}</span><span class="language">${isEnglish ? 'ES' : 'EN'}</span></nav></header><main>
    <div class="copy">
    <p class="eyebrow">${isEnglish ? 'PROJECT MANAGEMENT' : 'DIRECCIÓN DE PROYECTOS'}</p>
    <h1>${card.title}</h1>
    <p class="promise">${card.promise}</p>
    <div class="cta">${isEnglish ? 'TALK TO A SPECIALIST' : 'HABLAR CON UN ESPECIALISTA'}</div>
    </div>
    <nav class="route-card" aria-label="${isEnglish ? 'Page sections' : 'Paradas de la página'}"><ol>
      ${card.stops.map((stop,index) => `<li${index === 0 ? ' class="active" aria-current="step"' : ''}><span class="node"></span><span>${stop}</span></li>`).join('')}
    </ol></nav>
  </main></body></html>`;
  await fs.writeFile(path.join(previewDir, card.file + '.html'), html);
  const browser = await chromium.launch({ headless: true, executablePath });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const layout = await page.evaluate(() => ({
      fonts: { display: document.fonts.check('300 76px Cormorant'), body: document.fonts.check('500 26px Inter') },
      elements: [...document.querySelectorAll('h1,.promise,.cta,.route-card,.route-card li')].map(el => ({ text: el.innerText, rect: el.getBoundingClientRect().toJSON() })),
      horizontalOverflow: document.documentElement.scrollWidth > 1200,
      verticalOverflow: document.documentElement.scrollHeight > 630,
    }));
    const png = await page.screenshot({ type: 'png' });
    await fs.writeFile(path.join(previewDir, card.file + '-proof.png'), png);
    let selected;
    const sizes = [];
    for (let quality = 100; quality >= 75; quality--) {
      const buffer = await sharp(png).jpeg({ quality, chromaSubsampling: '4:4:4' }).toBuffer();
      sizes.push({ quality, bytes: buffer.length });
      if (buffer.length >= 60000 && buffer.length <= 100000) { selected = { quality, buffer }; break; }
    }
    if (!selected) throw new Error(`No JPEG quality meets the agreed 60–100 kB range: ${JSON.stringify(sizes)}`);
    const output = path.join(root, 'public/assets/social/' + card.file + '.jpg');
    await fs.writeFile(output, selected.buffer);
    await sharp(selected.buffer).resize(400, 210, { kernel: 'lanczos3' }).png().toFile(path.join(previewDir, card.file + '-400x210.png'));
    const metadata = await sharp(selected.buffer).metadata();
    const report = { output, width: metadata.width, height: metadata.height, bytes: selected.buffer.length, quality: selected.quality, chromaSubsampling: '4:4:4', layout };
    await fs.writeFile(path.join(previewDir, card.file + '-generation.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify({ file: card.file, width: metadata.width, height: metadata.height, bytes: selected.buffer.length, quality: selected.quality, fonts: layout.fonts, horizontalOverflow: layout.horizontalOverflow, verticalOverflow: layout.verticalOverflow }));
  } finally { await browser.close(); }
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
