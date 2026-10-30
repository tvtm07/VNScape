import {chromium} from 'playwright';
import {mkdir} from 'node:fs/promises';import assert from 'node:assert/strict';
await mkdir('.qa',{recursive:true});const errors=[];const failures=[];
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});const page=await context.newPage();
 page.on('pageerror',e=>errors.push(e.message));page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text())});
 await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle',timeout:60000});await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.title(),'VNScape — Chạm vào thế giới sống');
 await page.screenshot({path:'.qa/desktop.png',fullPage:true});
 assert.equal(await page.locator('#hero-model canvas').count(),1,'hero should render a 3D model');
 for(const g of [11,12,10]){await page.locator(`[data-grade="${g}"]`).click();assert.equal(await page.locator('.topic-card').count(),3)}
 await page.locator('.topic-card.featured [data-action="lesson"]').click();
 await page.locator('[data-answer="0"]').click();assert.match(await page.locator('#quiz-feedback').innerText(),/Chưa đúng/);
 await page.locator('[data-answer="1"]').click();await page.locator('#complete-lesson').click();
 assert.match(await page.locator('.path-list').innerText(),/Đã hoàn thành/);await page.locator('.close-dialog').click();
 assert.match(await page.locator('#progress-label').innerText(),/1 \/ 6/);
 await page.locator('.topic-card.featured [data-action="bookmark"]').click();
 await page.locator('.hero-specimen [data-action="model"]').click();await page.waitForSelector('#model-canvas canvas');
 await page.locator('[data-organelle="chloroplast"]').click();assert.match(await page.locator('#organelle-detail h3').innerText(),/Lục lạp/);
 await page.screenshot({path:'.qa/cell-model.png'});await page.locator('[data-action="zoom-in"]').click();await page.locator('[data-action="model-reset"]').click();await page.locator('.close-dialog').click();
 await page.locator('.lab-copy [data-action="lab"]').click();
 await page.locator('#light-range').fill('0');await page.locator('#co2-range').fill('100');assert.equal(await page.locator('#lab-rate').innerText(),'0%');await page.locator('[data-action="record-trial"]').click();
 await page.locator('#light-range').fill('100');assert.equal(await page.locator('#lab-rate').innerText(),'100%');await page.locator('[data-action="record-trial"]').click();assert.equal(await page.locator('#trial-results tbody tr').count(),2);
 await page.locator('[data-action="save-lab-note"]').click();assert.equal(await page.locator('.note-item').count(),1);
 await page.locator('[data-action="new-note"]').click();await page.locator('#note-title').fill('Quan sát <b>an toàn</b>');await page.locator('#note-body').fill('Một phát hiện của mình.');await page.locator('#note-form [type="submit"]').click();assert.equal(await page.locator('.note-item').count(),2);assert.equal(await page.locator('.note-item h3 b').count(),0);
 await page.locator('.note-item').first().locator('[data-action="edit-note"]').click();await page.locator('#note-body').fill('Đã sửa ghi chép.');await page.locator('#note-form [type="submit"]').click();assert.match(await page.locator('.note-item').first().innerText(),/Đã sửa/);
 await page.locator('.note-item').first().locator('[data-action="delete-note"]').click();await page.locator('.note-item').first().locator('[data-action="delete-note"]').click();assert.equal(await page.locator('.note-item').count(),1);
 const downloadPromise=page.waitForEvent('download');await page.locator('[data-action="export-notes"]').click();assert.match((await downloadPromise).suggestedFilename(),/so-tay/);
 await page.locator('.close-dialog').click();await page.reload({waitUntil:'networkidle'});assert.match(await page.locator('#progress-label').innerText(),/1 \/ 6/);
 await page.locator('[data-action="search"]').click();await page.locator('#lesson-search').fill('te bao');assert.ok(await page.locator('.search-result').count()>=1);await page.locator('#lesson-search').fill('ADN');assert.ok(await page.locator('.search-result').count()>=1);await page.locator('.close-dialog').click();
 await page.locator('.dna-model-card').click();await page.waitForSelector('#model-canvas canvas');await page.screenshot({path:'.qa/dna-model.png'});await page.locator('.close-dialog').click();
 await page.locator('[data-action="teacher"]').click();const csvPromise=page.waitForEvent('download');await page.locator('[data-action="export-report"]').click();assert.match((await csvPromise).suggestedFilename(),/tien-do/);await page.locator('.close-dialog').click();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'desktop overflow');
 // Independently check the narrowest common viewport and a wider phone.
 for(const width of [360,390,768]){await page.setViewportSize({width,height:844});await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`overflow at ${width}`);await page.screenshot({path:`.qa/mobile-${width}.png`,fullPage:true});}
 await page.setViewportSize({width:390,height:844});await page.locator('.mobile-menu-toggle').click();assert.equal(await page.locator('.mobile-nav').isVisible(),true);await page.locator('.mobile-nav [data-action="notebook"]').click();assert.equal(await page.locator('.note-item').count(),1);await page.locator('.close-dialog').click();
 await page.locator('.hero-specimen [data-action="model"]').click();await page.waitForSelector('#model-canvas canvas');await page.screenshot({path:'.qa/mobile-model.png'});assert.equal(await page.locator('#app-dialog').evaluate(el=>el.scrollWidth>el.clientWidth+1),false,'mobile modal overflow');await page.locator('.close-dialog').click();
 // Simulate devices with no WebGL and ensure educational alternatives remain usable.
 const fallbackContext=await browser.newContext({viewport:{width:390,height:844}});await fallbackContext.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl'||type==='webgl2'||type==='experimental-webgl')return null;return original.call(this,type,...args)}});
 const fallbackPage=await fallbackContext.newPage();await fallbackPage.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});await fallbackPage.locator('.hero-specimen [data-action="model"]').click();await fallbackPage.waitForSelector('.fallback-schematic');await fallbackPage.locator('.organelle-list [data-organelle="vacuole"]').click();assert.match(await fallbackPage.locator('#organelle-detail h3').innerText(),/Không bào/);await fallbackContext.close();
 const appErrors=errors.filter(x=>!x.includes('favicon')&&!x.includes('ERR_CERT')&&!x.includes('ERR_CONNECTION'));
 if(appErrors.length)failures.push(...appErrors);assert.deepEqual(failures,[],'browser errors');console.log('PASS: desktop, 360/390/768px layouts, quizzes, 3D models, lab, notes CRUD, downloads, search, persistence and no-WebGL fallback.');
}catch(error){for(const p of browser.contexts().flatMap(c=>c.pages())){await p.screenshot({path:'.qa/failure.png'}).catch(()=>{});console.log('Page at failure:',await p.locator('#app-dialog').evaluate(el=>({rect:el.getBoundingClientRect().toJSON(),scrollHeight:el.scrollHeight,clientHeight:el.clientHeight})).catch(()=>null))}throw error}finally{await browser.close()}
