import * as THREE from './assets/three.module.js';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
export function createModel(container,type='cell',{interactive=true,onSelect=()=>{},hero=false}={}){
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;
 container.append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(36,1,.1,80);camera.position.set(0,0,type==='dna'?9:9.8);
 scene.add(new THREE.HemisphereLight(0xf0f4d1,0x163f33,1.4));
 const key=new THREE.DirectionalLight(0xfff5d5,2.6);key.position.set(-3,6,6);scene.add(key);
 const rim=new THREE.DirectionalLight(0x8ae8bf,2.8);rim.position.set(4,1,-3);scene.add(rim);
 const fill=new THREE.PointLight(0xe7fac0,15);fill.position.set(-3,-2,4);scene.add(fill);
 const root=new THREE.Group();scene.add(root);const targets=[];const mapping={};const parts=[];
 function mat(color,options={}){return new THREE.MeshStandardMaterial({color,roughness:.4,metalness:.07,...options})}
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
   root.rotation.set(-.23,-.24,-.13);root.scale.setScalar(hero?1.08:1);
 }else{
   const aPts=[],bPts=[];const baseColors=[0x9cb875,0xc1a579,0x8aafbd,0xc3a4b5];
   for(let i=0;i<130;i++){const t=i/129,y=(t-.5)*5.0,a=t*Math.PI*5.1;aPts.push([Math.cos(a),y,Math.sin(a)]);bPts.push([-Math.cos(a),y,-Math.sin(a)])}
   tube(aPts,.075,0xd5c38f);tube(bPts,.075,0x88b3a5);
   for(let i=0;i<26;i++){const t=i/25,y=(t-.5)*5,a=t*Math.PI*5.1;const v=new THREE.Vector3(Math.cos(a),0,Math.sin(a));
     for(let j=0;j<2;j++){const p1=v.clone().multiplyScalar(j===0?-1:0),p2=v.clone().multiplyScalar(j===0?0:1);p1.y=p2.y=y;const dir=p2.clone().sub(p1),c=mesh(new THREE.CylinderGeometry(.043,.043,dir.length(),10),mat(baseColors[(i%2)*2+j]),root,'base');c.position.copy(p1.clone().add(p2).multiplyScalar(.5));c.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize())}
     sphere([v.x,y,v.z],[.105,.105,.105],0xdac991);sphere([-v.x,y,-v.z],[.105,.105,.105],0x8fbdac);
   }root.rotation.set(.05,-.3,-.2);
 }
 let dragging=false,lastX=0,lastY=0,moved=0,auto=!reduced,zoom=1,selected=null,dead=false,visible=true;
 const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();
 function down(e){dragging=true;moved=0;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId)}
 function move(e){if(!dragging)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;moved+=Math.abs(dx)+Math.abs(dy);root.rotation.y+=dx*.008;root.rotation.x+=dy*.008;lastX=e.clientX;lastY=e.clientY}
 function up(e){if(dragging&&moved<8){const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(targets,false).find(o=>o.object.userData.id);if(hit)onSelect(hit.object.userData.id)}dragging=false}
 function wheel(e){e.preventDefault();zoom=Math.min(1.5,Math.max(.7,zoom-e.deltaY*.0008));camera.position.z=(type==='dna'?9:9.8)/zoom}
 function keydown(e){if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','='].includes(e.key)){e.preventDefault();if(e.key==='ArrowLeft')root.rotation.y-=.15;if(e.key==='ArrowRight')root.rotation.y+=.15;if(e.key==='ArrowUp')root.rotation.x-=.15;if(e.key==='ArrowDown')root.rotation.x+=.15;if(e.key==='+'||e.key==='=')wheel({preventDefault(){},deltaY:-100});if(e.key==='-')wheel({preventDefault(){},deltaY:100})}}
 if(interactive){renderer.domElement.tabIndex=0;renderer.domElement.setAttribute('aria-label',type==='cell'?'Mô hình tế bào: kéo để xoay, chọn bào quan hoặc dùng các nút bên cạnh.':'Mô hình ADN: kéo hoặc dùng phím mũi tên để xoay.');renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointercancel',()=>dragging=false);renderer.domElement.addEventListener('wheel',wheel,{passive:false});renderer.domElement.addEventListener('keydown',keydown)}
 function resize(){const w=container.clientWidth,h=container.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix()}
 const observer=new ResizeObserver(resize);observer.observe(container);resize();
 const visibility=new IntersectionObserver(entries=>visible=entries[0].isIntersecting);visibility.observe(container);
 let frame,lastTime=0;function animate(time){if(dead)return;frame=requestAnimationFrame(animate);if(!visible||document.hidden||time-lastTime<33)return;lastTime=time;if(auto&&!dragging){if(hero){root.rotation.y=-.24+Math.sin(time*.0002)*.23;root.rotation.z=-.13+Math.sin(time*.00013)*.04}else root.rotation.y+=.002}if(selected&&mapping[selected])for(const m of targets){m.material.emissive?.set(m.userData.id===selected?0x263b13:0x000000)}renderer.render(scene,camera)}frame=requestAnimationFrame(animate);
 return {select(id){selected=id},toggle(){auto=!auto;return auto},zoomBy(n){wheel({preventDefault(){},deltaY:n*-150})},reset(){root.rotation.set(type==='dna'?.05:-.23,type==='dna'?-.3:-.24,type==='dna'?-.2:-.13);zoom=1;camera.position.z=type==='dna'?9:9.8},dispose(){dead=true;cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(Array.isArray(o.material))o.material.forEach(x=>x.dispose());else o.material.dispose()}});renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove()}};
}
