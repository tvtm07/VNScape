import * as THREE from './assets/three.module.js';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
export function createModel(container,type='cell',{interactive=true,onSelect=()=>{},hero=false}={}){
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;
 container.append(renderer.domElement);
 let dirty=true;
 const baseDistance=type==='dna'?9:hero?9.1:8.4;let viewDistance=baseDistance;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.1,80);camera.position.set(0,0,baseDistance);
 const ambient=new THREE.HemisphereLight(0xe8efcb,0x103625,1.1);scene.add(ambient);
 const key=new THREE.DirectionalLight(0xfff5d5,2.6);key.position.set(-3,6,6);scene.add(key);
 const rim=new THREE.DirectionalLight(0x8ae8bf,2.8);rim.position.set(4,1,-3);scene.add(rim);
 const fill=new THREE.PointLight(0xe7fac0,15);fill.position.set(-3,-2,4);scene.add(fill);
 const root=new THREE.Group();scene.add(root);const targets=[];const mapping={};const parts=[];
 // A subtle procedural relief keeps the specimen closer to organic tissue.
 const textureCanvas=document.createElement('canvas');textureCanvas.width=textureCanvas.height=128;
 const textureContext=textureCanvas.getContext('2d');textureContext.fillStyle='#888';textureContext.fillRect(0,0,128,128);
 for(let i=0;i<1600;i++){const x=(Math.sin(i*51.7)*43758.5%1+1)%1*128,y=(Math.sin(i*13.1)*3117.8%1+1)%1*128;textureContext.fillStyle=i%2?'#9b9b9b':'#777';textureContext.beginPath();textureContext.arc(x,y,.4+(i%4)*.2,0,Math.PI*2);textureContext.fill()}
 const microTexture=new THREE.CanvasTexture(textureCanvas);microTexture.wrapS=microTexture.wrapT=THREE.RepeatWrapping;
 function mat(color,options={}){return new THREE.MeshStandardMaterial({color,roughness:.58,metalness:.025,bumpMap:microTexture,bumpScale:.018,...options})}
 function mesh(geo,material,parent=root,name){const o=new THREE.Mesh(geo,material);parent.add(o);if(name){o.userData.id=name;targets.push(o);(mapping[name]??=[]).push(o)}return o}
 function sphere(pos,scale,color,name,options={}){const o=mesh(new THREE.SphereGeometry(1,40,28),mat(color,options),root,name);o.position.set(...pos);o.scale.set(...scale);return o}
 function tube(points,radius,color,parent=root,name){const curve=new THREE.CatmullRomCurve3(points.map(x=>new THREE.Vector3(...x)));return mesh(new THREE.TubeGeometry(curve,Math.max(32,points.length*5),radius,7,false),mat(color),parent,name)}
 function roundedShape(w,h,r){const s=new THREE.Shape();s.moveTo(-w/2+r,-h/2);s.lineTo(w/2-r,-h/2);s.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);s.lineTo(w/2,h/2-r);s.quadraticCurveTo(w/2,h/2,w/2-r,h/2);s.lineTo(-w/2+r,h/2);s.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);s.lineTo(-w/2,-h/2+r);s.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);return s}
 function ring(w,h,r,z,name,color,radius=.09){const shape=roundedShape(w,h,r);const ps=shape.getPoints(60).map(p=>[p.x,p.y,z]);ps.push(ps[0]);tube(ps,radius,color,root,name)}
 if(type==='cell'){
   const shape=roundedShape(4.3,3.1,.7);const body=mesh(new THREE.ExtrudeGeometry(shape,{depth:.56,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:.13,bevelThickness:.13}),mat(0x728953,{transparent:true,opacity:.58}),root,'wall');body.position.z=-.72;
   ring(4.5,3.3,.75,-.08,'wall',0x9bb66a,.1);ring(4.28,3.08,.7,-.01,'wall',0xc4d28a,.045);
   ring(4.5,3.3,.75,-.72,'wall',0x6a9556,.08);
   const vac=sphere([.6,.02,-.05],[.95,1.12,.48],0x7ab9b0,'vacuole',{transparent:true,opacity:.73,roughness:.22});parts.push(vac);
   sphere([-1.13,-.08,.17],[.57,.62,.52],0xc6a1ac,'nucleus',{roughness:.31});sphere([-1.17,-.12,.6],[.21,.23,.13],0x835a8a,'nucleus');
   for(let k=0;k<12;k++){const a=k*Math.PI*2/12;sphere([-1.13+Math.cos(a)*.52,-.08+Math.sin(a)*.55,.4],[.025,.025,.025],0xdfc1c2,'nucleus')}
   [[-1.25,1,-.03,.25],[1.57,.87,.01,-.65],[1.42,-1.03,.05,.4],[-.67,-1.13,.1,-.2]].forEach(([x,y,z,a])=>{
    const g=new THREE.Group();g.position.set(x,y,z);g.rotation.z=a;root.add(g);
    const p=mesh(new THREE.SphereGeometry(1,32,20),mat(0x729a4e,{transparent:true,opacity:.58,roughness:.3}),g,'chloroplast');p.scale.set(.47,.24,.2);
    for(let j=-1;j<=1;j++)for(let i=0;i<4;i++){const disk=mesh(new THREE.CylinderGeometry(.105,.105,.025,16),mat(i%2?0xa8c76c:0x466d36),g,'chloroplast');disk.position.set(j*.22,-.07+i*.047,.1)}
   });
   [[-1.65,-.87,.12,.5],[.08,1.17,.12,-.2],[1.7,-.25,.16,1.2]].forEach(([x,y,z,a])=>{
    const g=new THREE.Group();g.position.set(x,y,z);g.rotation.z=a;root.add(g);const m=mesh(new THREE.SphereGeometry(1,24,16),mat(0xc29b66),g,'mitochondrion');m.scale.set(.28,.13,.13);
    const points=[];for(let i=0;i<15;i++)points.push([-.21+i*.03,Math.sin(i*1.9)*.065,.12]);tube(points,.016,0xf3d9a5,g,'mitochondrion');
   });
   for(let j=0;j<4;j++){const ps=[];for(let i=0;i<30;i++){let a=-1.4+i*.1;ps.push([-1.15+Math.cos(a)*(.66+j*.09),-.1+Math.sin(a)*(.75+j*.1),.04+Math.sin(i*.8)*.05])}tube(ps,.025,0x91ac84)}
   // Small ribosomes use deterministic placement for stable screenshots.
   for(let i=0;i<42;i++){const x=Math.sin(i*17.8)*1.9,y=Math.cos(i*8.7)*1.32;if((x+.9)**2+(y*.8)**2<.65||x>.0&&Math.abs(y)<.8)continue;sphere([x,y,-.12],[.026,.026,.026],0xd0cf91)}
   root.rotation.set(-.32,-.28,-.16);root.scale.setScalar(hero?1.26:1);
 }else if(type==='chloroplast'){
   const back=mesh(new THREE.SphereGeometry(1,56,32,0,Math.PI),mat(0x698a44,{side:THREE.DoubleSide}),root,'envelope');back.scale.set(2.45,1.38,.9);back.rotation.y=Math.PI;
   sphere([0,0,-.3],[2.25,1.19,.38],0x88a35c,'stroma',{transparent:true,opacity:.8});
   const outline=[];for(let i=0;i<=100;i++){const a=i/100*Math.PI*2;outline.push([Math.cos(a)*2.43,Math.sin(a)*1.36,.02])}tube(outline,.075,0xc0ce89,root,'envelope');
   for(let k=0;k<6;k++){const x=-1.65+k*.65,y=Math.sin(k*1.7)*.35;for(let j=0;j<6;j++){const d=mesh(new THREE.CylinderGeometry(.29,.29,.055,32),mat(j%2?0x9fba5f:0x59783c),root,'thylakoid');d.position.set(x,y-.2+j*.083,.27);d.rotation.x=.12}if(k<5)tube([[x+.23,y,.22],[x+.37,y-.08,.19],[x+.58,Math.sin((k+1)*1.7)*.35,.22]],.035,0xc4d28a,root,'thylakoid')}
   for(let i=0;i<24;i++)sphere([Math.sin(i*4.1)*1.95,Math.cos(i*3.1)*.94,.04],[.035,.035,.035],0xd5d8a1,'stroma');
   root.rotation.set(-.45,-.2,-.14);
 }else if(type==='mitochondrion'){
   const back=mesh(new THREE.SphereGeometry(1,56,32,0,Math.PI),mat(0xa67452,{side:THREE.DoubleSide}),root,'envelope');back.scale.set(2.4,1.16,.85);back.rotation.y=Math.PI;
   sphere([0,0,-.3],[2.15,.94,.32],0x9f7259,'matrix');const outline=[];for(let i=0;i<=100;i++){const a=i/100*Math.PI*2;outline.push([Math.cos(a)*2.39,Math.sin(a)*1.16,0])}tube(outline,.085,0xd3b087,root,'envelope');
   const folds=[];for(let i=0;i<=130;i++){const x=-1.9+i/130*3.8;folds.push([x,Math.sin(i/130*Math.PI*13)*(.73-Math.abs(x)*.16),.24+Math.cos(i/130*Math.PI*13)*.08])}tube(folds,.075,0xead3a3,root,'cristae');
   for(let i=0;i<28;i++)sphere([Math.sin(i*5.7)*1.6,Math.cos(i*2.8)*.76,-.05],[.035,.035,.035],0xe2cba3,'matrix');root.rotation.set(-.34,-.23,-.2);
 }else if(type==='bacterium'){
   const back=mesh(new THREE.SphereGeometry(1,56,32,0,Math.PI),mat(0x5f9390,{side:THREE.DoubleSide}),root,'envelope');back.scale.set(2.13,1.02,.73);back.rotation.y=Math.PI;
   sphere([0,0,-.25],[1.98,.87,.32],0x7dafa2,'envelope',{transparent:true,opacity:.62});const rimPoints=[];for(let i=0;i<=100;i++){const a=i/100*Math.PI*2;rimPoints.push([Math.cos(a)*2.14,Math.sin(a)*1.02,0])}tube(rimPoints,.09,0xb9d0aa,root,'envelope');
   const dna=[];for(let i=0;i<=120;i++){const a=i/120*Math.PI*6;dna.push([Math.cos(a)*.72+Math.sin(a*3)*.16,Math.sin(a)*.4,.22+Math.cos(a*2)*.12])}tube(dna,.037,0xe4d39c,root,'nucleoid');
   for(let i=0;i<40;i++){const x=Math.sin(i*9.1)*1.75,y=Math.cos(i*5.7)*.73;if(x*x+y*y<.65)continue;sphere([x,y,.1],[.065,.065,.055],0xc8deb3,'ribosome')}
   const flag=[];for(let i=0;i<=80;i++){const t=i/80;flag.push([2+t*2.1,Math.sin(t*Math.PI*4)*(.15+t*.18),Math.cos(t*Math.PI*4)*.12])}tube(flag,.045,0xd3c28f,root,'flagellum');
   for(let i=0;i<12;i++){const a=i/12*Math.PI*2;tube([[Math.cos(a)*2.08,Math.sin(a),-.08],[Math.cos(a)*2.33,Math.sin(a)*1.25,-.08]],.018,0x90b5a0,root,'envelope')}
   root.position.x=-.6;root.rotation.set(-.22,-.24,-.16);
 }else{
   const aPts=[],bPts=[];const baseColors=[0x9cb875,0xc1a579,0x8aafbd,0xc3a4b5];
   for(let i=0;i<130;i++){const t=i/129,y=(t-.5)*5.0,a=t*Math.PI*5.1;aPts.push([Math.cos(a),y,Math.sin(a)]);bPts.push([-Math.cos(a),y,-Math.sin(a)])}
   tube(aPts,.075,0xd5c38f,root,'backbone');tube(bPts,.075,0x88b3a5,root,'backbone');
   for(let i=0;i<26;i++){const t=i/25,y=(t-.5)*5,a=t*Math.PI*5.1;const v=new THREE.Vector3(Math.cos(a),0,Math.sin(a));
     for(let j=0;j<2;j++){const p1=v.clone().multiplyScalar(j===0?-1:0),p2=v.clone().multiplyScalar(j===0?0:1);p1.y=p2.y=y;const dir=p2.clone().sub(p1),c=mesh(new THREE.CylinderGeometry(.043,.043,dir.length(),10),mat(baseColors[(i%2)*2+j]),root,'base');c.position.copy(p1.clone().add(p2).multiplyScalar(.5));c.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize())}
     sphere([v.x,y,v.z],[.105,.105,.105],0xdac991);sphere([-v.x,y,-v.z],[.105,.105,.105],0x8fbdac);
   }root.rotation.set(.05,-.3,-.2);if(hero)root.scale.setScalar(.95);
 }
 const initialRotation=root.rotation.clone();
 let dragging=false,lastX=0,lastY=0,moved=0,auto=!reduced,zoom=1,selected=null,dead=false,visible=true;
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
 function down(e){dragging=true;moved=0;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId)}
 function move(e){if(!dragging)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;moved+=Math.abs(dx)+Math.abs(dy);root.rotation.y+=dx*.008;root.rotation.x+=dy*.008;lastX=e.clientX;lastY=e.clientY;dirty=true}
 function up(e){if(dragging&&moved<8){const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(targets,false).find(o=>o.object.userData.id);if(hit)onSelect(hit.object.userData.id)}dragging=false}
 function wheel(e){e.preventDefault();zoom=Math.min(1.5,Math.max(.7,zoom-e.deltaY*.0008));camera.position.z=viewDistance/zoom;dirty=true}
 function keydown(e){if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','='].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft')root.rotation.y-=.15;if(e.key==='ArrowRight')root.rotation.y+=.15;if(e.key==='ArrowUp')root.rotation.x-=.15;if(e.key==='ArrowDown')root.rotation.x+=.15;if(e.key==='+'||e.key==='=')wheel({preventDefault(){},deltaY:-100});if(e.key==='-')wheel({preventDefault(){},deltaY:100});dirty=true}}
 if(interactive){renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label','Mô hình sinh học: kéo hoặc dùng phím mũi tên để xoay, chọn cấu trúc để khám phá.');renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointercancel',()=>dragging=false);renderer.domElement.addEventListener('wheel',wheel,{passive:false});renderer.domElement.addEventListener('keydown',keydown)}
 function resize(){const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();const bounds=new THREE.Box3().setFromObject(root),size=bounds.getSize(new THREE.Vector3());size.x=Math.max(size.x,2*Math.abs(bounds.min.x),2*Math.abs(bounds.max.x));size.y=Math.max(size.y,2*Math.abs(bounds.min.y),2*Math.abs(bounds.max.y));const halfField=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));viewDistance=Math.max(baseDistance,size.y/(2*halfField)*1.13,size.x/(2*halfField*camera.aspect)*1.13);camera.position.z=viewDistance/zoom;dirty=true}
 const observer=new ResizeObserver(resize);observer.observe(container);resize();
 const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;dirty=true});visibility.observe(container);
 const dustGeometry=new THREE.BufferGeometry();const dustPositions=[];for(let i=0;i<95;i++)dustPositions.push(Math.sin(i*134.1)*9,Math.cos(i*81.7)*6,-4-(i%7));dustGeometry.setAttribute('position',new THREE.Float32BufferAttribute(dustPositions,3));const dust=new THREE.Points(dustGeometry,new THREE.PointsMaterial({color:0xc7d7a0,size:.02,transparent:true,opacity:.25,depthWrite:false}));scene.add(dust);
 let frame,lastTime=0;function animate(time){if(dead)return;frame=requestAnimationFrame(animate);if(!visible||document.hidden||time-lastTime<33||hero&&document.querySelector('dialog[open]'))return;lastTime=time;if(!auto&&!dragging&&!dirty)return;if(auto&&!dragging){if(hero){root.rotation.y=-.28+Math.sin(time*.00017)*.18;root.rotation.z=-.16+Math.sin(time*.00013)*.035}else root.rotation.y+=.002}if(selected&&mapping[selected])for(const m of targets){m.material.emissive?.set(m.userData.id===selected?0x263b13:0x000000)}renderer.render(scene,camera);dirty=false}frame=requestAnimationFrame(animate);
 return {select(id){selected=id;dirty=true},toggle(){auto=!auto;dirty=true;return auto},setMotion(value){auto=value;dirty=true},setParallax(x,y){camera.position.x=x*.2;camera.position.y=-y*.12;camera.lookAt(0,0,0);dirty=true},setLighting(lit){ambient.intensity=lit?2.4:1.1;renderer.toneMappingExposure=lit?1.1:.95;dirty=true},setShellVisible(visible){for(const m of mapping.wall||mapping.envelope||[])m.visible=visible;dirty=true},zoomBy(n){wheel({preventDefault(){},deltaY:n*-150})},reset(){root.rotation.copy(initialRotation);zoom=1;camera.position.set(0,0,viewDistance);camera.lookAt(0,0,0);dirty=true},snapshot(){renderer.render(scene,camera);return renderer.domElement.toDataURL('image/png')},dispose(){dead=true;cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(Array.isArray(o.material))o.material.forEach(x=>x.dispose());else o.material.dispose()}});microTexture.dispose();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove()}};
}
