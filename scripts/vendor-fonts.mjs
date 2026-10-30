import {writeFile,mkdir} from 'node:fs/promises';
const response=await fetch('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;450;500;550;600;650;700;750;800&family=Lora:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap',{headers:{'User-Agent':'Mozilla/5.0 Chrome/131.0.0.0 Safari/537.36'}});
if(!response.ok)throw new Error('Cannot download fonts');let css=await response.text();
await mkdir('dist/assets/fonts',{recursive:true});const urls=[...new Set(css.match(/https:\/\/fonts\.gstatic\.com\/[^)\s]+/g))];
for(let i=0;i<urls.length;i++){const r=await fetch(urls[i]);if(!r.ok)throw new Error('Cannot download font file');const ext=urls[i].includes('.woff2')?'woff2':'woff';const file=`font-${i}.${ext}`;await writeFile(`dist/assets/fonts/${file}`,Buffer.from(await r.arrayBuffer()));css=css.split(urls[i]).join(file)}
await writeFile('dist/assets/fonts/fonts.css',css);console.log(`Vendored ${urls.length} font files.`);
const license=await fetch('https://cdn.jsdelivr.net/npm/three@0.160.1/LICENSE');if(license.ok)await writeFile('dist/assets/THREE-LICENSE.txt',await license.text());
for(const [name,url] of [['BeVietnamPro','https://raw.githubusercontent.com/google/fonts/main/ofl/bevietnampro/OFL.txt'],['Lora','https://raw.githubusercontent.com/google/fonts/main/ofl/lora/OFL.txt']]){const r=await fetch(url);if(r.ok)await writeFile(`dist/assets/fonts/${name}-OFL.txt`,await r.text())}
