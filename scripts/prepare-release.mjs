import {readdir,lstat,readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';

const project=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const publicRoot=path.join(project,'dist'),output=path.join(project,'releases');
const zipFile=path.join(output,'vnscape-pages.zip');
const allowed=new Set(['.html','.css','.js','.svg','.jpg','.jpeg','.png','.webp','.avif','.gif','.woff','.woff2','.ttf','.ico','.txt','.json','.webmanifest']);
const special=new Set(['_headers','_redirects']);

export async function inspectRelease(directory){
 const files=[];
 async function visit(folder){for(const entry of await readdir(folder,{withFileTypes:true})){
  const full=path.join(folder,entry.name),relative=path.relative(directory,full).split(path.sep).join('/'),info=await lstat(full);
  if(info.isSymbolicLink())throw new Error(`Do not publish symbolic links: ${relative}`);
  if(entry.name.startsWith('.')||/^(node_modules|releases|tests|scripts)$/i.test(entry.name))throw new Error(`Private/development path in public assets: ${relative}`);
  if(info.isDirectory()){await visit(full);continue}
  if(!info.isFile()||(!allowed.has(path.extname(entry.name).toLowerCase())&&!special.has(entry.name)))throw new Error(`Unexpected public file: ${relative}`);
  if(info.size>25*1024*1024)throw new Error(`Cloudflare Pages file exceeds 25 MiB: ${relative}`);
  const bytes=await readFile(full);files.push({path:relative,bytes:info.size,sha256:createHash('sha256').update(bytes).digest('hex')});
 }}
 await visit(directory);files.sort((a,b)=>a.path.localeCompare(b.path));
 if(!files.some(f=>f.path==='index.html'))throw new Error('dist/index.html must exist at the archive root.');
 if(files.length>1000)throw new Error('Dashboard Direct Upload accepts at most 1,000 files. Use Wrangler for larger releases.');
 return files;
}

async function main(){
 const files=await inspectRelease(publicRoot);
 const testFiles=(await readdir(path.join(project,'tests'))).filter(f=>f.endsWith('.test.mjs')).sort().map(f=>'tests/'+f);
 for(const args of [['scripts/check.mjs'],['--test',...testFiles]]){
  const result=spawnSync(process.execPath,args,{cwd:project,stdio:'inherit',windowsHide:true});
  if(result.error)throw result.error;if(result.status!==0)throw new Error(`Release check failed: ${args[0]}`);
 }
 await mkdir(output,{recursive:true});
 if(process.platform!=='win32')throw new Error('This release command uses Windows Compress-Archive. Upload the dist folder directly on other operating systems.');
 const command="$ErrorActionPreference='Stop'; Compress-Archive -Path (Join-Path $env:VNS_RELEASE_SOURCE '*') -DestinationPath $env:VNS_RELEASE_ARCHIVE -CompressionLevel Optimal -Force";
 const result=spawnSync('powershell.exe',['-NoProfile','-NonInteractive','-EncodedCommand',Buffer.from(command,'utf16le').toString('base64')],{cwd:project,env:{...process.env,VNS_RELEASE_SOURCE:publicRoot,VNS_RELEASE_ARCHIVE:zipFile},encoding:'utf8',windowsHide:true});
 if(result.error)throw result.error;if(result.status!==0)throw new Error(result.stderr||'Could not create ZIP.');
 const zip=await readFile(zipFile);
 const manifest={createdAt:new Date().toISOString(),archive:'vnscape-pages.zip',archiveBytes:zip.length,archiveSha256:createHash('sha256').update(zip).digest('hex'),fileCount:files.length,files};
 await writeFile(path.join(output,'vnscape-release.json'),JSON.stringify(manifest,null,2)+'\n');
 console.log(`\nREADY: ${zipFile}\n${files.length} public files · ${(zip.length/1024/1024).toFixed(2)} MiB ZIP\nUpload this ZIP to your existing Cloudflare Pages project to keep the same website address.\nPrivate source, local notes, .share, .tools and credentials are excluded.`);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(error=>{console.error(error.message);process.exitCode=1});
