// UUIDs for browser-local records, including HTTP previews over a home LAN.
export function recordId(cryptoAPI=globalThis.crypto){
 if(typeof cryptoAPI.randomUUID==='function')return cryptoAPI.randomUUID();
 const bytes=cryptoAPI.getRandomValues(new Uint8Array(16));
 bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;
 const hex=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
 return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}
