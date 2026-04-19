(function(){var s=document.createElement('script');s.src='fixes-1.js';document.head.appendChild(s);})();/* ═══ STARS ═══ */
(function(){
  const c=document.getElementById('sf'),x=c.getContext('2d');
  let W,H,S=[];
  const init=()=>{W=c.width=innerWidth;H=c.height=innerHeight;S=[];
    for(let i=0;i<200;i++)S.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.1+.15,
      vx:(Math.random()-.5)*.024,vy:(Math.random()-.5)*.024,
      ph:Math.random()*Math.PI*2,sp:Math.random()*.004+.001,
      t:Math.random()<.06?'c':Math.random()<.04?'p':'w'});};
  let f=0;
  const draw=()=>{f++;x.clearRect(0,0,W,H);S.forEach(s=>{
    s.x+=s.vx;s.y+=s.vy;
    if(s.x<0)s.x=W;if(s.x>W)s.x=0;if(s.y<0)s.y=H;if(s.y>H)s.y=0;
    const b=.15+.65*Math.abs(Math.sin(f*s.sp+s.ph));
    x.beginPath();x.arc(s.x,s.y,s.r,0,Math.PI*2);
    if(s.t==='c'){x.fillStyle=`rgba(79,195,247,${b*.7})`;if(b>.65){x.shadowColor='#4FC3F7';x.shadowBlur=5;}}
    else if(s.t==='p'){x.fillStyle=`rgba(149,117,205,${b*.55})`;if(b>.65){x.shadowColor='#9575CD';x.shadowBlur=5;}}
    else x.fillStyle=`rgba(176,190,197,${b*.28})`;
    x.fill();x.shadowBlur=0;});requestAnimationFrame(draw);};
  window.addEventListener('resize',init);init();draw();
})();

/* ═══ HISTORY & NAVIGATION ═══ */
const HIST=[];let HPOS=-1;
function gP(p){
  if(HPOS<0||HIST[HPOS]!==p){HIST.splice(HPOS+1);HIST.push(p);HPOS=HIST.length-1;}
  _show(p);
}
function navBack(){if(HPOS>0){HPOS--;_show(HIST[HPOS]);}}
function navFwd(){if(HPOS<HIST.length-1){HPOS++;_show(HIST[HPOS]);}}
function _show(p){
  document.querySelectorAll('.page').forEach(el=>el.classList.remove('active'));
  const pg=document.getElementById('page-'+p);
  if(pg)pg.classList.add('active');
  document.querySelectorAll('.nlink').forEach(l=>l.classList.remove('on'));
  if(p==='home')document.getElementById('nl-home').classList.add('on');
  if(p==='contact')document.getElementById('nl-con').classList.add('on');
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(rvAll,80);
  setTimeout(animBars,300);
  // Arrows
  const arr=document.getElementById('navArrows');
  arr.style.display=HIST.length>1?'flex':'none';
  document.getElementById('backBtn').disabled=HPOS<=0;
  document.getElementById('fwdBtn').disabled=HPOS>=HIST.length-1;
}
function gS(id){
  gP('home');
  setTimeout(()=>{const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});},140);
}
function togMob(){document.getElementById('mobMenu').classList.toggle('open');}

/* ═══ REVEAL ═══ */
function rvAll(){
  const o=new IntersectionObserver(e=>{e.forEach(el=>{if(el.isIntersecting)el.target.classList.add('vis');});},{threshold:.08});
  document.querySelectorAll('.rv:not(.vis)').forEach(el=>o.observe(el));
}
rvAll();

/* ═══ BAR CHARTS ═══ */
function animBars(){
  document.querySelectorAll('.bar-f').forEach(b=>{
    b.style.width='0';
    setTimeout(()=>{b.style.width=b.getAttribute('data-w')+'%';},100);
  });
}
animBars();

/* ═══ CAREER DATA ═══ */
const CAREERS=[
  {dept:'Engineering',title:'AI Workflow Architect',tags:['Make.com','Claude API','Remote'],
   desc:'Design, structure, and deploy intelligent workflow systems for operational clients across South African industries. You think in systems, not features. You build for scale, not for demos.',
   reqs:['2+ years experience with Make.com, Zapier, or n8n workflow platforms','Solid understanding of REST APIs and webhook-based integrations','Experience with AI language model APIs (Claude, OpenAI, or similar)','Ability to map and document business processes before building solutions','Strong communication skills — you explain complex systems simply and clearly'],
   role:'AI Workflow Architect'},
  {dept:'Engineering',title:'Automation Specialist',tags:['APIs','Airtable','Make.com','Remote'],
   desc:'Implement and maintain modular automation systems across client environments. You are precise, reliable, and understand that broken automation is worse than no automation.',
   reqs:['Hands-on experience building automations with no-code/low-code platforms','Comfortable with Airtable, Google Sheets, and cloud database structures','Solid understanding of JSON data structures and API calls','Methodical testing approach — you break things deliberately before they break in production','Available for client-facing technical handover sessions'],
   role:'Automation Specialist'},
  {dept:'Strategy',title:'Systems Analyst',tags:['Process Mapping','Consulting','Remote / Field'],
   desc:'Diagnose operational inefficiencies and translate business reality into structured system designs. You see what others overlook and communicate it with precision.',
   reqs:['Experience in business process mapping or operational consulting','Ability to conduct structured interviews with business owners and staff','Strong documentation skills — you write clear, specific system specifications','Understanding of automation principles even without deep technical coding background','South African informal business context knowledge is a strong advantage'],
   role:'Systems Analyst'},
  {dept:'Operations',title:'Operations Coordinator',tags:['Client Relations','Account Management','Remote'],
   desc:'Own client relationships through the deployment lifecycle. Ensure every system performs as designed and every client understands how to operate it.',
   reqs:['Experience in client-facing account management or operations roles','Comfortable running onboarding sessions and system training for non-technical users','Organised, detail-oriented approach to managing multiple client relationships simultaneously','Ability to identify upsell opportunities naturally through genuine client care','WhatsApp-native communication style — most client contact happens on WhatsApp'],
   role:'Operations Coordinator'},
];
function buildCareers(){
  const g=document.getElementById('careerGrid');
  if(!g)return;
  g.innerHTML=CAREERS.map((c,i)=>`
  <div class="crc rv${i>0?' d'+i:''}">
    <div class="cr-dept">${c.dept}</div>
    <div class="cr-title">${c.title}</div>
    <div class="cr-tags">${c.tags.map(t=>`<span class="cr-tag${t.includes('Remote')?' r':''}">${t}</span>`).join('')}</div>
    <div class="cr-dtog" onclick="togDesc(this,'${i}')" id="tog-${i}">
      <span class="arr">&#9658;</span> View Job Description &amp; Requirements
    </div>
    <div class="cr-desc" id="desc-${i}">${c.desc}</div>
    <div class="cr-reqs" id="reqs-${i}">
      <div class="cr-rt">Requirements</div>
      <ul class="cr-rl">${c.reqs.map(r=>`<li>${r}</li>`).join('')}</ul>
    </div>
    <div class="cr-as">
      <button class="cr-ab" onclick="openApply('${c.title}','${c.role}')">Apply for This Role &#8594;</button>
    </div>
  </div>`).join('');
}
buildCareers();
function togDesc(el,i){
  const d=document.getElementById('desc-'+i),r=document.getElementById('reqs-'+i);
  const open=el.classList.contains('open');
  el.classList.toggle('open',!open);
  d.style.display=open?'none':'block';
  r.style.display=open?'none':'block';
}

/* ═══ APPLY MODAL ═══ */
function openApply(title,role){
  document.getElementById('arolTitle').textContent=title;
  document.getElementById('ap-r').value=role;
  document.getElementById('applyModal').classList.add('open');
  document.getElementById('applyForm').style.display='';
  document.getElementById('applyOk').style.display='none';
  document.getElementById('cvFN').textContent='';
  document.body.style.overflow='hidden';
}
function closeApply(){
  document.getElementById('applyModal').classList.remove('open');
  document.body.style.overflow='';
}
document.getElementById('applyModal').addEventListener('click',function(e){if(e.target===this)closeApply();});
function cvSel(input){
  const file=input.files[0];
  if(file)document.getElementById('cvFN').textContent='✓ '+file.name;
}
function submitApply(e){
  e.preventDefault();
  const name=document.getElementById('ap-n').value;
  const email=document.getElementById('ap-e').value;
  const phone=document.getElementById('ap-p').value;
  const role=document.getElementById('ap-r').value;
  const why=document.getElementById('ap-w').value;
  const exp=document.getElementById('ap-x').value;
  const cv=document.getElementById('cvFile').files[0];
  const sub=encodeURIComponent('AutoSageAI Application: '+role+' — '+name);
  const body=encodeURIComponent(
    'AUTOSAGEAI JOB APPLICATION\n\nName: '+name+'\nEmail: '+email+'\nPhone: '+phone+
    '\nRole: '+role+'\n\nWhy AutoSageAI:\n'+why+'\n\nExperience:\n'+exp+
    (cv?'\n\nCV File: '+cv.name+' (please request if needed)':'\n\nNo CV uploaded'));
  window.open('mailto:tonybuthel@gmail.com?subject='+sub+'&body='+body,'_blank');
  setTimeout(()=>{
    const wa=encodeURIComponent('Hi Anthony, I just applied for the '+role+' role at AutoSageAI. My name is '+name+', email: '+email);
    window.open('https://wa.me/27660018931?text='+wa,'_blank');
  },900);
  document.getElementById('applyForm').style.display='none';
  document.getElementById('applyOk').style.display='block';
}

/* ═══ CONTACT FORM ═══ */
function submitCon(e){
  e.preventDefault();
  const name=document.getElementById('cf-n').value;
  const email=document.getElementById('cf-e').value;
  const phone=document.getElementById('cf-p').value;
  const biz=document.getElementById('cf-b').value;
  const challenge=document.getElementById('cf-c').value;
  const goal=document.getElementById('cf-g').value;
  const sub=encodeURIComponent('AutoSageAI Engagement Request — '+name);
  const body=encodeURIComponent(
    'AUTOSAGEAI ENGAGEMENT REQUEST\n\nName: '+name+'\nEmail: '+email+'\nPhone: '+phone+
    '\nBusiness: '+biz+'\n\nChallenge:\n'+challenge+'\n\n90-Day Goal:\n'+goal);
  window.open('mailto:tonybuthel@gmail.com?subject='+sub+'&body='+body,'_blank');
  setTimeout(()=>{
    const wa=encodeURIComponent('Hi AutoSageAI, I just submitted an engagement request.\nName: '+name+'\nBusiness: '+(biz||'Not specified'));
    window.open('https://wa.me/27660018931?text='+wa,'_blank');
  },900);
  document.getElementById('conForm').style.display='none';
  document.getElementById('conOk').style.display='block';
}

