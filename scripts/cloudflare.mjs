import {readFile,access} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const cli=path.join(root,'.tools/deploy/node_modules/wrangler/bin/wrangler.js');
const action=process.argv[2];
function run(args,env=process.env){const result=spawnSync(process.execPath,args,{cwd:root,stdio:'inherit',windowsHide:true,env});if(result.error)throw result.error;if(result.status!==0)process.exit(result.status||1)}

try{
 if(!['login','status','preview','production'].includes(action))throw new Error('Use login, status, preview or production.');
 await access(cli).catch(()=>{throw new Error('Install the deployment tool first: npm.cmd install --prefix .tools/deploy --no-audit --no-fund wrangler@4.157.0')});
 if(action==='login')run([cli,'login','--device','--browser=false','--use-keyring','--scopes','account:read','user:read','pages:write']);
 else if(action==='status')run([cli,'whoami']);
 else{
  const config=await readFile(path.join(root,'cloudflare-pages.json'),'utf8').then(JSON.parse).catch(()=>{throw new Error('Cloudflare Pages has not been configured for this checkout. See PUBLISH.md; do not invent a project ID or production URL.')});
  if(!/^[a-z0-9][a-z0-9-]{0,57}[a-z0-9]$/.test(config.projectName)||!/^[a-f0-9]{32}$/.test(config.accountId)||typeof config.productionBranch!=='string'||!config.productionBranch||config.productionBranch==='preview')throw new Error('Invalid cloudflare-pages.json configuration.');
  run([path.join(root,'scripts/prepare-release.mjs')]);
  const branch=action==='production'?config.productionBranch:'preview';
  console.log(action==='production'?`Publishing the checked release to the existing ${config.projectName} production site.`:'Publishing a preview. The website address submitted to the judges keeps its current production version.');
  run([cli,'pages','deploy','dist',`--project-name=${config.projectName}`,`--branch=${branch}`,'--commit-dirty=true'],{...process.env,CLOUDFLARE_ACCOUNT_ID:config.accountId});
 }
}catch(error){console.error(error.message);process.exitCode=1}
