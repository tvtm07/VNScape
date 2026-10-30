export const MAX_NOTEBOOK_PAGES=100;
export function assignPageNumbers(notes){
 const used=new Set(),unassigned=[];
 for(const note of [...notes].reverse()){if(Number.isInteger(note.pageNumber)&&note.pageNumber>0&&note.pageNumber<=MAX_NOTEBOOK_PAGES&&!used.has(note.pageNumber))used.add(note.pageNumber);else unassigned.push(note)}
 let next=1;for(const note of unassigned){while(used.has(next))next++;note.pageNumber=next;used.add(next)}return notes;
}
export function journalPageCount(notes){const count=Math.max(5,...notes.map(n=>(n.pageNumber||0)+1));return Math.min(MAX_NOTEBOOK_PAGES,count%2?count:count+1)}
export function journalSpread(page,single=false){const index=Math.max(1,Math.min(MAX_NOTEBOOK_PAGES,Number(page)||1));return single?[index]:[Math.floor(index/2)*2,Math.floor(index/2)*2+1]}