/* ═══ DISCOVERY ═══ */
const DQ=[
  {type:'opts',label:'Question 1 of 6',text:'What type of business do you run?',opts:['Car Dealership','Panel Beater / Auto Repair','Mechanic Workshop','Manufacturing / Factory','Retail Store','Professional Services','Executive / Personal','Other']},
  {type:'opts',label:'Question 2 of 6',text:'What is your biggest operational challenge right now?',opts:['Slow customer response times','Manual admin consuming hours daily','Missing leads and follow-ups','No online visibility','Disorganised data or records at risk','Staff stuck on repetitive tasks','Poor workflow visibility','All of the above']},
  {type:'opts',label:'Question 3 of 6',text:'How many people work in your business?',opts:['Just me','2–5 people','6–15 people','16–50 people','50+ people']},
  {type:'opts',label:'Question 4 of 6',text:'How much revenue do you estimate is lost monthly to inefficiency?',opts:['Under R5,000','R5,000–R15,000','R15,000–R40,000','R40,000–R100,000','More than R100,000','Not sure yet']},
  {type:'opts',label:'Question 5 of 6',text:'When do you want your AI system live?',opts:['ASAP — within 48 hours','Within 1 week','Within 2–4 weeks','Within 2–3 months','Just exploring options']},
  {type:'text',label:'Question 6 of 6',text:'In one sentence — what would change in your business if this problem was solved?',ph:'e.g. I could focus on growing instead of firefighting all day...'},
];
let DA=[],DS=0;
function buildDisco(){
  const prog=document.getElementById('dprog');
  const qw=document.getElementById('dqw');
  if(!prog||!qw)return;
  prog.innerHTML=DQ.map((_,i)=>`<div class="dpdot" id="dp-${i}"></div>`).join('')+'<div class="dpdot" id="dp-email"></div>';
  qw.innerHTML=DQ.map((q,i)=>`
  <div class="dq${i===0?' act':''}" id="dq-${i}">
    <div class="dql">${q.label}</div>
    <div class="dqt">${q.text}</div>
    ${q.type==='opts'?
      `<div class="dopts">${q.opts.map(o=>`<button class="dopt" onclick="dSel(this,${i},'${o.replace(/'/g,"\\'")}')">${o}</button>`).join('')}</div>
       <div class="dnav">${i>0?`<button class="dbk" onclick="dGo(${i-1})">← Back</button>`:''}
         <button class="dnxt" id="dnxt-${i}" onclick="dGo(${i+1})" disabled>Continue →</button></div>`:
      `<input class="dinp" type="text" id="dinp-${i}" placeholder="${q.ph}" oninput="dTxt(${i})">
       <div class="dnav"><button class="dbk" onclick="dGo(${i-1})">← Back</button>
         <button class="dnxt" id="dnxt-${i}" onclick="dGo(${i+1})" disabled>Continue →</button></div>`
    }
  </div>`).join('');
  updDots();
}
buildDisco();
function dSel(el,step,val){
  el.closest('.dopts').querySelectorAll('.dopt').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');DA[step]=val;
  document.getElementById('dnxt-'+step).disabled=false;
}
function dTxt(step){
  const v=document.getElementById('dinp-'+step).value.trim();
  DA[step]=v;document.getElementById('dnxt-'+step).disabled=v.length<3;
}
function dGo(next){
  if(next<0||next>DQ.length)return;
  document.querySelectorAll('.dq').forEach(q=>q.classList.remove('act'));
  if(next===DQ.length){
    document.getElementById('demail').style.display='block';
    document.getElementById('dqw').style.display='none';
  } else {
    document.getElementById('demail').style.display='none';
    document.getElementById('dqw').style.display='block';
    document.getElementById('dq-'+next).classList.add('act');
  }
  DS=next;updDots();
}
function updDots(){
  DQ.forEach((_,i)=>{const d=document.getElementById('dp-'+i);if(!d)return;d.className='dpdot'+(i<DS?' done':i===DS?' act':'');});
  const de=document.getElementById('dp-email');
  if(de)de.className='dpdot'+(DS>=DQ.length?' act':'');
}
function submitDisco(){
  const name=document.getElementById('dname').value.trim();
  const email=document.getElementById('demail2').value.trim();
  if(!email){alert('Please enter your email so we can send your blueprint.');return;}
  const sub=encodeURIComponent('AutoSageAI New Lead: '+name);
  const body=encodeURIComponent(
    'NEW AUTOSAGEAI LEAD\n\nName: '+name+'\nEmail: '+email+'\n\n'+
    'Discovery Answers:\n'+DQ.map((q,i)=>q.text+'\n→ '+(DA[i]||'Skipped')).join('\n\n'));
  window.open('mailto:tonybuthel@gmail.com?subject='+sub+'&body='+body,'_blank');
  document.getElementById('demail').style.display='none';
  document.getElementById('dqw').style.display='none';
  document.getElementById('dprog').style.display='none';
  document.getElementById('ddone').style.display='block';
  document.getElementById('dMainH').style.display='none';
  document.getElementById('dMainS').style.display='none';
}

/* ═══ CHAT ═══ */
let chatOpen=false;
const T=()=>new Date().toLocaleTimeString('en-ZA',{hour:'2-digit',minute:'2-digit'});
function togChat(){
  chatOpen=!chatOpen;
  document.getElementById('chatModal').classList.toggle('open',chatOpen);
  if(chatOpen)document.getElementById('chatBadge').classList.add('hid');
}
const BOT={
  services:["AutoSageAI operates across four disciplines:\n\n01 — Operational Structuring\nDesigning clear system flows for predictable execution.\n\n02 — Automation Deployment\nModular systems that reduce manual dependency and increase speed.\n\n03 — Intelligence Coordination\nAligning AI outputs with human decision-making.\n\n04 — Workflow Optimisation\nRestructuring processes for maximum performance.","Which discipline fits your situation best?"],
  process:["Five structured stages:\n\n01 Discovery\n02 Diagnostic Mapping\n03 System Design\n04 Build & Deployment\n05 Optimisation\n\nWe begin with structure — not technology. Every step is documented before we build.","Ready to begin? Click Get Started in the navigation."],
  timeline:["Delivery times:\n\n⚡ Basic automation — 48 hours live\n🔨 Complex operational builds — 14 days\n\nEvery engagement begins with a diagnostic consultation scheduled within 48 hours of submission.","Would you like to start the engagement?"],
  cases:["Five verified operational deployments:\n\n🚗 Car Dealership — Communication workflow restructuring\n🔧 Mechanic Workshop — Job tracking automation\n🔨 Panel Beater — Repair workflow visibility\n🏭 Factory — Production coordination systems\n👤 Executive PA — Scheduling and communication automation\n\nEvery system was structured before it was automated.","Which case is most relevant to your business?"],
  started:["To begin:\n\n1. Click 'Get Started' in the navigation bar\n2. Answer 6 quick questions\n3. We send your personalised blueprint within 2 hours\n\nOr reach Anthony directly via the Contact page.","Ready to get your blueprint?"],
  default:["AutoSageAI is a coordination system that aligns people, processes, and intelligent automation into one synchronised operational flow.\n\nFor direct contact, use the Contact page — we respond within 24 hours.","Is there a specific operational challenge I can help clarify?"],
};
function addMsg(t,tp){
  const m=document.getElementById('chatMsgs');
  const d=document.createElement('div');d.className='msg '+tp;
  d.innerHTML=t.replace(/\n/g,'<br>')+'<div class="msg-t">'+T()+'</div>';
  m.appendChild(d);m.scrollTop=m.scrollHeight;
}
function qS(q){document.getElementById('chatQ').style.display='none';addMsg(q,'usr');procBot(q);}
function sendChat(){const i=document.getElementById('chatInput'),v=i.value.trim();if(!v)return;i.value='';addMsg(v,'usr');procBot(v);}
function procBot(m){
  const ty=document.getElementById('chatTyp');ty.classList.add('show');
  const ml=m.toLowerCase();
  let k='default';
  if(ml.includes('service')||ml.includes('offer')||ml.includes('what do'))k='services';
  else if(ml.includes('process')||ml.includes('how')||ml.includes('method')||ml.includes('work'))k='process';
  else if(ml.includes('fast')||ml.includes('time')||ml.includes('48')||ml.includes('14')||ml.includes('deliver'))k='timeline';
  else if(ml.includes('case')||ml.includes('example')||ml.includes('result')||ml.includes('client'))k='cases';
  else if(ml.includes('start')||ml.includes('begin')||ml.includes('ready')||ml.includes('contact'))k='started';
  let d=1000;BOT[k].forEach((r,i)=>{setTimeout(()=>{if(i===0)ty.classList.remove('show');addMsg(r,'bot');},d);d+=850;});
}

/* INIT */
gP('home');

// ── FIND MY PACKAGES MODAL ──
function openFindPkg() {
  document.getElementById('fpmOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeFindPkg() {
  document.getElementById('fpmOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function closeFindPkgOverlay(e) {
  if (e.target === document.getElementById('fpmOverlay')) closeFindPkg();
}
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape') closeFindPkg();
});


/* ══ AUTOMATION PACKAGES JS ══ */

const WA = 'https://wa.me/27660018931?text=';
const waIco = '<svg><use href="#wa-icon"/></svg>';

