import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
await mkdir('.qa',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const errors=[];
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.waitForSelector('#hero-model canvas');
 assert.equal(await page.locator('#atmosphere-toggle').getAttribute('aria-pressed'),'false','reduced motion should start paused');
 await page.screenshot({path:'.qa/exhibition-desktop.png',fullPage:true});await page.screenshot({path:'.qa/exhibition-hero.png'});
 await page.locator('[data-specimen-type="dna"]').click();await page.waitForSelector('#hero-model canvas');assert.equal(await page.locator('#hero-open-model').getAttribute('data-model'),'dna');assert.match(await page.locator('#hero-specimen-title').innerText(),/Hai mạch/);
 await page.screenshot({path:'.qa/exhibition-hero-dna.png'});await page.locator('#hero-open-model').click();await page.waitForSelector('#model-canvas canvas');assert.match(await page.locator('#dialog-title').innerText(),/Mật mã/);await page.locator('.close-dialog').click();
 await page.locator('[data-specimen-type="cell"]').click();await page.waitForSelector('#hero-model canvas');await page.locator('#hero-open-model').click();await page.waitForSelector('#model-canvas canvas');
 await page.locator('[data-action="model-light"]').click();assert.equal(await page.locator('#app-dialog').evaluate(e=>e.classList.contains('is-lit')),true);await page.locator('[data-action="model-shell"]').click();assert.equal(await page.locator('[data-action="model-shell"]').getAttribute('aria-pressed'),'false');await page.locator('[data-action="model-shell"]').click();
 await page.locator('[data-organelle="chloroplast"]').click();await page.screenshot({path:'.qa/exhibition-model-lit.png'});await page.locator('[data-action="model-light"]').click();await page.screenshot({path:'.qa/exhibition-model.png'});
 const canvas=page.locator('#model-canvas canvas');await canvas.focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('+');await page.locator('.close-dialog').click();
 await page.locator('[data-realm="12"]').click();assert.equal(await page.locator('[data-grade="12"]').getAttribute('aria-selected'),'true');await page.getByRole('tab',{name:/Lớp 10/}).click();
 for(const width of [360,390,768,1024]){
  await page.setViewportSize({width,height:844});await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});await page.waitForSelector('#hero-model canvas');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`page overflow ${width}`);await page.screenshot({path:`.qa/exhibition-${width}.png`,fullPage:width===390});
  await page.locator('#hero-open-model').click();await page.waitForSelector('#model-canvas canvas');assert.equal(await page.locator('#app-dialog').evaluate(e=>e.scrollWidth>e.clientWidth+1),false,`modal overflow ${width}`);if(width===390)await page.screenshot({path:'.qa/exhibition-model-mobile.png'});await page.locator('.close-dialog').click();
 }
 // Normal motion starts enabled and can be frozen independently of OS preferences.
 const liveContext=await browser.newContext({viewport:{width:1280,height:900}});const live=await liveContext.newPage();live.on('pageerror',e=>errors.push(e.message));await live.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});assert.equal(await live.locator('#atmosphere-toggle').getAttribute('aria-pressed'),'true');await live.locator('#atmosphere-toggle').click();assert.equal(await live.locator('#atmosphere-toggle').getAttribute('aria-pressed'),'false');await live.locator('#atmosphere-toggle').click();assert.equal(await live.locator('#atmosphere-toggle').getAttribute('aria-pressed'),'true');await liveContext.close();
 assert.deepEqual(errors,[]);console.log('PASS: deep exhibition at 360/390/768/1024/1440px, specimen switching, observation light, cell wall control, keyboard, grade portals and motion preferences.');
}catch(e){for(const p of browser.contexts().flatMap(c=>c.pages()))await p.screenshot({path:'.qa/exhibition-failure.png'}).catch(()=>{});throw e}finally{await browser.close()}
