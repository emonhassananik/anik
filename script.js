const cursor = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      entry.target.style.transitionDelay = Math.min(i * 35, 220) + 'ms';
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s => sectionObserver.observe(s));

const tilt = document.querySelector('.tilt');
if(tilt && window.matchMedia('(pointer:fine)').matches){
  tilt.addEventListener('pointermove', e => {
    const r = tilt.getBoundingClientRect();
    const x = ((e.clientX-r.left)/r.width-.5)*10;
    const y = ((e.clientY-r.top)/r.height-.5)*-10;
    tilt.style.transform = `rotate(2deg) rotateX(${y}deg) rotateY(${x}deg) scale(1.01)`;
  });
  tilt.addEventListener('pointerleave', () => tilt.style.transform = 'rotate(2deg)');
}

const track = document.getElementById('galleryTrack');
const cards = [...track.children];
const progress = document.getElementById('galleryProgress');
let index = 0, timer, startX = 0, dragging = false;

function visibleCount(){
  return window.innerWidth < 600 ? 1.18 : window.innerWidth < 1000 ? 2.1 : 2.35;
}
function moveGallery(next = true){
  const max = Math.max(0, cards.length - Math.ceil(visibleCount()));
  index = next ? (index >= max ? 0 : index + 1) : (index <= 0 ? max : index - 1);
  const gap = 14;
  const cardW = cards[0].getBoundingClientRect().width + gap;
  track.style.transform = `translateX(-${index * cardW}px)`;
  progress.style.width = `${Math.max(12, ((index+1)/(max+1))*100)}%`;
}
document.getElementById('nextBtn').addEventListener('click', () => { moveGallery(true); restart(); });
document.getElementById('prevBtn').addEventListener('click', () => { moveGallery(false); restart(); });
function restart(){ clearInterval(timer); timer=setInterval(()=>moveGallery(true), 4300); }
document.querySelector('.gallery-stage').addEventListener('mouseenter',()=>clearInterval(timer));
document.querySelector('.gallery-stage').addEventListener('mouseleave',restart);
document.querySelector('.gallery-stage').addEventListener('touchstart',e=>{startX=e.touches[0].clientX;dragging=true},{passive:true});
document.querySelector('.gallery-stage').addEventListener('touchend',e=>{
  if(!dragging)return; const dx=e.changedTouches[0].clientX-startX;
  if(Math.abs(dx)>45) moveGallery(dx<0); dragging=false; restart();
});
restart();
window.addEventListener('resize',()=>moveGallery(false));



/* ANIK HERO — reliable two-line typewriter */
(function(){
  const line1 = document.getElementById('typedLine1');
  const line2 = document.getElementById('typedLine2');
  const cursor = document.querySelector('.typing-cursor');
  if(!line1 || !line2) return;

  const first = 'Md Emon';
  const second = 'Hassan Anik.';
  let a=0,b=0;

  line1.textContent='';
  line2.textContent='';
  if(cursor) cursor.style.opacity='1';

  const type1=()=>{
    if(a<first.length){
      line1.textContent += first[a++];
      setTimeout(type1,72);
    }else{
      setTimeout(type2,180);
    }
  };
  const type2=()=>{
    if(b<second.length){
      line2.textContent += second[b++];
      setTimeout(type2,68);
    }
  };
  setTimeout(type1,350);
})();

/* HOME V3 — cinematic typewriter */
(function(){
  const target = document.getElementById('typedV3');
  if(!target) return;
  const text = 'Md Emon Hassan Anik.';
  let i = 0;
  target.textContent = '';
  const type = () => {
    if(i < text.length){
      target.textContent += text.charAt(i++);
      setTimeout(type, i < 7 ? 95 : 68);
    }
  };
  setTimeout(type, 450);
})();

(function(){const e=document.getElementById('typedV4');if(!e)return;const t='Md Emon Hassan Anik.';let i=0;function go(){if(i<t.length){e.textContent+=t[i++];setTimeout(go,i<8?90:62)}}setTimeout(go,400)})();

/* HOME V6 typing — locked to exactly two visual lines */
(function(){
  const a=document.getElementById('typedV5a');
  const b=document.getElementById('typedV5b');
  if(!a||!b)return;
  const first='Md Emon';
  const second='Hassan Anik.';
  let i=0,j=0;
  function typeA(){ if(i<first.length){a.textContent+=first[i++];setTimeout(typeA,72)} else setTimeout(typeB,120); }
  function typeB(){ if(j<second.length){b.textContent+=second[j++];setTimeout(typeB,64)} }
  setTimeout(typeA,520);
})();

/* V6 premium interactions */
(function(){
  const body=document.body, progress=document.getElementById('scrollProgress'),
        top=document.getElementById('backTop'), loader=document.getElementById('siteLoader'),
        dot=document.getElementById('cursorDot'), toast=document.getElementById('toast');

  window.addEventListener('load',()=>setTimeout(()=>loader&&loader.classList.add('hide'),650));

  function updateScroll(){
    const h=document.documentElement.scrollHeight-window.innerHeight;
    const p=h>0?(window.scrollY/h)*100:0;
    if(progress)progress.style.width=p+'%';
    if(top)top.classList.toggle('show',window.scrollY>500);
  }
  updateScroll(); window.addEventListener('scroll',updateScroll,{passive:true});
  top&&top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  if(window.matchMedia('(pointer:fine)').matches){
    window.addEventListener('mousemove',e=>{
      if(dot){dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';}
      body.style.setProperty('--mx',(e.clientX/window.innerWidth*100)+'%');
      body.style.setProperty('--my',(e.clientY/window.innerHeight*100)+'%');
    });
  }

  document.querySelectorAll('.v5-main-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`translate(-50%,-50%) rotate(1.8deg) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='translate(-50%,-50%) rotate(1.8deg)');
  });

  document.querySelectorAll('.v5-btn').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      btn.style.setProperty('--bx',((e.clientX-r.left)/r.width*100)+'%');
      btn.style.setProperty('--by',((e.clientY-r.top)/r.height*100)+'%');
    });
    btn.addEventListener('mouseleave',()=>{btn.style.removeProperty('--bx');btn.style.removeProperty('--by')});
  });

  document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{
    a.addEventListener('click',()=>{
      if(!navigator.clipboard)return;
      const email=a.href.replace('mailto:','');
      navigator.clipboard.writeText(email).then(()=>{
        if(toast){toast.textContent='Email copied · opening mail';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)}
      }).catch(()=>{});
    });
  });

  const navs=[...document.querySelectorAll('.nav a')], sections=[...document.querySelectorAll('main section[id]')];
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        navs.forEach(n=>n.classList.toggle('active',n.getAttribute('href')==='#'+en.target.id));
      }
    })
  },{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(s=>io.observe(s));
})();