const CAT = [
  {
    line:'ba', name:'Business Automation', ico:'🤖',
    sub:'AI agents that answer customers, sell products and run admin — on WhatsApp, web and voice. 24/7, no extra staff.',
    cards:[
      {
        id:'BA-01', tier:'starter', tierLabel:'🥉 Starter Tier', extra:'👉 High-volume seller',
        title:'Smart', titleEm:'Reception',
        sub:'Your business answers every customer — 24/7, automatically',
        setup:'R1,499 – R2,999', monthly:'R299 – R599',
        agents:{count:'1', title:'Customer Service AI Agent', sub:'Website chatbot OR WhatsApp basic integration', items:[]},
        features:['FAQ training — hours, location, policies','Basic product Q&A','Website chatbot OR WhatsApp integration'],
        outcomes:['24/7 responses — no missed customers','Reduced interruptions to staff'],
        whatItDoes:'Your business <em>answers every customer automatically</em> — even at 2am, on weekends, and while your staff are busy with other work.',
        bestFor:'🏪 Township shops · Local retailers · Small businesses drowning in WhatsApp messages',
        ctaLabel:'Get Started · From R1,499',
        tags:['1 AI Agent','Web chatbot','WhatsApp basic']
      },
      {
        id:'BA-02', tier:'growth', tierLabel:'🥈 Growth Tier', extra:'🔥 Most profitable tier',
        title:'Sales Assistant', titleEm:'System',
        sub:'Automated selling, upselling & lead generation — 24/7',
        setup:'R4,999 – R9,999', monthly:'R999 – R1,999',
        agents:{count:'2–3', title:'AI Agents Working For You', sub:'WhatsApp integration 🔥 recommended for SA',
          items:['Customer Service Agent','Sales Assistant Agent','Basic Orders Agent']},
        features:['WhatsApp integration (🔥 SA recommended)','Product catalog training','Lead capture — name, number, interest','Automated upselling + cross-selling'],
        outcomes:['Automated selling — no human needed','Upselling + cross-selling on autopilot','Lead generation pipeline running 24/7'],
        whatItDoes:'Your AI agents <em>qualify leads, sell products and follow up with customers</em> — all on WhatsApp, all without a human lifting a finger.',
        bestFor:'🛒 Retailers · 💊 Pharmacies · 🏥 Clinics · Any business getting 20+ WhatsApp enquiries daily',
        ctaLabel:'Deploy My Sales System · From R4,999',
        tags:['2–3 AI Agents','Sales + Leads','WhatsApp 🔥']
      },
      {
        id:'BA-03', tier:'pro', tierLabel:'🥇 Pro Tier', extra:'🏆 For serious businesses',
        title:'Full Digital', titleEm:'Workforce',
        sub:'Near-full automation — scale without hiring more staff',
        setup:'R14,999 – R29,999', monthly:'R2,999 – R6,999',
        agents:{count:'5–7', title:'AI Agents — Full Digital Team', sub:'Full WhatsApp + CRM + Smart Workflows',
          items:['Customer Service','Sales Agent','Inventory Agent','Orders Agent','Marketing Agent','Admin Agent']},
        features:['Full WhatsApp automation','CRM / Google Sheets integration','Smart workflows — booking, order tracking, stock alerts','Scalable system — grows with your business'],
        outcomes:['Near full automation of routine tasks','Data-driven operations & real-time reporting','Scale without hiring more staff'],
        whatItDoes:'A full AI team <em>runs your customer service, sales, inventory, orders and admin</em> — simultaneously, 24/7, without adding headcount.',
        bestFor:"🏢 Multi-location businesses · Franchises · High-volume operations that can't afford to miss a single lead",
        ctaLabel:'Deploy My Digital Workforce · From R14,999',
        tags:['5–7 AI Agents','CRM integration','Smart workflows']
      },
      {
        id:'BA-04', tier:'addons',
        title:'Automation', titleEm:'Add-Ons',
        sub:'Stack onto any tier — this is where your income compounds',
        tierLabel:'⚙️ Add-Ons · Upsell Like a Pro',
        addons:[
          {icon:'📲', name:'WhatsApp Automation Setup', badge:'🔥 SA Essential', prices:['R1,500–R3,500 once-off','R300–R800/mo API'],
           desc:'Full WhatsApp Business API. <strong>Non-negotiable for the SA market</strong> — this is where your clients\' customers already are.'},
          {icon:'🛒', name:'Product Catalog Integration', badge:'Scalable', prices:['R1,000–R5,000 once-off'],
           desc:'Train agents on your full product range. <strong>Price depends on number of products.</strong> More products = bigger deal for you.'},
          {icon:'🔁', name:'Monthly Optimization', badge:'⭐ Key', prices:['R500–R2,000/month'],
           desc:'Improving responses, adding new products, fixing gaps. <strong>This is your recurring revenue engine — never skip it.</strong>'},
          {icon:'📣', name:'Marketing Automation', badge:'High Value', prices:['R1,500–R4,000/month'],
           desc:'Promotions, bulk WhatsApp campaigns & social content. <strong>Turns your automation into a marketing machine.</strong>'}
        ],
        goldmine:'10 clients × R2,200/month recurring = <em>R22,000/month — without building new sites constantly.</em>',
        goldLabel:'💰 The Real Game',
        ctaLabel:'Discuss Automation Add-Ons'
      }
    ]
  },
  {
    line:'app2', name:'App Development', ico:'📱',
    sub:"Custom mobile and web apps — from branded customer apps to full operations platforms. Your business in your customers' pockets.",
    cards:[
      {
        id:'APP-01', tier:'starter', tierLabel:'🥉 Starter App',
        title:'Smart', titleEm:'Business App',
        sub:"Your business in your customer's pocket",
        setup:'R4,999 – R9,999', monthly:'R299 – R799',
        agents:{count:'1', title:'Simple mobile-friendly web app (PWA)', sub:'Feels like a native app — no Play Store needed',
          items:['Contact / enquiry form','WhatsApp integration','Service / product display','Booking or request form']},
        features:['Clean UI — feels like a native app on phone','Basic automation (form → WhatsApp / email)','Fast loading & lightweight','Hosting + monthly maintenance included'],
        whatItDoes:'Gives your business a <em>professional mobile presence</em> — customers tap, enquire, book and contact you without calling or visiting.',
        bestFor:'🏪 Small businesses · Local shops · Service providers needing a professional mobile-first presence',
        ctaLabel:'Build My App · From R4,999',
        tags:['Branded PWA','Forms','WhatsApp link']
      },
      {
        id:'APP-02', tier:'growth', tierLabel:'🥈 Growth App',
        title:'Automation', titleEm:'App',
        sub:'Automate your business operations and capture every customer',
        setup:'R14,999 – R39,999', monthly:'R999 – R2,999',
        agents:{count:'∞', title:'Full business app — web + mobile', sub:'Everything your team and customers need in one place', items:[]},
        features:['User accounts / login system','Product or service catalog','Booking system or order system','AI chatbot integration 🤖','Push notifications (web / app)','Dashboard for business owner'],
        whatItDoes:'A proper business app that <em>captures enquiries, takes orders and tracks customers</em> — while giving you a dashboard to run it all.',
        bestFor:'Businesses getting 20+ daily enquiries that need a system — not just a website',
        ctaLabel:'Build My Automation App · From R14,999',
        tags:['Login + Orders','AI chatbot','Owner dashboard']
      },
      {
        id:'APP-03', tier:'pro', tierLabel:'🥇 Pro App', extra:'🏆 Flagship build',
        title:'Digital Operations', titleEm:'Platform',
        sub:'Run your entire business from one intelligent system',
        setup:'R49,999 – R150,000+', monthly:'R3,999 – R9,999',
        agents:{count:'∞', title:'Full operations platform', sub:'Multi-user, multi-department, proprietary to your business', items:[]},
        features:['Multi-user roles (admin, staff, manager)','Full AI agent system — multi-department 🤖','Inventory management','CRM — full customer tracking','Advanced analytics dashboard','Payment gateway integration','API integrations (POS, delivery, etc.)'],
        whatItDoes:'Your own <em>proprietary operating system</em> — replacing the patchwork of tools, spreadsheets and apps most businesses are duct-taped together with.',
        bestFor:'🏢 Multi-location businesses · Franchises · Serious scaling companies wanting full operational control',
        ctaLabel:'Build My Platform · From R49,999',
        tags:['Multi-user','AI agents','Payments + APIs']
      },
      {
        id:'APP-04', tier:'addons',
        title:'App', titleEm:'Add-Ons',
        sub:'Stack onto any app tier — maximise value per client',
        tierLabel:'⚙️ Add-Ons · Stack Your Income',
        addons:[
          {icon:'🤖', name:'AI Agent Integration', badge:'High Value', prices:['R2,000–R10,000 setup','R500–R2,000/mo'],
           desc:'Embed a conversational AI agent into any app tier. <strong>Instantly 10× the perceived value</strong> and opens monthly recurring revenue.'},
          {icon:'💳', name:'Payment Integration', badge:'Essential', prices:['R1,500–R5,000 once-off'],
           desc:'Payfast, Yoco, Stripe, or card gateway wiring. <strong>Non-negotiable</strong> the moment the app needs to take money.'},
          {icon:'📲', name:'Native App · Play Store', badge:'Premium', prices:['R5,000–R15,000 once-off'],
           desc:'Wrap and list the app on the Google Play Store. <strong>Real "app" status</strong> for serious brands.'},
          {icon:'🔁', name:'Monthly Optimization & Support', badge:'⭐ Recurring', prices:['R500–R3,000/month'],
           desc:'Bug fixes, small features, hosting, SSL, updates. <strong>This is the retainer that turns one-off clients into monthly revenue.</strong>'}
        ],
        goldmine:'Apps need payments, updates and analytics every month — clients pay <em>for the evolution, not the delivery</em>.',
        goldLabel:'💰 Why This Matters',
        ctaLabel:'Discuss App Add-Ons'
      }
    ]
  },
  {
    line:'wf2', name:'Workflow Systems', ico:'🔧',
    sub:'Automate the repetitive back-office work — invoices, reports, approvals, data syncing. Fix the process, save the hours.',
    cards:[
      {
        id:'WF-01', tier:'starter', tierLabel:'🥉 Starter Workflow',
        title:'Process', titleEm:'Fixer',
        sub:'Remove your daily repetitive admin tasks — once and forever',
        setup:'R3,999 – R9,999', monthly:'R499 – R999',
        agents:{count:'1–2', title:'Core workflows automated', sub:'Targeted, clean, no bloat — solves real daily pain points',
          items:['Lead → WhatsApp response','Booking → confirmation','Form → Sheet + email']},
        features:['Zapier or Make.com','Google Sheets / Airtable','WhatsApp triggers','Email automation'],
        whatItDoes:'Automates your <em>lead responses, booking confirmations and form submissions</em> — so nothing gets missed and no one has to do it manually.',
        bestFor:'🏪 Small businesses · Solo entrepreneurs · Admin-heavy shops drowning in manual tasks',
        ctaLabel:'Fix My Processes · From R3,999',
        tags:['1–2 workflows','Sheets / Make','WhatsApp triggers']
      },
      {
        id:'WF-02', tier:'growth', tierLabel:'🥈 Growth Workflow',
        title:'Business Automation', titleEm:'Engine',
        sub:"Your business runs even when you're offline",
        setup:'R14,999 – R39,999', monthly:'R1,499 – R3,999',
        agents:{count:'5–10', title:'Connected workflow stack', sub:'Multi-step, multi-tool, cross-department automations', items:[]},
        features:['Multi-step automations','Conditional logic — if this → then that','CRM or database integration','AI agent integration 🤖'],
        whatItDoes:'Your business <em>runs itself across departments</em> — sales, ops, admin all talking to each other automatically, even at 3am.',
        bestFor:'🛒 Retail stores · 🏥 Clinics · 📈 Service businesses scaling up & needing cross-department automation',
        ctaLabel:'Install My Automation Engine · From R14,999',
        tags:['5–10 workflows','Multi-tool','AI logic']
      },
      {
        id:'WF-03', tier:'pro', tierLabel:'🥇 Pro Workflow', extra:'🏆 Flagship',
        title:'Full Operations', titleEm:'Automation',
        sub:'We automate how your entire business operates',
        setup:'R49,999 – R120,000+', monthly:'R3,999 – R9,999',
        agents:{count:'∞', title:'Enterprise-grade automation suite', sub:'Every repeatable operation — handled', items:[]},
        features:['Advanced automation logic','Multi-department integration','Real-time dashboards','AI decision-making workflows 🤖','API integrations (POS, payments, delivery)'],
        whatItDoes:'We <em>rebuild how your operation runs</em> — eliminating admin headcount and giving leadership real-time visibility across the whole business.',
        bestFor:'🏢 Multi-location businesses · Franchises · High-volume operations needing full-scale automation',
        ctaLabel:'Automate My Operation · From R49,999',
        tags:['Enterprise','Real-time','AI decisions']
      },
      {
        id:'WF-04', tier:'addons',
        title:'Workflow', titleEm:'Add-Ons',
        sub:"Stack onto any tier — don't skip these",
        tierLabel:'🔌 Add-Ons · High Profit',
        addons:[
          {icon:'🤖', name:'AI Workflow Intelligence', badge:'Smart', prices:['R3,000–R15,000 setup','R1,000–R3,000/mo'],
           desc:'Layer AI decision-making on top of workflows. <strong>Turns automation into a thinking system.</strong>'},
          {icon:'📲', name:'WhatsApp Automation Layer', badge:'🔥 SA Critical', prices:['R2,000–R5,000 setup','R500–R1,500/mo'],
           desc:'Route triggers and outputs through WhatsApp. <strong>Essential for any SA client.</strong>'},
          {icon:'📊', name:'Dashboard & Reporting', badge:'Visibility', prices:['R2,000–R10,000 setup','R500–R2,000/mo'],
           desc:'Real-time dashboards that show what the automations are actually doing. <strong>Owners love this.</strong>'},
          {icon:'🔁', name:'Ongoing Optimization', badge:'⭐ Recurring', prices:['R1,000–R4,000/month'],
           desc:'Monthly tuning, new triggers, broken-flow fixes. <strong>Every client needs this — make it non-negotiable.</strong>'}
        ],
        goldmine:'Each add-on <em>extends what the system can do</em> — more intelligence, more reach, more visibility, and continuous improvement that keeps the system growing with the business.',
        goldLabel:'💰 Why They Stack',
        ctaLabel:'Discuss Workflow Add-Ons'
      }
    ]
  },
  {
    line:'wfs', name:'Workflow Software', ico:'💻',
    sub:'Custom-built software products — lightweight tracking tools through to full operations OS. Proprietary systems your business owns.',
    cards:[
      {
        id:'WFS-01', tier:'starter', tierLabel:'🥉 Starter System',
        title:'Workflow', titleEm:'Lite',
        sub:'One place to track and manage your daily business activity',
        setup:'R6,999 – R14,999', monthly:'R999 – R1,999',
        agents:{count:'1', title:'Lightweight web-based system', sub:'Built with Base44 / custom code — fast, clean, yours',
          items:['1–3 workflows in the system','Clients / enquiries / orders DB','Clean submissions & leads view']},
        features:['WhatsApp / email triggers','Status tracking — New / In Progress / Done','Clean web interface accessible from any device'],
        whatItDoes:'Replaces messy <em>spreadsheets and chat threads</em> with one real system — so the owner finally sees what is happening in the business at a glance.',
        bestFor:'🏪 Small businesses · Retail shops starting digital · Admin-heavy operations needing structure',
        ctaLabel:'Build My System · From R6,999',
        tags:['Web dashboard','1–3 workflows','Base44']
      },
      {
        id:'WFS-02', tier:'growth', tierLabel:'🥈 Growth System',
        title:'Workflow', titleEm:'Manager',
        sub:'Control how work flows through your business from start to finish',
        setup:'R19,999 – R49,999', monthly:'R1,999 – R4,999',
        agents:{count:'4–8', title:'Connected multi-module system', sub:'CRM-style tracking across real business processes',
          items:['4–8 connected workflows','CRM-style data tracking','Multi-stage pipelines']},
        features:['Role-based access — admin / staff','AI agent integration 🤖','Basic analytics & reporting','WhatsApp automation layer'],
        whatItDoes:'You <em>control the full flow</em> — from lead capture to delivery — inside one custom system built for how YOUR business actually works.',
        bestFor:'🛒 Growing retail stores · 👁 Clinics / Optometry practices · 📈 Service businesses needing full process control',
        ctaLabel:'Install Workflow Manager · From R19,999',
        tags:['Multi-module','Role-based','AI + WhatsApp']
      },
      {
        id:'WFS-03', tier:'pro', tierLabel:'🥇 Pro System', extra:'🏆 Flagship',
        title:'Operations', titleEm:'OS',
        sub:'Your entire business runs from one system',
        setup:'R59,999 – R180,000+', monthly:'R4,999 – R12,000',
        agents:{count:'∞', title:'Proprietary operations OS', sub:'Bespoke modules, AI-enhanced, single source of truth', items:[]},
        features:['Custom modules built to your workflow','Full AI layer across every operation','Proprietary to your business — yours forever','Real-time reporting across all departments'],
        whatItDoes:'We build you a <em>proprietary operations OS</em> — your own software, your own logic, your own data, running your entire business from one place.',
        bestFor:'🏢 Multi-location businesses · Franchises · High-volume operations that need a single source of truth',
        ctaLabel:'Build My Operations OS · From R59,999',
        tags:['Custom OS','AI-enhanced','Bespoke']
      },
      {
        id:'WFS-04', tier:'addons',
        title:'Software', titleEm:'Add-Ons',
        sub:'Stack onto any tier — this is where income compounds',
        tierLabel:'🔌 Smart Add-Ons · Where You Print Money',
        addons:[
          {icon:'🤖', name:'AI Workflow Intelligence Layer', badge:'Smart', prices:['R5,000–R20,000 setup','R1,500–R4,000/mo'],
           desc:'Adds intelligent decisioning, predictions and auto-routing. <strong>Turns software into a thinking system.</strong>'},
          {icon:'📲', name:'WhatsApp Command Center', badge:'🔥 SA Critical', prices:['R3,000–R8,000 setup','R800–R2,000/mo'],
           desc:"Run the software's actions from WhatsApp — approvals, updates, alerts. <strong>Critical for SA clients.</strong>"},
          {icon:'📊', name:'Advanced Analytics Dashboard', badge:'Visibility', prices:['R3,000–R15,000 setup','R1,000–R3,000/mo'],
           desc:'Custom executive dashboards, KPIs, forecasting. <strong>What owners will happily pay for every month.</strong>'},
          {icon:'🔁', name:'Continuous Optimization', badge:'⭐ Critical', prices:['R1,500–R5,000/month'],
           desc:'New features, bug fixes, small modules, hosting. <strong>Non-negotiable retainer — never sell software without this.</strong>'}
        ],
        goldmine:'Every growing client needs <em>more automation every month.</em> One client on optimization = R1,500–R5,000/month — forever.',
        goldLabel:'💰 Print Money',
        ctaLabel:'Discuss Software Add-Ons'
      }
    ]
  }
];

