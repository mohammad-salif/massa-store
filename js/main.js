const IM={
 "13": "images/hero-sofa.jpg",
 "2": "images/vessel.jpg",
 "10": "images/dusk-sofa.jpg",
 "5": "images/lounge-leather.jpg",
 "4": "images/sling-chairs.jpg",
 "3": "images/arch-armchair.jpg",
 "7": "images/channel-sofa.jpg",
 "11": "images/eclipse-table.jpg",
 "14": "images/sand-sofa.jpg"
};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const P=[
{id:"plinth",n:"Plinth Sofa",c:"Sofas",pr:6400,i:"13",pos:"40% 70%",d:"Three-seat oak frame with loose linen cushions.",f:["Oat linen","Chalk linen"],s:true},
{id:"dusk",n:"Dusk Sofa",c:"Sofas",pr:5900,i:"10",pos:"50% 70%",d:"Low, deep and rounded. Charcoal wool-linen blend.",f:["Charcoal","Smoke"],s:true},
{id:"sand",n:"Sand Sofa",c:"Sofas",pr:4800,i:"14",pos:"30% 60%",d:"A wide three-seater in natural linen weave.",f:["Sand","Chalk"],s:true},
{id:"channel",n:"Channel Sofa",c:"Sofas",pr:7200,i:"7",pos:"20% 40%",d:"Modular rolled channels in two-tone grey.",f:["Stone / Grey","Stone"],s:false},
{id:"arch",n:"Arch Armchair",c:"Seating",pr:2350,i:"3",pos:"72% 70%",d:"Rounded bouclé armchair with a deep, low seat.",f:["Oat bouclé","Cream bouclé"],s:true},
{id:"sling",n:"Sling Chair",c:"Seating",pr:1150,i:"4",pos:"15% 70%",d:"Oiled oak frame with a saddle-leather sling.",f:["Tan leather","Stone leather"],s:true},
{id:"eclipse",n:"Eclipse Table",c:"Tables",pr:3600,i:"11",pos:"50% 80%",d:"Walnut oval top on blackened oak legs.",f:["Walnut / Black"],s:true},
{id:"loop",n:"Loop Side Table",c:"Tables",pr:1480,i:"3",pos:"20% 75%",d:"Carved walnut base with a honed marble top.",f:["Walnut / White marble"],s:false},
{id:"vessel",n:"Vessel No. 3",c:"Objects",pr:380,i:"2",pos:"50% 50%",d:"Hand-finished ceramic with a pierced form.",f:["Chalk"],s:true}];
const CATS=["Sofas","Seating","Tables","Objects"];
const fm=n=>"$"+n.toLocaleString("en-US");
let cat="All",sort="f",q="",cart=[],wish=[];
try{cart=JSON.parse(localStorage.getItem("massa-cart")||"[]");wish=JSON.parse(localStorage.getItem("massa-wish")||"[]")}catch(e){}
const save=()=>{try{localStorage.setItem("massa-cart",JSON.stringify(cart));localStorage.setItem("massa-wish",JSON.stringify(wish))}catch(e){}};
const img=(k,alt,extra="")=>`<img src="${IM[k]}" alt="${alt}" loading="lazy" ${extra}>`;
$$("img[data-i]").forEach(e=>{e.src=IM[e.dataset.i];if(e.dataset.lazy!==undefined)e.loading="lazy";if(e.dataset.p)e.style.objectPosition=e.dataset.p});
/* filters */
$("#fl").innerHTML=["All",...CATS].map(c=>`<button aria-pressed="${c==="All"}" data-c="${c}">${c}</button>`).join("");
$("#fl").onclick=e=>{const b=e.target.closest("button");if(!b)return;cat=b.dataset.c;$$("#fl button").forEach(x=>x.setAttribute("aria-pressed",x===b));render()};
$("#so").onchange=e=>{sort=e.target.value;render()};
$("#sb").onclick=()=>{const s=$("#sq");s.style.display=s.style.display==="none"?"block":"none";if(s.style.display==="block"){$("#si").focus();$("#shop").scrollIntoView()}};
$("#si").oninput=e=>{q=e.target.value.toLowerCase();render()};
function render(){let l=P.filter(p=>(cat==="All"||p.c===cat)&&(p.n+p.d+p.c).toLowerCase().includes(q));
if(sort==="a")l.sort((a,b)=>a.pr-b.pr);if(sort==="d")l.sort((a,b)=>b.pr-a.pr);
$("#gd").innerHTML=l.length?l.map(p=>`<article class="p"><div class="im"><button class="wish" data-w="${p.id}" aria-pressed="${wish.includes(p.id)}" aria-label="Save ${p.n}"><svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.800-8 11-8 11z"/></svg></button>
<button class="open" data-open="${p.id}" aria-label="View ${p.n}" style="height:100%">${img(p.i,p.n,`style="object-position:${p.pos}"`)}</button>
${p.s?`<button class="q" data-add="${p.id}">Quick add</button>`:`<span class="q" style="cursor:default">Sold out</span>`}</div>
<div class="m"><span>${p.n}<br><span class="d">${p.d}</span></span><span>${fm(p.pr)}</span></div></article>`).join(""):`<p class="empty" style="grid-column:1/-1">No pieces match. <button class="rm" onclick="q='';cat='All';$('#si').value='';render()">Clear filters</button></p>`}
$("#gd").onclick=e=>{const a=e.target.closest("[data-add]"),o=e.target.closest("[data-open]"),w=e.target.closest("[data-w]");
if(a)add(a.dataset.add);else if(w){const i=w.dataset.w;wish=wish.includes(i)?wish.filter(x=>x!==i):[...wish,i];save();w.setAttribute("aria-pressed",wish.includes(i));toast(wish.includes(i)?"Saved to favorites":"Removed from favorites")}else if(o)openP(o.dataset.open)};
/* rooms */
$("#cl").innerHTML=CATS.map((c,i)=>`<li><button data-cat="${c}" class="${i?"":"on"}">${c}<small>${P.filter(p=>p.c===c).length} pieces</small></button></li>`).join("");
const RI={Sofas:"13",Seating:"3",Tables:"11",Objects:"2"};
$("#ci").innerHTML=CATS.map((c,i)=>`<img src="${IM[RI[c]]}" alt="" class="${i?"":"on"}" data-for="${c}" style="object-position:${c==="Tables"?"50% 70%":"50% 50%"}">`).join("");
const sw=c=>{$$("#ci img").forEach(i=>i.classList.toggle("on",i.dataset.for===c));$$("#cl button").forEach(b=>b.classList.toggle("on",b.dataset.cat===c))};
$("#cl").addEventListener("mouseover",e=>{const b=e.target.closest("button");b&&sw(b.dataset.cat)});$("#cl").addEventListener("focusin",e=>{const b=e.target.closest("button");b&&sw(b.dataset.cat)});
$("#cl").onclick=e=>{const b=e.target.closest("button");if(!b)return;cat=b.dataset.cat;$$("#fl button").forEach(x=>x.setAttribute("aria-pressed",x.dataset.c===cat));render();$("#shop").scrollIntoView()};
/* cart */
let last;
function add(id,f,n=1){const p=P.find(x=>x.id===id);f=f||p.f[0];const l=cart.find(x=>x.id===id&&x.f===f);l?l.q+=n:cart.push({id,f,q:n});save();draw();toast(p.n+" added to cart")}
function draw(){const n=cart.reduce((a,b)=>a+b.q,0);$("#cc").textContent=n;
$("#it").innerHTML=cart.length?cart.map((l,i)=>{const p=P.find(x=>x.id===l.id);return `<div class="it"><img src="${IM[p.i]}" alt="" style="object-position:${p.pos}"><div><div style="display:flex;justify-content:space-between"><b style="font-weight:500">${p.n}</b><span>${fm(p.pr*l.q)}</span></div><div style="color:var(--mute)">${l.f}</div><div class="r"><div class="qty"><button data-m="${i}" aria-label="Decrease quantity of ${p.n}">−</button><span>${l.q}</span><button data-p="${i}" aria-label="Increase quantity of ${p.n}">+</button></div><button class="rm" data-r="${i}">Remove</button></div></div></div>`}).join(""):`<div class="empty">Your cart is empty.<br><button class="btn o" id="ec">Browse the collection</button></div>`;
const t=cart.reduce((a,l)=>a+P.find(x=>x.id===l.id).pr*l.q,0);
$("#df").innerHTML=cart.length?`<div class="sub"><span>Subtotal</span><b style="font-weight:500">${fm(t)}</b></div><small style="color:var(--mute)">Delivery and tax are calculated at checkout.</small><button class="btn" id="co">Checkout</button><p class="msg" id="cm" role="status"></p>`:""}
$("#it").onclick=e=>{const g=a=>e.target.closest(a);let b;
if(b=g("[data-m]")){const l=cart[b.dataset.m];l.q--;if(l.q<1)cart.splice(b.dataset.m,1)}else if(b=g("[data-p]"))cart[b.dataset.p].q++;else if(b=g("[data-r]"))cart.splice(b.dataset.r,1);else if(g("#ec")){closeD();$("#shop").scrollIntoView();return}else return;save();draw()};
$("#df").onclick=e=>{if(e.target.id==="co")$("#cm").textContent="Checkout isn’t connected in this demo. A payment provider and order backend need to be configured before real orders can be taken."};
function openD(){last=document.activeElement;$("#dr").classList.add("on");$("#sc").classList.add("on");$("#dr").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";$("#cx").focus()}
function closeD(){$("#dr").classList.remove("on");$("#sc").classList.remove("on");$("#dr").setAttribute("aria-hidden","true");document.body.style.overflow="";last&&last.focus&&last.focus()}
$("#cb").onclick=openD;$("#cx").onclick=closeD;$("#sc").onclick=closeD;
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&$("#dr").classList.contains("on"))closeD();
if(e.key==="Tab"&&$("#dr").classList.contains("on")){const f=$$("button,a,select,input",$("#dr")).filter(x=>!x.disabled);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
/* product dialog */
function openP(id){const p=P.find(x=>x.id===id),m=$("#md");m.innerHTML=`<div class="mg"><div class="im">${img(p.i,p.n,`style="object-position:${p.pos}"`)}</div><div class="mi"><button class="x" id="mx">Close</button><h3 id="mt">${p.n}</h3><div style="font-size:20px">${fm(p.pr)}</div><p style="color:var(--mute)">${p.d} Demo product data.</p>
<label for="mf">Finish</label><select id="mf">${p.f.map(f=>`<option>${f}</option>`).join("")}</select>
<label for="mq">Quantity</label><select id="mq">${[1,2,3,4].map(n=>`<option>${n}</option>`).join("")}</select>
<p style="font-size:14px">${p.s?"In stock · ships in 6–8 weeks (demo)":"Out of stock"}</p>
<button class="btn" id="ma" ${p.s?"":"disabled style='opacity:.4;cursor:not-allowed'"}>${p.s?"Add to cart":"Sold out"}</button></div></div>`;
m.showModal();$("#mx").onclick=()=>m.close();$("#ma").onclick=()=>{add(id,$("#mf").value,+$("#mq").value);m.close()}}
$("#md").onclick=e=>{if(e.target===e.currentTarget)e.currentTarget.close()};
document.addEventListener("click",e=>{const b=e.target.closest("[data-open]");if(b&&!b.closest("#gd"))openP(b.dataset.open)});
/* misc */
let tt;function toast(s){const t=$("#ts");t.textContent=s;t.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("on"),2200)}
$("#bg").onclick=()=>{const o=$("#mn").classList.toggle("on");$("#bg").setAttribute("aria-expanded",o)};
$$("#mn a").forEach(a=>a.onclick=()=>{$("#mn").classList.remove("on");$("#bg").setAttribute("aria-expanded",false)});
$("#nf").onsubmit=e=>{e.preventDefault();const v=$("#em").value.trim(),m=$("#nm");
if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){m.className="msg err";m.textContent="Enter a valid email address, like name@example.com.";$("#em").focus();return}
m.className="msg";m.textContent="Looks good, but no email service is connected in this demo, so nothing was saved or sent."};
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.15});$$(".rv").forEach(x=>io.observe(x));
render();draw();
const go=()=>document.body.classList.add("ready");
Promise.race([Promise.all($$("img[fetchpriority]").map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,900))]).then(()=>setTimeout(go,500));

