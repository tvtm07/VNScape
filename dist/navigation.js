const routes={explore:'Khám phá',library:'Thư viện 3D',lab:'Phòng thí nghiệm',notebook:'Sổ tay của tôi'};
export function createNavigation({beforeNavigate=()=>{},onNavigate=()=>{}}={}){
 let current=null,lastHash=null;
 function apply({initial=false}={}){
  if(location.hash===lastHash)return;let page=location.hash.replace(/^#\/?/,'').split('/')[0]||'explore';
  if(page==='collection')page='library';if(!routes[page])page='explore';
  const canonical=`#/${page}`;if(location.hash!==canonical)history.replaceState(null,'',canonical);lastHash=location.hash;
  const changed=current!==page;beforeNavigate(page);current=page;
  document.querySelectorAll('.site-page[data-page]').forEach(el=>{el.hidden=el.dataset.page!==page});
  document.querySelectorAll('[data-nav]').forEach(el=>{const active=el.dataset.nav===page;el.classList.toggle('active',active);if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current')});
  document.body.dataset.page=page;document.title=`${routes[page]} — VNScape`;onNavigate(page);
  if(changed&&!initial){window.scrollTo({top:0,behavior:'instant'});document.querySelector(`.site-page[data-page="${page}"] [data-page-heading]`)?.focus({preventScroll:true})}
 }
 window.addEventListener('hashchange',()=>apply());
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#/"]');if(a&&a.getAttribute('href')===location.hash){e.preventDefault();window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}});
 return {start(){apply({initial:true})},navigate(page){if(!routes[page])return;const next=`#/${page}`;if(location.hash!==next)location.hash=next;else lastHash=null;apply()},get current(){return current}};
}