/* Render catalogue cards */
const catalogueEl = document.getElementById('catalogue');
let catHtml = '';
CAT.forEach((section, sIdx) => {
  catHtml += '<section class="cat" data-line="'+section.line+'" id="'+section.line+'">'
    + '<div class="cat-head">'
    + '<div class="cat-ico">'+section.ico+'</div>'
    + '<div class="cat-meta"><h2 class="cat-name">'+section.name+'</h2><p class="cat-sub">'+section.sub+'</p></div>'
    + '<div class="cat-index">0'+(sIdx+1)+' / 04</div>'
    + '</div><div class="grid">';

  section.cards.forEach((c, i) => {
    const tierBadge = '<span class="mc-tier">'+c.tierLabel+(c.extra?' '+c.extra:'')+'</span>';
    const code = '<span class="mc-code">'+c.id+'</span>';

    if (c.tier === 'addons') {
      const aoList = c.addons.slice(0,4).map(a => {
        const firstPrice = a.prices[0];
        const priceShort = firstPrice.split(' ')[0] + (firstPrice.includes('/mo')||firstPrice.includes('month') ? '/mo' : '');
        return '<div class="ao"><span class="ao-name">'+a.icon+' '+a.name+'</span><span class="ao-price">'+priceShort+'</span></div>';
      }).join('');
      const waMsg = encodeURIComponent("Hi, I'd like to discuss "+section.name+' Add-Ons');
      catHtml += '<article class="mc t-addons">'
        + '<div class="mc-head">'+tierBadge+code+'</div>'
        + '<h3 class="mc-title">'+c.title+'<em>'+c.titleEm+'</em></h3>'
        + '<p class="mc-sub">'+c.sub+'</p>'
        + '<div class="addons-list">'+aoList+'</div>'
        + '<p class="mc-best"><strong>'+c.goldLabel+'</strong>'+c.goldmine.replace(/<\/?em>/g,'')+'</p>'
        + '<div class="mc-cta">'
        + '<button class="mc-btn view" data-open="'+section.line+'-'+i+'">View Full Card →</button>'
        + '<a href="'+WA+waMsg+'" class="mc-btn wa" target="_blank" aria-label="WhatsApp">'+waIco+'</a>'
        + '</div></article>';
    } else {
      const tagsHtml = (c.tags||[]).map(t=>'<span class="tag">'+t+'</span>').join('');
      const waMsg = encodeURIComponent("Hi, I'm interested in "+c.title+' '+c.titleEm+' - '+section.name);
      catHtml += '<article class="mc t-'+c.tier+'">'
        + '<div class="mc-head">'+tierBadge+code+'</div>'
        + '<h3 class="mc-title">'+c.title+'<em>'+c.titleEm+'</em></h3>'
        + '<p class="mc-sub">'+c.sub+'</p>'
        + '<div class="mc-price">'
        + '<div class="pr-row"><span class="pr-lbl">Setup</span><span class="pr-val setup">'+c.setup+'</span></div>'
        + '<div class="pr-row"><span class="pr-lbl">Monthly</span><span class="pr-val monthly">'+c.monthly+'</span></div>'
        + '</div>'
        + '<div class="mc-agents">'+tagsHtml+'</div>'
        + '<p class="mc-best"><strong>Best for</strong>'+c.bestFor+'</p>'
        + '<div class="mc-cta">'
        + '<button class="mc-btn view" data-open="'+section.line+'-'+i+'">View Full Card →</button>'
        + '<a href="'+WA+waMsg+'" class="mc-btn wa" target="_blank" aria-label="WhatsApp">'+waIco+'</a>'
        + '</div></article>';
    }
  });

  catHtml += '</div></section>';
});
catalogueEl.innerHTML = catHtml;

/* Modal */
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');

