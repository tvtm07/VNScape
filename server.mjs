import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {networkInterfaces} from 'node:os';
const root=path.resolve('dist');const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.woff':'font/ttf','.woff2':'font/woff2'};
const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');const file=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}const s=await stat(file);if(!s.isFile())throw new Error('Not a file');const body=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(body)}catch{res.writeHead(404);res.end('Not found')}});
const lan=process.argv.includes('--lan');
server.on('error',error=>{if(error.code==='EADDRINUSE')console.error('Cổng 4173 đang được dùng. Nhấn Ctrl+C ở terminal chạy VNScape cũ, rồi chạy lại lệnh.');else console.error(error.message);process.exitCode=1});
server.listen(4173,lan?'0.0.0.0':'127.0.0.1',()=>{
 console.log('VNScape trên máy tính: http://127.0.0.1:4173');
 if(lan){const addresses=[...new Set(Object.values(networkInterfaces()).flat().filter(a=>a&&(a.family==='IPv4'||a.family===4)&&!a.internal&&!a.address.startsWith('169.254.')).map(a=>a.address))];for(const address of addresses)console.log(`Điện thoại cùng Wi-Fi: http://${address}:4173`);console.log('Giữ terminal này chạy. Nhấn Ctrl+C để dừng chia sẻ.')}else console.log('Muốn xem trên điện thoại cùng Wi-Fi: npm.cmd run start:lan');
});
