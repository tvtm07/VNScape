import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {inspectRelease} from '../scripts/prepare-release.mjs';
async function cleanFixture(folder){const resolved=path.resolve(folder);if(path.dirname(resolved)!==path.resolve(tmpdir())||!path.basename(resolved).startsWith('vnscape-release-'))throw new Error('Refusing to remove an unexpected fixture path.');await rm(resolved,{recursive:true,force:true})}

test('release validates public assets and produces deterministic content hashes',async()=>{
 const folder=await mkdtemp(path.join(tmpdir(),'vnscape-release-'));
 try{await writeFile(path.join(folder,'index.html'),'<html lang="vi">VNScape</html>');await mkdir(path.join(folder,'assets'));await writeFile(path.join(folder,'assets','sample.svg'),'<svg/>');await writeFile(path.join(folder,'_headers'),'/*\n Cache-Control: no-cache');const files=await inspectRelease(folder);assert.equal(files.length,3);assert.ok(files.some(f=>f.path==='assets/sample.svg'));assert.equal(files.find(f=>f.path==='index.html').sha256.length,64);assert.deepEqual(await inspectRelease(folder),files)}finally{await cleanFixture(folder)}
});
test('release rejects accidentally copied secrets and development files',async()=>{
 const folder=await mkdtemp(path.join(tmpdir(),'vnscape-release-'));
 try{await writeFile(path.join(folder,'index.html'),'VNScape');await writeFile(path.join(folder,'.env'),'NOT_A_REAL_SECRET');await assert.rejects(inspectRelease(folder),/Private/);await rm(path.join(folder,'.env'));await writeFile(path.join(folder,'server.mjs'),'// not a public asset');await assert.rejects(inspectRelease(folder),/Unexpected/)}finally{await cleanFixture(folder)}
});
test('release requires a root index instead of a nested dist directory',async()=>{
 const folder=await mkdtemp(path.join(tmpdir(),'vnscape-release-'));
 try{await mkdir(path.join(folder,'dist'));await writeFile(path.join(folder,'dist','index.html'),'VNScape');await assert.rejects(inspectRelease(folder),/archive root/)}finally{await cleanFixture(folder)}
});