function renderModal(c, section) {
  const waText = c.tier === 'addons'
    ? "Hi, I'd like to discuss "+section.name+' Add-Ons'
    : "Hi, I'm interested in the "+c.title+' '+c.titleEm+' — '+section.name+' ('+c.setup+' setup)';
  const waLink = WA + encodeURIComponent(waText);

  let body = '';
  if (c.tier === 'addons') {
    const addonsHtml = c.addons.map(a =>
      '<div class="m-addon">'
      + '<div class="m-addon-top"><div class="m-addon-name">'+a.icon+' '+a.name+'</div><span class="m-addon-badge">'+a.badge+'</span></div>'
      + '<div class="m-addon-prices">'+a.prices.map(p=>'<span class="m-addon-price">'+p+'</span>').join('')+'</div>'
      + '<p class="m-addon-desc">'+a.desc+'</p>'
      + '</div>'
    ).join('');
    body = '<p class="m-slabel">Available Add-Ons</p>'
      + '<div class="m-addons">'+addonsHtml+'</div>'
      + '<div class="m-goldmine" style="margin-top:18px"><p class="m-gm-label">'+c.goldLabel+'</p><p class="m-gm-text">'+c.goldmine+'</p></div>';
  } else {
    const agItemsHtml = c.agents.items.length
      ? '<div class="m-ag-grid">'+c.agents.items.map(it=>'<div class="m-ag-item">'+it+'</div>').join('')+'</div>'
      : '';
    const outcomesHtml = c.outcomes
      ? '<p class="m-slabel">What Your Client Gets</p><div class="m-outcomes">'+c.outcomes.map(o=>'<div class="m-oc">'+o+'</div>').join('')+'</div>'
      : '';
    body = '<p class="m-slabel">'+(c.tier==='starter'?'AI Agent Deployed':"What's Deployed")+'</p>'
      + '<div class="m-agent-block">'
      + '<div class="m-ag-top"><div class="m-ag-num">'+c.agents.count+'</div>'
      + '<div class="m-ag-info"><div class="m-ag-title">'+c.agents.title+'</div><div class="m-ag-sub">'+c.agents.sub+'</div></div></div>'
      + agItemsHtml + '</div>'
      + "<p class=\"m-slabel\">What's Included</p>"
      + '<ul class="m-feat">'+c.features.map(f=>'<li><span class="m-dot"></span>'+f+'</li>').join('')+'</ul>'
      + outcomesHtml
      + '<p class="m-slabel">What This Does</p>'
      + '<div class="m-value"><p class="m-vb-label">⚡ Value Delivered</p><p class="m-vb-say">'+c.whatItDoes+'</p></div>'
      + '<p class="m-slabel">Best For</p>'
      + '<div class="m-best"><p class="m-bb-text">'+c.bestFor+'</p></div>';
  }

  const priceBlock = c.tier === 'addons' ? '' :
    '<div class="m-price-row">'
    + '<div class="m-pp s"><span class="a">'+c.setup+'</span><span class="n">setup</span></div>'
    + '<span class="m-sep">+</span>'
    + '<div class="m-pp m"><span class="a">'+c.monthly+'</span><span class="n">/ month</span></div>'
    + '</div>';

  modalContent.innerHTML =
    '<div class="m-hdr">'
    + '<div class="m-orb"></div>'
    + '<div class="m-logo-row"><svg><use href="#brand-icon"/></svg>'
    + '<div><div class="m-lname">AutoSage <em>AI</em></div><div class="m-lsub">'+section.name+'</div></div></div>'
    + '<div class="m-badge-row"><span class="m-tier-badge">'+c.tierLabel+'</span>'
    + (c.extra ? '<span class="m-vol-tag">'+c.extra+'</span>' : '') + '</div>'
    + '<h2 class="m-title">'+c.title+'<em>'+c.titleEm+'</em></h2>'
    + '<p class="m-sub">'+c.sub+'</p>'
    + priceBlock
    + '</div>'
    + '<div class="m-body">'+body
    + '<div class="m-divider"></div>'
    + '<div class="m-cta">'
    + '<a href="'+waLink+'" class="m-btn primary" target="_blank">'+c.ctaLabel+'</a>'
    + '<a href="'+waLink+'" class="m-btn wa" target="_blank">'+waIco+' WhatsApp 066 001 8931</a>'
    + '<p class="m-site">www.autosageai.co.za</p>'
    + '</div></div>';

  modal.className = 'modal open t-' + c.tier;
  document.body.classList.add('modal-open');
  modal.setAttribute('aria-hidden','false');
  modal.scrollTop = 0;
}

function closeModal() {
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
  modal.setAttribute('aria-hidden','true');
}

document.addEventListener('click', e => {
  const openBtn = e.target.closest('[data-open]');
  if (openBtn) {
    const parts = openBtn.dataset.open.split('-');
    const lineKey = parts[0], idx = parseInt(parts[1],10);
    const section = CAT.find(s => s.line === lineKey);
    if (section) renderModal(section.cards[idx], section);
    return;
  }
  if (e.target.closest('[data-close]')) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* Filter */
const fbtns = document.querySelectorAll('.fbtn');
fbtns.forEach(btn => {
  btn.addEventListener('click', () => {
    fbtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.cat').forEach(cat => {
      if (f === 'all' || cat.dataset.line === f) {
        cat.classList.remove('hidden');
        if (f !== 'all') setTimeout(() => cat.scrollIntoView({behavior:'smooth',block:'start'}), 50);
      } else {
        cat.classList.add('hidden');
      }
    });
  });
});


/* ══ MARKETING PACKAGES JS ══ */

var goal='',biz='',rcat='all';

function filterCat(cat,btnEl){
  var i,el,oc;
  var chips=document.querySelectorAll('.cat-chip,.fb-btn');
  for(i=0;i<chips.length;i++){chips[i].classList.remove('active');}
  var allChips=document.querySelectorAll('.cat-chip');
  for(i=0;i<allChips.length;i++){
    oc=allChips[i].getAttribute('onclick')||'';
    if(oc.indexOf("'"+cat+"'")!==-1){allChips[i].classList.add('active');}
  }
  var allFb=document.querySelectorAll('.fb-btn');
  for(i=0;i<allFb.length;i++){
    oc=allFb[i].getAttribute('onclick')||'';
    if(oc.indexOf("'"+cat+"'")!==-1){allFb[i].classList.add('active');}
  }
  var sections=document.querySelectorAll('.cat-section');
  for(i=0;i<sections.length;i++){
    var isHidden=sections[i].className.indexOf('cat-hidden-default')!==-1;
    if(cat==='all'){
      if(!isHidden){sections[i].style.display='block';}
      else{sections[i].style.display='none';}
    }else if(sections[i].getAttribute('data-cat')===cat){
      sections[i].style.display='block';
    }else{
      sections[i].style.display='none';
    }
  }
  var scrollTarget = document.getElementById('cat-' + cat !== null && document.getElementById('cat-' + cat) ? 'cat-' + cat : 'pkg-content');
  var targetEl = null;
  if(cat !== 'all') {
    targetEl = document.getElementById('cat-' + cat);
  }
  if(targetEl) {
    window.scrollTo(0, targetEl.offsetTop - 70);
  } else {
    window.scrollTo(0, document.getElementById('pkg-content') ? document.getElementById('pkg-content').offsetTop - 70 : 200);
  }
  initFade();
}

function openQuiz(){resetQuiz();document.getElementById('quizOverlay').className='quiz-bg open';document.body.style.overflow='hidden';}
function openQuizWithGoal(g){openQuiz();goal=g;}
function closeQuiz(){document.getElementById('quizOverlay').className='quiz-bg';document.body.style.overflow='';}
function closeQuizOutside(e){if(e.target===document.getElementById('quizOverlay'))closeQuiz();}
function resetQuiz(){goal='';biz='';showStep(1);var dots=document.querySelectorAll('.qp-dot');var i;for(i=0;i<dots.length;i++){dots[i].className=i===0?'qp-dot done':'qp-dot';}}

function showStep(n){
  var steps=document.querySelectorAll('.quiz-step');
  var i;
  for(i=0;i<steps.length;i++){steps[i].className='quiz-step';}
  var el=document.getElementById(n==='result'?'q-result':'q'+n);
  if(el)el.className='quiz-step on';
  var dots=document.querySelectorAll('.qp-dot');
  if(n!=='result'){for(i=0;i<dots.length;i++){dots[i].className=i<n?'qp-dot done':'qp-dot';}}
  else{for(i=0;i<dots.length;i++){dots[i].className='qp-dot done';}}
}
function nextStep(step,value){if(step===2)goal=value;if(step===3)biz=value;showStep(step);}
function backStep(step){showStep(step);}

