// Decorative depth is separate from the scientific model and its measurements.
export function initExhibition({openModel,selectOrganelle,icon,onRealm}){
 const hero=document.querySelector('.hero'),container=document.querySelector('#hero-model');
 const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
 let moving=!motionPreference.matches,model=null,type='cell',serial=0;
 const data={cell:{title:'Một tế bào. Vạn điều kỳ diệu.',kicker:'THẾ GIỚI Ở THANG HIỂN VI',labels:['Lục lạp','Nhân tế bào'],index:'01 / 02',aria:'Mô hình cắt lớp tế bào thực vật tương tác'},dna:{title:'Hai mạch xoắn. Một mã sự sống.',kicker:'ĐI SÂU VÀO THÔNG TIN DI TRUYỀN',labels:['Cặp base bổ sung','Khung đường–phosphate'],index:'02 / 02',aria:'Mô hình ADN xoắn kép tương tác'}};
 const pollen=createAtmosphere(document.querySelector('#living-atmosphere'),hero);
 const toggle=document.querySelector('#atmosphere-toggle');
 function updateMotion(){pollen.setMotion(moving);model?.setMotion(moving);toggle.setAttribute('aria-pressed',String(moving));toggle.setAttribute('aria-label',moving?'Tạm dừng chuyển động không gian':'Bật chuyển động không gian');toggle.innerHTML=icon(moving?'pause':'play')+`<span class="atmosphere-label">${moving?'Chuyển động':'Đã tạm dừng'}</span>`;hero.dataset.motion=moving?'on':'off';if(!moving){hero.style.setProperty('--pointer-x',0);hero.style.setProperty('--pointer-y',0);model?.setParallax(0,0)}}
 async function mount(next){
   type=next==='dna'?'dna':'cell';const ticket=++serial;
   model?.dispose();model=null;container.replaceChildren();
   const current=data[type];document.querySelector('.hero-specimen').dataset.specimen=type;
   document.querySelector('#hero-specimen-title').textContent=current.title;document.querySelector('#hero-specimen-kicker').textContent=current.kicker;document.querySelector('#specimen-index').textContent=current.index;
   document.querySelector('#hero-label-one').innerHTML=`<span></span>${current.labels[0]}`;document.querySelector('#hero-label-two').innerHTML=`<span></span>${current.labels[1]}`;container.setAttribute('aria-label',current.aria);
   const open=document.querySelector('#hero-open-model');open.dataset.model=type;open.setAttribute('aria-label',type==='cell'?'Khám phá tế bào thực vật':'Khám phá ADN xoắn kép');
   document.querySelectorAll('[data-specimen-type]').forEach(b=>{const active=b.dataset.specimenType===type;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active))});
   try{
     const {createModel}=await import('./models.js');if(ticket!==serial)return;
     const currentType=type;
     model=createModel(container,type,{hero:true,interactive:true,onSelect:id=>{openModel(currentType);if(currentType==='cell')selectOrganelle(id)}});model.setMotion(moving);
   }catch{if(ticket!==serial)return;container.innerHTML=`<button class="hero-model-fallback" aria-label="Mở mô hình tương tác" data-action="model" data-model="${type}"><img src="assets/${type}-thumbnail.png" alt="${current.aria}"><span>Mở mô hình tương tác</span></button>`}
 }
 document.querySelectorAll('[data-specimen-type]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.specimenType!==type)mount(b.dataset.specimenType)}));
 document.querySelectorAll('[data-realm]').forEach(b=>b.addEventListener('click',()=>onRealm(Number(b.dataset.realm))));
 toggle.addEventListener('click',()=>{moving=!moving;updateMotion()});motionPreference.addEventListener('change',e=>{moving=!e.matches;updateMotion()});
 hero.addEventListener('pointermove',e=>{if(!moving||e.pointerType!=='mouse')return;const rect=hero.getBoundingClientRect();const x=(e.clientX-rect.left)/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;hero.style.setProperty('--pointer-x',x.toFixed(3));hero.style.setProperty('--pointer-y',y.toFixed(3));pollen.setPointer(x,y);model?.setParallax(x,y)});
 hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--pointer-x',0);hero.style.setProperty('--pointer-y',0);pollen.setPointer(0,0);model?.setParallax(0,0)});
 updateMotion();mount('cell');
}

function createAtmosphere(canvas,hero){
 const ctx=canvas.getContext('2d');if(!ctx)return{setMotion(){},setPointer(){}};
 let width=0,height=0,visible=true,moving=true,last=0,time=0,px=0,py=0;
 const particles=Array.from({length:95},(_,i)=>({x:seed(i*3+1),y:seed(i*3+2),depth:.15+seed(i*3+3)*.85,phase:seed(i+91)*Math.PI*2}));
 function seed(n){const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)}
 function resize(){width=hero.clientWidth;height=hero.clientHeight;const dpr=Math.min(devicePixelRatio,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw()}
 function draw(){
   if(!width||!height)return;
   ctx.clearRect(0,0,width,height);
   const glow=ctx.createRadialGradient(width*.73,height*.43,0,width*.73,height*.43,width*.45);glow.addColorStop(0,'rgba(133,163,62,0.045)');glow.addColorStop(1,'rgba(133,163,62,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
   for(const p of particles){const drift=moving?Math.sin(time*.0001+p.phase)*15*p.depth:0;const x=p.x*width+px*p.depth*18+drift,y=((p.y*height-time*.003*p.depth)%height+height)%height+py*p.depth*12;const r=.35+p.depth*1.2;const alpha=.08+p.depth*.27;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=`rgba(${p.depth>.7?'210,222,157':'150,182,130'},${alpha})`;ctx.fill();if(p.depth>.84){const g=ctx.createRadialGradient(x,y,0,x,y,r*6);g.addColorStop(0,'rgba(193,217,121,0.08)');g.addColorStop(1,'rgba(193,217,121,0)');ctx.fillStyle=g;ctx.fillRect(x-r*6,y-r*6,r*12,r*12)}}
 }
 new ResizeObserver(resize).observe(hero);new IntersectionObserver(e=>visible=e[0].isIntersecting).observe(hero);
 function frame(now){requestAnimationFrame(frame);if(!visible||document.hidden||!moving||document.querySelector('dialog[open]')||now-last<40){last=now-last>100?now:last;return}time+=Math.min(now-last,50);last=now;draw()}
 resize();requestAnimationFrame(frame);
 return{setMotion(value){moving=value;draw()},setPointer(x,y){px=x;py=y}};
}