document.addEventListener("click",e=>{const a=e.target.closest("[data-add]");if(a&&!a.closest("#gd"))add(a.dataset.add)});
$$(".tl").forEach(b=>b.onclick=()=>{cat=b.dataset.cat;$$("#fl button").forEach(x=>x.setAttribute("aria-pressed",x.dataset.c===cat));render();$("#shop").scrollIntoView()});
$$(".wr").forEach(h=>{h.innerHTML=h.textContent.trim().split(/\s+/).map((w,i)=>`<span class="w"><i style="--i:${i}">${w}</i></span> `).join("");io.observe(h)});
new MutationObserver(()=>$$("#gd .p:not(.rv)").forEach((p,i)=>{p.classList.add("rv");p.style.setProperty("--d",(i%3)*.09+"s");p.addEventListener("transitionend",()=>p.style.setProperty("--d","0s"),{once:true});io.observe(p)})).observe($("#gd"),{childList:true});
(()=>{const par=$$("[data-par]"),rm=matchMedia("(prefers-reduced-motion:reduce)").matches;let tk=0;
const f=()=>{tk=0;const d=document.documentElement;$("#pg").style.transform=`scaleX(${scrollY/Math.max(1,d.scrollHeight-innerHeight)})`;if(rm)return;
par.forEach(e=>{const r=e.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;e.style.transform=`translate3d(0,${(r.top+r.height/2-innerHeight/2)*-e.dataset.par}px,0) scale(${e.dataset.sc||1})`})};
addEventListener("scroll",()=>{tk||(tk=requestAnimationFrame(f))},{passive:true});f()})();
render();