var RESULTS={
  'get-online':{'starting':{'budget-low':{icon:'🌐',title:'Starter Website — R499',desc:'3-page website to get you online fast.',cat:'web',wa:'Hi! I need the Starter Website R499'},'budget-mid':{icon:'🌐',title:'Growth Website — R999',desc:'5-page site with lead capture.',cat:'web',wa:'Hi! I need the Growth Website R999'},'budget-high':{icon:'🌐',title:'Pro Website — R1,699',desc:'7-page full system with SEO.',cat:'web',wa:'Hi! I need the Pro Website R1699'}},'growing':{'budget-low':{icon:'🌐',title:'Growth Website — R999',desc:'5 pages, enhanced layout, lead capture.',cat:'web',wa:'Hi! I need the Growth Website R999'},'budget-mid':{icon:'🌐',title:'Pro Website — R1,699',desc:'Full 7-page system with advanced SEO.',cat:'web',wa:'Hi! I need the Pro Website R1699'},'budget-high':{icon:'📈',title:'Pro Website + Growth SEO',desc:'Best combo: Pro site and SEO plan.',cat:'seo',wa:'Hi! I want Pro Website and Growth SEO'}},'scaling':{'budget-low':{icon:'🌐',title:'Pro Website — R1,699',desc:'Complete 7-page system with SEO.',cat:'web',wa:'Hi! I need the Pro Website R1699'},'budget-mid':{icon:'📈',title:'Pro Site + SEO Domination',desc:'The full stack. Own your market.',cat:'seo',wa:'Hi! I want Pro Website and SEO Domination'},'budget-high':{icon:'📈',title:'Pro Site + SEO Domination',desc:'Maximum digital presence.',cat:'seo',wa:'Hi! I want Pro Website and SEO Domination combo'}}},
  'more-leads':{'starting':{'budget-low':{icon:'📍',title:'GMB Growth — R450',desc:'More local calls from Google Maps.',cat:'gmb',wa:'Hi! I need GMB Growth R450'},'budget-mid':{icon:'📈',title:'Starter SEO — R399/mo',desc:'Start ranking and grow leads.',cat:'seo',wa:'Hi! I need Starter SEO R399/month'},'budget-high':{icon:'📈',title:'Growth SEO — R799/mo',desc:'15-25 keywords, blogs, backlinks.',cat:'seo',wa:'Hi! I need Growth SEO R799/month'}},'growing':{'budget-low':{icon:'📈',title:'Growth SEO — R799/mo',desc:'Consistent lead growth every month.',cat:'seo',wa:'Hi! I need Growth SEO R799/month'},'budget-mid':{icon:'📍',title:'GMB Domination — R750',desc:'Rank top 3 on Maps, daily leads.',cat:'gmb',wa:'Hi! I need GMB Domination R750'},'budget-high':{icon:'📈',title:'SEO Domination — R1,299/mo',desc:'30+ keywords, backlinks, tracking.',cat:'seo',wa:'Hi! I need SEO Domination R1299/month'}},'scaling':{'budget-low':{icon:'📣',title:'Starter Google Ads — R350',desc:'Start getting leads from ads now.',cat:'gads',wa:'Hi! I need Starter Google Ads R350'},'budget-mid':{icon:'📣',title:'Pro Ads System — R650',desc:'Multiple campaigns, retargeting, weekly optimization.',cat:'gads',wa:'Hi! I need Pro Google Ads R650'},'budget-high':{icon:'🔥',title:'Power Bundle',desc:'Paid + organic + maps domination.',cat:'bundles',wa:'Hi! I want the Power Bundle'}}},
  'sell-online':{'starting':{'budget-low':{icon:'🛒',title:'Starter Store — R999',desc:'3-page store with WhatsApp orders.',cat:'ecom',wa:'Hi! I need the Starter Store R999'},'budget-mid':{icon:'🛒',title:'Business Store — R1,999',desc:'5-page store with categories.',cat:'ecom',wa:'Hi! I need the Business Store R1999'},'budget-high':{icon:'🛒',title:'Business Store — R1,999',desc:'Full e-commerce to scale from.',cat:'ecom',wa:'Hi! I need the Business Store R1999'}},'growing':{'budget-low':{icon:'🛒',title:'Business Store — R1,999',desc:'Multi-product store, better conversion.',cat:'ecom',wa:'Hi! I need the Business Store R1999'},'budget-mid':{icon:'🛒',title:'Business Store + SEO',desc:'Store so customers find your products.',cat:'ecom',wa:'Hi! I want Business Store and Starter SEO'},'budget-high':{icon:'🛒',title:'Advanced Store — R8,999',desc:'Full 10-page system with analytics.',cat:'ecom',wa:'Hi! I need the Advanced Store R8999'}},'scaling':{'budget-low':{icon:'🛒',title:'Advanced Store — R8,999',desc:'10 pages, payment gateway, scalable.',cat:'ecom',wa:'Hi! I need the Advanced Store R8999'},'budget-mid':{icon:'🛒',title:'Advanced Store — R8,999',desc:'Everything for a serious online brand.',cat:'ecom',wa:'Hi! I need the Advanced Store R8999'},'budget-high':{icon:'🛒',title:'Advanced Store + SEO Domination',desc:'Best store plus top-tier traffic.',cat:'ecom',wa:'Hi! I want Advanced Store and SEO Domination'}}},
  'grow-brand':{'starting':{'budget-low':{icon:'📲',title:'Starter Content — R350/mo',desc:'8 branded posts per month.',cat:'smm',wa:'Hi! I need Starter Content Plan R350/month'},'budget-mid':{icon:'📲',title:'Growth Engagement — R750/mo',desc:'16 posts, Facebook and Instagram.',cat:'smm',wa:'Hi! I need Growth Engagement R750/month'},'budget-high':{icon:'🎨',title:'Brand Builder — R699/mo',desc:'Custom brand style and social.',cat:'brand',wa:'Hi! I need Business Brand Builder R699/month'}},'growing':{'budget-low':{icon:'🎨',title:'Starter Brand Kit — R399/mo',desc:'Look consistent and professional.',cat:'brand',wa:'Hi! I need Starter Brand Kit R399/month'},'budget-mid':{icon:'📲',title:'Growth Engagement — R750/mo',desc:'Turn pages into customer machine.',cat:'smm',wa:'Hi! I need Growth Engagement R750/month'},'budget-high':{icon:'🎨',title:'Brand Builder — R699/mo',desc:'Custom brand style system.',cat:'brand',wa:'Hi! I need Business Brand Builder R699/month'}},'scaling':{'budget-low':{icon:'🎨',title:'Brand Builder — R699/mo',desc:'Build a recognized, trusted brand.',cat:'brand',wa:'Hi! I need Business Brand Builder R699/month'},'budget-mid':{icon:'🎨',title:'Premium Brand — R1,199/mo',desc:'15+ designs, ad creatives, powerhouse.',cat:'brand',wa:'Hi! I need Premium Brand System R1199/month'},'budget-high':{icon:'🎨',title:'Premium Brand + Social',desc:'Full brand and social stack.',cat:'brand',wa:'Hi! I want Premium Brand and Growth Social'}}},
  'fix-site':{'starting':{'budget-low':{icon:'🔧',title:'Minor Service — R150-R350',desc:'Quick fixes, clean and credible.',cat:'maint',wa:'Hi! I need a Minor Website Service'},'budget-mid':{icon:'🔧',title:'Basic Maintenance — R150/mo',desc:'Monthly upkeep, always online.',cat:'maint',wa:'Hi! I need the Basic Maintenance Plan'},'budget-high':{icon:'🔧',title:'Growth Maintenance — R399/mo',desc:'AI content, SEO boost, more leads.',cat:'maint',wa:'Hi! I need the Growth Maintenance Plan'}},'growing':{'budget-low':{icon:'🔧',title:'Major Service — R400-R950',desc:'AI content rewrite, better conversions.',cat:'maint',wa:'Hi! I need a Major Website Service'},'budget-mid':{icon:'🔧',title:'Growth Maintenance — R399/mo',desc:'Monthly AI content, SEO, leads.',cat:'maint',wa:'Hi! I need the Growth Maintenance Plan'},'budget-high':{icon:'🔧',title:'Premium Maintenance — R950/mo',desc:'Full automation, funnels, WhatsApp.',cat:'maint',wa:'Hi! I need the Premium Maintenance Plan'}},'scaling':{'budget-low':{icon:'🔧',title:'Premium Service — R950-R1,600',desc:'Full automation and sales system.',cat:'maint',wa:'Hi! I need a Premium Website Service'},'budget-mid':{icon:'🔧',title:'Premium Maintenance — R950/mo',desc:'24/7 digital sales assistant.',cat:'maint',wa:'Hi! I need the Premium Maintenance Plan'},'budget-high':{icon:'🔥',title:'Premium + Bundle Deal',desc:'Maintained, automated, and ranking.',cat:'bundles',wa:'Hi! I want Premium Maintenance and a bundle deal'}}}
};

function showResult(budget){
  var g=goal||'get-online',b=biz||'starting';
  var r=(RESULTS[g]&&RESULTS[g][b]&&RESULTS[g][b][budget])?RESULTS[g][b][budget]:{icon:'🎯',title:'Custom Package',desc:'WhatsApp us and we will build the perfect package.',cat:'all',wa:'Hi! I need help finding the right package'};
  rcat=r.cat;
  document.getElementById('result-icon').innerHTML=r.icon;
  document.getElementById('result-title').innerHTML=r.title;
  document.getElementById('result-desc').innerHTML=r.desc;
  document.getElementById('result-wa').href='https://wa.me/27660018931?text='+encodeURIComponent(r.wa);
  showStep('result');
}

function filterCatFromResult(){closeQuiz();filterCat(rcat,null);}

function initFade(){
  var els=document.querySelectorAll('.fade-up');
  var i;
  for(i=0;i<els.length;i++){
    if(!els[i].classList.contains('in')){
      els[i].classList.add('in');
    }
  }
}

var secs=document.querySelectorAll('.cat-section');
var si;
for(si=0;si<secs.length;si++){
  if(secs[si].className.indexOf('cat-hidden-default')===-1){
    secs[si].style.display='block';
  }
}
initFade();

var currentRole = '';

function openApply(role) {
  currentRole = role;
  document.getElementById('cvTitle').innerHTML = 'Apply for ' + role;
  document.getElementById('cv-wa-link').href = 'https://wa.me/27660018931?text=' + encodeURIComponent('Hi! I want to apply for the ' + role + ' role at Autosage Digital AI');
  document.getElementById('cvBox').style.display = 'block';
  document.getElementById('cvOverlay').style.display = 'block';
  document.getElementById('cv-success').style.display = 'none';
  document.getElementById('cv-wa-fallback').style.display = 'none';
  document.body.style.overflow = 'hidden';
}

function closeApply() {
  document.getElementById('cvBox').style.display = 'none';
  document.getElementById('cvOverlay').style.display = 'none';
  document.body.style.overflow = '';
}

function handleFile(input) {
  if (input.files && input.files[0]) {
    var name = input.files[0].name;
    document.getElementById('cv-file-name').style.display = 'block';
    document.getElementById('cv-file-name').innerHTML = '✓ ' + name + ' selected';
    document.getElementById('cvUploadArea').className = 'cv-upload-area has-file';
  }
}

function submitCV() {
  var name = document.getElementById('cv-name').value;
  var email = document.getElementById('cv-email').value;
  var phone = document.getElementById('cv-phone').value;
  if (!name || name.trim() === '') {
    document.getElementById('cv-name').style.borderColor = '#ef4444';
    document.getElementById('cv-name').focus();
    return;
  }
  if (!email || email.indexOf('@') === -1) {
    document.getElementById('cv-email').style.borderColor = '#ef4444';
    document.getElementById('cv-email').focus();
    return;
  }
  document.getElementById('cv-success').style.display = 'block';
  document.getElementById('cv-wa-fallback').style.display = 'block';
  var ids = ['cv-name','cv-email','cv-phone','cv-link','cv-msg'];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (el) { el.value = ''; el.style.borderColor = ''; }
  }
  document.getElementById('cv-file-name').style.display = 'none';
  document.getElementById('cvUploadArea').className = 'cv-upload-area';
}


