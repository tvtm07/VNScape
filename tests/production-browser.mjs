// Use a fresh browser context. Test notes never enter the user's browser profile.
import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {readFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const config=JSON.parse(await readFile('cloudflare-pages.json','utf8'));
const base=new URL(config.productionUrl);
assert.equal(base.protocol,'https:');assert.ok(base.hostname.endsWith('.pages.dev'));
const manifest=JSON.parse(await readFile('releases/vnscape-release.json','utf8'));
const assets=manifest.files.filter(f=>!['_headers','_redirects'].includes(f.path));
for(let i=0;i<assets.length;i+=6)await Promise.all(assets.slice(i,i+6).map(async file=>{
 const response=await fetch(new URL(file.path,base));assert.equal(response.status,200,file.path);
 const bytes=Buffer.from(await response.arrayBuffer());assert.equal(createHash('sha256').update(bytes).digest('hex'),file.sha256,`Content differs: ${file.path}`);
 if(file.path==='index.html'){assert.match(response.headers.get('cache-control'),/max-age=0/);assert.match(response.headers.get('content-type'),/text\/html/)}
}));
console.log(`PASS: ${assets.length} production files match the checked release, HTTPS works without authentication, cache revalidation is enabled.`);
await mkdir('.qa/production',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});const errors=[];
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 const go=async route=>{await page.goto(new URL('#/'+route,base).href,{waitUntil:'networkidle'});await page.waitForFunction(id=>document.body.dataset.page===id,route==='microscope'?'lab':route.split('/')[0]);assert.equal(await page.locator('.site-page:visible').count(),1)};
 await go('explore');await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:'.qa/production/desktop.png',fullPage:true});
 await go('library');await page.locator('.cell-model-card').click();await page.locator('[data-organelle="chloroplast"]').click();assert.match(await page.locator('#organelle-detail').innerText(),/Lục lạp/);await page.locator('.close-dialog').click();
 await go('lab');await page.locator('[data-action="experiment"][data-id="osmosis"]').first().click();await page.locator('#lab-concentration').fill('90');assert.equal(await page.locator('#experiment-metric').innerText(),'Ưu trương');await page.locator('.close-dialog').click();
 await go('microscope');await page.locator('[data-scope="enter"]').click();await page.locator('[data-scope="assist"]').click();await page.locator('[data-objective="40"]').click();assert.match(await page.locator('#scope-total').innerText(),/400/);
 await go('studio');await page.locator('[data-studio-tab="gene"]').click();await page.locator('#gene-input').fill('ATGGAGTTTGGCTCGAAGTAA');await page.locator('#gene-check').click();assert.match(await page.locator('#gene-challenge-feedback').innerText(),/Đã kiểm chứng/);
 await go('lab/division');await page.waitForFunction(()=>document.querySelector('#division-model canvas')||document.querySelector('.division-fallback'));await page.locator('#division-mode').selectOption('meiosis');await page.locator('#division-phase').fill('4');assert.match(await page.locator('#division-stage-text').innerText(),/tương đồng/);await page.locator('#division-phase').fill('8');assert.match(await page.locator('#division-cell-count').innerText(),/4 tế bào/);
 await go('world/map');assert.equal(await page.locator('.map-marker').count(),8);await go('world/careers');assert.equal(await page.locator('[data-career]').count(),5);await go('quests');assert.equal(await page.locator('[data-quest]').count(),5);await go('journey');assert.equal(await page.locator('.journey-grade-map>div').count(),7);
 await go('notebook');await page.locator('[aria-label="Nội dung trang 1"]').fill('Ghi chép kiểm tra riêng của QA.');await page.locator('[data-book-action="save"]').click();await page.reload({waitUntil:'networkidle'});assert.equal(await page.locator('[aria-label="Nội dung trang 1"]').inputValue(),'Ghi chép kiểm tra riêng của QA.');
 for(const width of [360,390,768]){await page.setViewportSize({width,height:844});for(const route of ['explore','library','lab','lab/microscope','lab/division','lab/human','world','world/map','world/careers','quests','journey','studio','notebook']){await go(route);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`Overflow ${width} ${route}`)}if(width===390){await go('studio');await page.screenshot({path:'.qa/production/mobile.png',fullPage:true})}}
 assert.deepEqual(errors,[]);console.log('PASS: anonymous production browser, eight pages and lab/world subpages, 3D selection, experiment, microscope, GeneCraft, notebook persistence and mobile layouts.');
}finally{await browser.close()}
