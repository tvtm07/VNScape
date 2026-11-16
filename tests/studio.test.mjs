import test from 'node:test';
import assert from 'node:assert/strict';
import {geneticCode,analyzeDNA,compareDNA,teachingDNA,geneChallenges,matchesGeneChallenge,scaleStops,scalePosition,scaleAt,studioMilestones} from '../dist/studio-science.js';
import {initialImmuneState,chooseImmuneUnit,advanceImmuneState,immuneMissions} from '../dist/studio-data.js';
import {cleanState,xpFor} from '../dist/learning.js';

test('NCBI standard code covers 64 triplets, all stop codons and synonymous families',()=>{
 assert.equal(Object.keys(geneticCode).length,64);assert.equal(geneticCode.ATG,'M');assert.equal(geneticCode.TGG,'W');assert.deepEqual(Object.keys(geneticCode).filter(k=>geneticCode[k]==='*').sort(),['TAA','TAG','TGA']);
 for(const codon of ['TTA','TTG','CTT','CTC','CTA','CTG'])assert.equal(geneticCode[codon],'L');for(const codon of ['GGT','GGC','GGA','GGG'])assert.equal(geneticCode[codon],'G');
});
test('DNA coding/template/RNA polarity and translation are consistent',()=>{
 const r=analyzeDNA(' atg gaa ttt ggc tcg aag taa ');assert.equal(r.valid,true);assert.equal(r.dna,teachingDNA);assert.equal(r.template,'TACCTTAAACCGAGCTTCATT');assert.equal(r.mrna,'AUGGAAUUUGGCUCGAAGUAA');assert.equal(r.protein.join(''),'MEFGSK');assert.equal(r.stopIndex,6);assert.equal(r.terminated,true);
});
test('translation terminates at first STOP, ignores downstream codons and incomplete triplets',()=>{
 const r=analyzeDNA('ATGTAAGAAAC');assert.equal(r.protein.join(''),'M');assert.equal(r.codons[2].afterStop,true);assert.equal(r.partial,2);assert.equal(r.codons[3].aa,null);assert.equal(analyzeDNA('ATGGAA').terminated,false);assert.deepEqual(analyzeDNA('GTGGAATAA').protein,[]);
});
test('invalid or overlong sequences remain invalid, without silently stripping punctuation',()=>{
 for(const s of ['','ATG-X','ATG123','A'.repeat(91),'<img>','ATGUAA'])assert.equal(analyzeDNA(s).valid,false,s);assert.equal(analyzeDNA('A'.repeat(90)).valid,true);
});
test('mutations are classified against translated sequence rather than length alone',()=>{
 const examples={silent:'ATGGAGTTTGGCTCGAAGTAA',missense:'ATGGCATTTGGCTCGAAGTAA',stop:'ATGGAATAAGGCTCGAAGTAA',frame:'ATGGAATTGGCTCGAAGTAA','start-loss':'ACGGAATTTGGCTCGAAGTAA','in-frame':'ATGGAAAAATTTGGCTCGAAGTAA'};
 for(const [type,dna] of Object.entries(examples))assert.equal(compareDNA(teachingDNA,dna).type,type);assert.equal(compareDNA(teachingDNA,teachingDNA).type,'same');
});
test('gene challenges require the requested edit, not an arbitrary mutation of the same class',()=>{
 for(const c of geneChallenges){assert.equal(matchesGeneChallenge(c.id,c.preset),true,c.id);assert.equal(matchesGeneChallenge(c.id,teachingDNA),false);assert.equal(matchesGeneChallenge(c.id,'not DNA'),false)}
 assert.equal(matchesGeneChallenge('silent','ATGGAATTTGGCTCGAAGTAG'),false);assert.equal(matchesGeneChallenge('missense','ATGGAATTAGGCTCGAAGTAA'),false);assert.equal(matchesGeneChallenge('frame','TGGAATTTGGCTCGAAGTAA'),false);
});
test('scale navigation is logarithmic, ordered, reversible at anchors and clamped',()=>{
 assert.equal(scalePosition(0),0);assert.equal(scalePosition(6),1000);for(let i=0;i<7;i++){assert.equal(scaleAt(scalePosition(i)).index,i);assert.ok(Math.abs(scaleAt(scalePosition(i)).size/scaleStops[i].size-1)<1e-12);if(i)assert.ok(scalePosition(i)>scalePosition(i-1))}assert.equal(scaleAt(-100).index,0);assert.equal(scaleAt(2000).index,6);
});
test('immune missions do not advance on wrong answers or unconfirmed steps',()=>{
 let s=initialImmuneState();assert.equal(advanceImmuneState(s),s);assert.equal(chooseImmuneUnit(s,'nonexistent'),s);const wrong=chooseImmuneUnit(s,'plasma');assert.equal(wrong.step,0);assert.equal(wrong.errors,1);assert.equal(wrong.confirmed,false);assert.equal(s.errors,0);s=chooseImmuneUnit(wrong,'macrophage');assert.equal(s.confirmed,true);assert.equal(chooseImmuneUnit(s,'plasma'),s);assert.equal(advanceImmuneState(s).step,1);
});
test('both immune paths finish once and virus targets an infected host cell with cytotoxic T',()=>{
 for(const mission of ['bacteria','virus']){let s=initialImmuneState(mission);for(const step of immuneMissions[mission].steps)s=advanceImmuneState(chooseImmuneUnit(s,step.correct));assert.equal(s.finished,true);assert.equal(s.step,immuneMissions[mission].steps.length);assert.equal(advanceImmuneState(s),s);assert.equal(chooseImmuneUnit(s,'memory'),s)}assert.equal(immuneMissions.virus.steps[1].correct,'cytotoxic');
});
test('studio progress migrates old data, rejects forged identifiers and awards each milestone once',()=>{
 const old=cleanState({name:'Mai',completed:['cell'],notes:[{id:'old',title:'Một ghi chép',body:'Giữ nguyên nội dung'}]});assert.deepEqual(old.completedStudio,[]);assert.equal(old.notes[0].body,'Giữ nguyên nội dung');const next=cleanState({...old,completedStudio:['scale','scale','forged','gene-silent',null]});assert.deepEqual(next.completedStudio,['scale','gene-silent']);assert.equal(xpFor(next)-xpFor(old),30);assert.equal(xpFor({...old,completedStudio:['scale','scale','forged']})-xpFor(old),15);assert.equal(studioMilestones.length,14);
});