function toggleMenu() {
  var menu = document.getElementById('slideMenu');
  var overlay = document.getElementById('slideOverlay');
  if (menu.className.indexOf('open') === -1) {
    menu.className = 'slide-menu open';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
  } else {
    menu.className = 'slide-menu';
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function goSection(id) {
  filterCat(id, null);
}


var LANGS = {
  en: {
    flag:'🇬🇧', code:'EN',
    tagline:'Business Marketing Machine',
    hero_h1:'Choose Your', hero_h1_span:'Marketing Package',
    hero_p:'Everything your business needs to get online, get found, and get customers.',
    quiz_prompt:'Not sure? Find your perfect package in 3 quick questions',
    find_pkg:'🎯 Find Package', whatsapp_btn:'💬 WhatsApp',
    guide_h2:'Not Sure What You Need?',
    guide_p:"Tell us what you're trying to achieve and we'll point you to the right package — free consultation.",
    cat_all:'🗂️ All Services', cat_web:'🌐 Websites', cat_ecom:'🛒 E-Commerce',
    cat_seo:'📈 SEO', cat_gmb:'📍 Google My Business', cat_gads:'📣 Google Ads',
    cat_smm:'📲 Social Media', cat_brand:'🎨 Branding', cat_maint:'🔧 Maintenance',
    cat_bundles:'🔥 Bundles', cat_blog:'📝 Blog', cat_careers:'💼 Careers',
    dir:'ltr'
  },
  zu: {
    flag:'🇿🇦', code:'ZU',
    tagline:'Uhlelo Lokumaketha Ibhizinisi',
    hero_h1:'Khetha I-', hero_h1_span:'Phakheji Yokumaketha',
    hero_p:'Konke ibhizinisi lakho okudingayo ukuze litholakale ku-inthanethi futhi lithole amakhasimende.',
    quiz_prompt:'Awuqiniseki? Thola iphakheji yakho efanelekile ngemibuzo emi-3',
    find_pkg:'🎯 Thola Iphakheji', whatsapp_btn:'💬 WhatsApp',
    guide_h2:'Awuqiniseki Ukuthi Udinga Ini?',
    guide_p:'Sitshele lokho ozama ukukufeza futhi sizokhomba iphakheji efanelekile — ukubonisana kwamahhala.',
    cat_all:'🗂️ Yonke Imikhakha', cat_web:'🌐 Amawebhusayithi', cat_ecom:'🛒 Ukuthenga Ku-inthanethi',
    cat_seo:'📈 SEO', cat_gmb:'📍 Google My Business', cat_gads:'📣 Izikhangiso Google',
    cat_smm:'📲 Imithiya Yezenhlalo', cat_brand:'🎨 Uphawu Lweshishini', cat_maint:'🔧 Ukulungisa',
    cat_bundles:'🔥 Amaphakeji', cat_blog:'📝 Ibhulogi', cat_careers:'💼 Imisebenzi',
    dir:'ltr'
  },
  xh: {
    flag:'🇿🇦', code:'XH',
    tagline:'Umshini Wokurhweba Koshishino',
    hero_h1:'Khetha I-', hero_h1_span:'Phakheji Yokuthengisa',
    hero_p:'Konke ishishini lakho elikudingayo ukuze lifumaneke kwi-intanethi kwaye lifumane abantu abathengayo.',
    quiz_prompt:'Akuqinisekanga? Fumana iphakheji yakho efanelekileyo nemibuzo emi-3',
    find_pkg:'🎯 Fumana Iphakheji', whatsapp_btn:'💬 WhatsApp',
    guide_h2:'Awuqinisekanga Ukuba Ufuna Ntoni?',
    guide_p:'Sitsele into ozama ukuyifezekisa kwaye sizokhomba iphakheji efanelekileyo — ingxoxo yasimahla.',
    cat_all:'🗂️ Yonke Iinkonzo', cat_web:'🌐 Iwebsayithi', cat_ecom:'🛒 Ukuthenga Kwi-Intanethi',
    cat_seo:'📈 SEO', cat_gmb:'📍 Google My Business', cat_gads:'📣 Izikhangiso Google',
    cat_smm:'📲 Imithiya Yezenhlalo', cat_brand:'🎨 Uphawu', cat_maint:'🔧 Ukulungiswa',
    cat_bundles:'🔥 Amaphakeji', cat_blog:'📝 Ibhlog', cat_careers:'💼 Imisebenzi',
    dir:'ltr'
  },
  af: {
    flag:'🇿🇦', code:'AF',
    tagline:'Besigheidsbemarking Masjien',
    hero_h1:'Kies Jou', hero_h1_span:'Bemarkingspakket',
    hero_p:'Alles wat jou besigheid nodig het om aanlyn te kom, gevind te word en kliënte te kry.',
    quiz_prompt:'Onseker? Vind jou perfekte pakket in 3 vinnige vrae',
    find_pkg:'🎯 Vind Pakket', whatsapp_btn:'💬 WhatsApp',
    guide_h2:'Onseker Wat Jy Nodig Het?',
    guide_p:'Vertel ons wat jy probeer bereik en ons sal jou na die regte pakket wys — gratis konsultasie.',
    cat_all:'🗂️ Alle Dienste', cat_web:'🌐 Webwerwe', cat_ecom:'🛒 E-Handel',
    cat_seo:'📈 SEO', cat_gmb:'📍 Google My Business', cat_gads:'📣 Google Advertensies',
    cat_smm:'📲 Sosiale Media', cat_brand:'🎨 Handelsmerk', cat_maint:'🔧 Onderhoud',
    cat_bundles:'🔥 Bondels', cat_blog:'📝 Blog', cat_careers:'💼 Loopbane',
    dir:'ltr'
  },
  st: {
    flag:'🇿🇦', code:'ST',
    tagline:'Mochini oa Khoebo ea Mmaraka',
    hero_h1:'Khetha', hero_h1_span:'Phutheloano ea Mmaraka',
    hero_p:'Tsohle tseo khoebo ea hao e li hlokaang ho fumanoa marang-rang le ho fumana bareki.',
    quiz_prompt:'Ha o na bonnete? Fumana phutheloano ea hao e maloa ka dipotso tse 3',
    find_pkg:'🎯 Fumana Phutheloano', whatsapp_btn:'💬 WhatsApp',
    guide_h2:'Ha o Tsebe Seo o Se Hlokang?',
    guide_p:'Re bolelle seo o lekang ho se fihlela mme re tla o laya ho phutheloano e nepahetseng — keletso ea mahala.',
    cat_all:'🗂️ Litshebeletso Tsohle', cat_web:'🌐 Liwebsaete', cat_ecom:'🛒 Khoebo ea Inthanete',
    cat_seo:'📈 SEO', cat_gmb:'📍 Google My Business', cat_gads:'📣 Lipapatso tsa Google',
    cat_smm:'📲 Marang-rang a Sechaba', cat_brand:'🎨 Letšoao', cat_maint:'🔧 Tlhokomelo',
    cat_bundles:'🔥 Liphutheloano', cat_blog:'📝 Blogo', cat_careers:'💼 Mesebetsi',
    dir:'ltr'
  },
  tn: {
    flag:'🇿🇦', code:'TN',
    tagline:'Motšhine wa Kgwebišano ya Mmaraka',
    hero_h1:'Tlhopha', hero_h1_span:'Phuthego ya Mmaraka',
    hero_p:'Tsotlhe tse lekgotla la gago le di tlhokang go nna mo go ya marang a marang le go bona bareki.',
    quiz_prompt:'Ga o na bonnete? Bona phuthego e e siametseng go nepa ka dipotso tse 3',
    find_pkg:'🎯 Bona Phuthego', whatsapp_btn:'💬 WhatsApp',
    guide_h2:'Ga O Itse Se O Se Tlhokang?',
    guide_p:'Re bolelele se o lekang go se fitlhelela mme re tla go naya tsela ya phuthego e e siametseng — kgakololo e kgotsa mahala.',
    cat_all:'🗂️ Ditirelo Tsotlhe', cat_web:'🌐 Maepe a Inthanete', cat_ecom:'🛒 Kgwebo ya Inthanete',
    cat_seo:'📈 SEO', cat_gmb:'📍 Google My Business', cat_gads:'📣 Ditšhayelo tsa Google',
    cat_smm:'📲 Marang a Sechaba', cat_brand:'🎨 Letšoao', cat_maint:'🔧 Tlhokomelo',
    cat_bundles:'🔥 Diphuthego', cat_blog:'📝 Boloko', cat_careers:'💼 Mešomo',
    dir:'ltr'
  },
  nso: {
    flag:'🇿🇦', code:'NS',
    tagline:'Motšhine wa Kgwebo ya Mmaraka',
    hero_h1:'Kgetha', hero_h1_span:'Phuthego ya Mmaraka',
    hero_p:'Tsohle tše kgwebo ya gago e di hlokago go ba gona inthaneteng le go hwetša bareki.',
    quiz_prompt:'Ga o na bonnete? Hwetša phuthego ya gago ye e siamego ka dipotšišo tše 3',
    find_pkg:'🎯 Hwetša Phuthego', whatsapp_btn:'💬 WhatsApp',
    guide_h2:'Ga O Tsebe Se O Se Hlokago?',
    guide_p:'Re bolelele se o lekago go se fihlelela gomme re tla go laela phuthego ye e siamego — kgakolelo ya mahala.',
    cat_all:'🗂️ Ditirelo Tsohle', cat_web:'🌐 Maepe a Inthanete', cat_ecom:'🛒 Kgwebo ya Inthanete',
    cat_seo:'📈 SEO', cat_gmb:'📍 Google My Business', cat_gads:'📣 Dikgasho tša Google',
    cat_smm:'📲 Marang a Sehlopha', cat_brand:'🎨 Letšoao', cat_maint:'🔧 Tlhokomelo',
    cat_bundles:'🔥 Diphuthego', cat_blog:'📝 Boloko', cat_careers:'💼 Mešomo',
    dir:'ltr'
  },
  ts: {
    flag:'🇿🇦', code:'TS',
    tagline:'Xitirho xa Vuhweleri xa Mfumo',
    hero_h1:'Hlawula', hero_h1_span:'Nkwama wa Mfumo',
    hero_p:'Hinkwaswo leswi xindzhawu xa wena xi xi lavaka ku va eka inthanete no kuma swirho.',
    quiz_prompt:'U tshembi? Kuma nkwama wa wena lowu faneleke hi swivutiso swo tala 3',
    find_pkg:'🎯 Kuma Nkwama', whatsapp_btn:'💬 WhatsApp',
    guide_h2:'U Tshembi Leswi U Swi Lavaka?',
    guide_p:'Hi byela leswi u ringeta ku swi fikelela naswona hi ta ku kombela nkwama lowu faneleke — vulangutiselo bya mahala.',
    cat_all:'🗂️ Swirho Hinkwaswo', cat_web:'🌐 Tiwebusayiti', cat_ecom:'🛒 Vuhweleri bya Inthanete',
    cat_seo:'📈 SEO', cat_gmb:'📍 Google My Business', cat_gads:'📣 Swikangiso swa Google',
    cat_smm:'📲 Midia ya Ntlawa', cat_brand:'🎨 Nhlawulo', cat_maint:'🔧 Ku Hlayisa',
    cat_bundles:'🔥 Tinkwama', cat_blog:'📝 Buloko', cat_careers:'💼 Switirho',
    dir:'ltr'
  },
  ss: {
    flag:'🇿🇦', code:'SS',
    tagline:'Umshini Wetengo Lwebhizinisi',
    hero_h1:'Khetha', hero_h1_span:'Phakheji Yetengo',
    hero_p:'Konkhe lebhizinisi lakho lokudinga kube naku-inthanethi nemathole emakhasimende.',
    quiz_prompt:'Awuqiniseki? Thola iphakheji yakho lefanele ngemibuto lemi-3',
    find_pkg:'🎯 Thola Phakheji', whatsapp_btn:'💬 WhatsApp',
    guide_h2:'Awuqiniseki Ngalokho Lodingako?',
    guide_p:'Sitjele lokho uzama kukufeza futhi sizokhomba iphakheji lefanele — kuhlolisana kwamahhala.',
    cat_all:'🗂️ Tonkhe Tinsita', cat_web:'🌐 Tiwebhusaythi', cat_ecom:'🛒 Kuthenga Ku-inthanethi',
    cat_seo:'📈 SEO', cat_gmb:'📍 Google My Business', cat_gads:'📣 Tikhangiso ta Google',
    cat_smm:'📲 Timidiya Temasiko', cat_brand:'🎨 Uphawu', cat_maint:'🔧 Kulungisa',
    cat_bundles:'🔥 Tiphakheji', cat_blog:'📝 Ibhulogi', cat_careers:'💼 Imisebenzi',
    dir:'ltr'
  },
  ve: {
    flag:'🇿🇦', code:'VE',
    tagline:'Mutsho wa Vhubindudzi vha Muvhigo',
    hero_h1:'Nanga', hero_h1_span:'Phakheji ya Muvhigo',
    hero_p:'Zwothe zwine vhubindudzi havhu zwa zwida u wanala kha inthanete na u wana vhathu vha u tenga.',
    quiz_prompt:'A hu na vhukololo? Wana phakheji yau ine ya kwama nga mbudziso dza 3',
    find_pkg:'🎯 Wana Phakheji', whatsapp_btn:'💬 WhatsApp',
    guide_h2:'A U Tshi Ḓivha Zwine Wa Zwida?',
    guide_p:'Ri vhudze zwine wa linga u zwi fhedzisa nahone ri tshi do u sumbedza phakheji ine ya kwama — mbingano ya mahala.',
    cat_all:'🗂️ Tshumelo Dzoṱhe', cat_web:'🌐 Ḽiwebusaiti', cat_ecom:'🛒 Vhubindudzi Kha Inthanete',
    cat_seo:'📈 SEO', cat_gmb:'📍 Google My Business', cat_gads:'📣 Tshenzhelo dza Google',
    cat_smm:'📲 Midia ya Vhathu', cat_brand:'🎨 Tshifanyiso', cat_maint:'🔧 Ndangulo',
    cat_bundles:'🔥 Dzi-phakheji', cat_blog:'📝 Buloko', cat_careers:'💼 Mishumo',
    dir:'ltr'
  },
  nr: {
    flag:'🇿🇦', code:'NR',
    tagline:'Umtjhini weMarkethi yeBhizinisi',
    hero_h1:'Khetha', hero_h1_span:'Iphakheji yeMarkethi',
    hero_p:'Ukuthi ibhizinisi lakho limathole ukuzitholakala ku-inthanethi nokunikeza amakhasimende.',
    quiz_prompt:'Awuqiniseki? Thola iphakheji yakho ngemibuzo emi-3',
    find_pkg:'🎯 Thola Iphakheji', whatsapp_btn:'💬 WhatsApp',
    guide_h2:'Awuqiniseki Ngalokho Okudingakako?',
    guide_p:'Sitjele lokho ozama ukukufeza begodu sizokukhomba iphakheji efaneleko — ukubonisana kwamahhala.',
    cat_all:'🗂️ Yoke imiSebenziso', cat_web:'🌐 Iiwebhusayidi', cat_ecom:'🛒 Ukuthenga Ku-inthanethi',
    cat_seo:'📈 SEO', cat_gmb:'📍 Google My Business', cat_gads:'📣 Izikhangiso zaka Google',
    cat_smm:'📲 Imithiya yeZenhlalo', cat_brand:'🎨 Uphawu', cat_maint:'🔧 Ukulungisa',
    cat_bundles:'🔥 Amaphakheji', cat_blog:'📝 Ibhulogi', cat_careers:'💼 Imisebenzi',
    dir:'ltr'
  },
  ar: {
    flag:'🇸🇦', code:'AR',
    tagline:'آلة التسويق التجاري',
    hero_h1:'اختر', hero_h1_span:'باقة التسويق',
    hero_p:'كل ما يحتاجه عملك للظهور على الإنترنت والعثور عليه وجذب العملاء.',
    quiz_prompt:'غير متأكد؟ اعثر على باقتك المثالية في 3 أسئلة سريعة',
    find_pkg:'🎯 اعثر على باقة', whatsapp_btn:'💬 واتساب',
    guide_h2:'لست متأكدًا مما تحتاجه؟',
    guide_p:'أخبرنا بما تحاول تحقيقه وسنرشدك إلى الباقة المناسبة — استشارة مجانية.',
    cat_all:'🗂️ جميع الخدمات', cat_web:'🌐 مواقع الويب', cat_ecom:'🛒 التجارة الإلكترونية',
    cat_seo:'📈 تحسين محركات البحث', cat_gmb:'📍 قوقل ماي بيزنس', cat_gads:'📣 إعلانات قوقل',
    cat_smm:'📲 وسائل التواصل الاجتماعي', cat_brand:'🎨 العلامة التجارية', cat_maint:'🔧 الصيانة',
    cat_bundles:'🔥 الحزم', cat_blog:'📝 المدونة', cat_careers:'💼 الوظائف',
    dir:'rtl'
  },
  hi: {
    flag:'🇮🇳', code:'HI',
    tagline:'व्यापार मार्केटिंग मशीन',
    hero_h1:'अपना चुनें', hero_h1_span:'मार्केटिंग पैकेज',
    hero_p:'आपके व्यवसाय को ऑनलाइन आने, खोजे जाने और ग्राहक पाने के लिए सब कुछ।',
    quiz_prompt:'निश्चित नहीं? 3 सवालों में अपना सही पैकेज खोजें',
    find_pkg:'🎯 पैकेज खोजें', whatsapp_btn:'💬 व्हाट्सऐप',
    guide_h2:'नहीं जानते आपको क्या चाहिए?',
    guide_p:'हमें बताएं आप क्या हासिल करना चाहते हैं और हम सही पैकेज की ओर मार्गदर्शन करेंगे — निःशुल्क परामर्श।',
    cat_all:'🗂️ सभी सेवाएं', cat_web:'🌐 वेबसाइट', cat_ecom:'🛒 ई-कॉमर्स',
    cat_seo:'📈 एसईओ', cat_gmb:'📍 गूगल माय बिजनेस', cat_gads:'📣 गूगल विज्ञापन',
    cat_smm:'📲 सोशल मीडिया', cat_brand:'🎨 ब्रांडिंग', cat_maint:'🔧 रखरखाव',
    cat_bundles:'🔥 बंडल', cat_blog:'📝 ब्लॉग', cat_careers:'💼 करियर',
    dir:'ltr'
  },
  ur: {
    flag:'🇵🇰', code:'UR',
    tagline:'کاروباری مارکیٹنگ مشین',
    hero_h1:'اپنا انتخاب کریں', hero_h1_span:'مارکیٹنگ پیکج',
    hero_p:'آپ کے کاروبار کو آن لائن آنے، تلاش ہونے اور گاہک حاصل کرنے کے لیے سب کچھ۔',
    quiz_prompt:'یقین نہیں؟ 3 سوالوں میں اپنا بہترین پیکج تلاش کریں',
    find_pkg:'🎯 پیکج تلاش کریں', whatsapp_btn:'💬 واٹس ایپ',
    guide_h2:'نہیں جانتے آپ کو کیا چاہیے؟',
    guide_p:'ہمیں بتائیں آپ کیا حاصل کرنا چاہتے ہیں اور ہم آپ کو صحیح پیکج کی طرف رہنمائی کریں گے — مفت مشاورت۔',
    cat_all:'🗂️ تمام خدمات', cat_web:'🌐 ویب سائٹس', cat_ecom:'🛒 ای کامرس',
    cat_seo:'📈 ایس ای او', cat_gmb:'📍 گوگل مائی بزنس', cat_gads:'📣 گوگل اشتہارات',
    cat_smm:'📲 سوشل میڈیا', cat_brand:'🎨 برانڈنگ', cat_maint:'🔧 دیکھ بھال',
    cat_bundles:'🔥 بنڈل', cat_blog:'📝 بلاگ', cat_careers:'💼 ملازمتیں',
    dir:'rtl'
  }
};

var currentLang = 'en';

function openLang() {
  document.getElementById('langOverlay').className = 'lang-overlay open';
  document.body.style.overflow = 'hidden';
}
function closeLang() {
  document.getElementById('langOverlay').className = 'lang-overlay';
  document.body.style.overflow = '';
}
function closeLangOutside(e) {
  if (e.target === document.getElementById('langOverlay')) closeLang();
}

function setLang(code) {
  var t = LANGS[code];
  if (!t) return;
  currentLang = code;

  // Update document direction for RTL languages
  document.documentElement.dir = t.dir || 'ltr';

  // Update all tagged elements
  var els = document.querySelectorAll('[data-i18n]');
  var i, el, key, val;
  for (i = 0; i < els.length; i++) {
    el = els[i];
    key = el.getAttribute('data-i18n');
    val = t[key];
    if (val !== undefined) {
      // Handle hero h1 specially (has inner span)
      if (key === 'hero_h1') {
        el.innerHTML = t.hero_h1 + ' <span class="g" data-i18n="hero_h1_span">' + t.hero_h1_span + '</span>';
      } else if (key === 'quiz_prompt') {
        el.innerHTML = val + ' <span class="arrow">\u2193</span>';
      } else {
        el.innerHTML = val;
      }
    }
  }

  // Update nav language button display
  document.getElementById('langFlagDisplay').innerHTML = t.flag;
  document.getElementById('langNameDisplay').innerHTML = t.code;

  // Update active state on language options
  var opts = document.querySelectorAll('.lang-option');
  for (i = 0; i < opts.length; i++) {
    opts[i].className = opts[i].className.replace(' active', '');
  }
  var activeOpt = document.getElementById('lang-' + code);
  if (activeOpt) {
    activeOpt.className = activeOpt.className + ' active';
  }

  closeLang();
}



// ── PACKAGE PAGE ROUTING ──
// Register extra pages so gP() can navigate to them
(function(){
  var extraPages = ['automation-packages','marketing-packages'];
  extraPages.forEach(function(id){
    var el = document.getElementById('page-'+id);
    if(el) el.classList.add('page');
  });
})();
