/* AutoSageAI fixes-1.js — paste this entire file into GitHub */
(function(){
'use strict';

/* ─── QUIZ STATE ─── */
var A={g:null,n:null,r:null,b:null};

/* ─── BUILD MODAL ─── */
function build(){
  if(document.getElementById('asai-qoverlay')) return;
  var o=document.createElement('div');
  o.id='asai-qoverlay';
  o.innerHTML='<div id="asai-qbox">'+
    '<button class="asai-qclose" onclick="window.asaiClose()">&#x2715;</button>'+
    '<div class="asai-prog">'+
      '<div class="asai-dot on" id="ad1"></div>'+
      '<div class="asai-dot" id="ad2"></div>'+
      '<div class="asai-dot" id="ad3"></div>'+
      '<div class="asai-dot" id="ad4"></div>'+
    '</div>'+
    step(1,'What\'s your primary goal?','What result matters most right now?',
      [['leads','📥','Get More Leads','Capture & convert customers'],
       ['automate','⚙️','Automate My Ops','Save time & reduce errors'],
       ['online','🌐','Get Online Fast','Website & online presence'],
       ['full','💎','Full Business System','AI-powered everything']])+
    step(2,'What do you need built?','Select the most important feature.',
      [['website','🌐','Professional Website','Landing page or full site'],
       ['whatsapp','💬','WhatsApp AI Agent','24/7 automated replies'],
       ['automation','⚡','Full Automation','Workflows, bookings, follow-ups'],
       ['all','🏆','Everything Combined','Website + AI + Automation']])+
    step(3,'Once-off or ongoing?','Build only, or monthly management too?',
      [['once','🔨','Once-Off Build','Get it built, take it from there'],
       ['monthly','📅','Monthly Retainer','Ongoing management'],
       ['both','🚀','Build + Monthly','Best value — build it right, keep it running']],'single')+
    step(4,'What\'s your budget?','All prices are once-off unless a retainer is chosen.',
      [['low','💵','R500 – R1,500','Just getting started'],
       ['mid','💰','R1,500 – R3,500','Ready to grow'],
       ['high','💎','R3,500 – R7,000','Serious about AI'],
       ['premium','🏆','R7,000+','Full transformation']],'single')+
    '<div class="asai-step" id="as5"><div class="asai-result" id="ar"></div></div>'+
  '</div>';
  document.body.appendChild(o);
  o.addEventListener('click',function(e){if(e.target===o) window.asaiClose();});
  o.addEventListener('click',function(e){
    var opt=e.target.closest('.asai-opt');
    if(opt){
      var s=parseInt(opt.dataset.s);
      opt.closest('.asai-opts').querySelectorAll('.asai-opt').forEach(function(x){x.classList.remove('sel');});
      opt.classList.add('sel');
      ['g','n','r','b'][s-1]&&(A[['g','n','r','b'][s-1]]=opt.dataset.v);
    }
    var nx=e.target.closest('.asai-next');
    if(nx){var f=parseInt(nx.dataset.f);if(f===4)showResult();else goStep(f+1);}
    var bk=e.target.closest('.asai-back');
    if(bk) goStep(parseInt(bk.dataset.f)-1);
  });
}

function step(n,q,hint,opts,cls){
  var prev=n>1?'<button class="asai-back" data-f="'+n+'">← Back</button>':'<div></div>';
  var nxt=n<4?'Next →':'See My Package →';
  return '<div class="asai-step'+(n===1?' show':'')+'" id="as'+n+'">'+
    '<span class="asai-qtag">Question '+n+' of 4</span>'+
    '<h2>'+q+'</h2><p class="asai-hint">'+hint+'</p>'+
    '<div class="asai-opts'+(cls?' '+cls:'')+'">'+
      opts.map(function(o){return '<button class="asai-opt" data-v="'+o[0]+'" data-s="'+n+'">'+
        '<span class="asai-oe">'+o[1]+'</span>'+
        '<span class="asai-ot">'+o[2]+'</span>'+
        '<span class="asai-os">'+o[3]+'</span>'+
      '</button>';}).join('')+
    '</div>'+
    '<div class="asai-acts">'+prev+'<button class="asai-next" data-f="'+n+'">'+nxt+'</button></div>'+
  '</div>';
}

function goStep(n){
  document.querySelectorAll('.asai-step').forEach(function(s){s.classList.remove('show');});
  var t=document.getElementById('as'+n);if(t) t.classList.add('show');
  for(var i=1;i<=4;i++){var d=document.getElementById('ad'+i);if(d)d.classList.toggle('on',i<=n);}
}

function showResult(){
  var pkg=calcPkg();
  var msg=encodeURIComponent('Hi Anthony, the package quiz recommended me: '+pkg.name+". I'd like to find out more.");
  document.getElementById('ar').innerHTML=
    '<div class="asai-rbadge">✓ Your Recommended Package</div>'+
    '<div class="asai-rname">'+pkg.name+'</div>'+
    '<div class="asai-rprice">'+pkg.price+'</div>'+
    '<p class="asai-rdesc">'+pkg.desc+'</p>'+
    '<div class="asai-rinc"><h4>What\'s Included</h4><ul>'+
      pkg.inc.map(function(i){return '<li>'+i+'</li>';}).join('')+
    '</ul></div>'+
    '<div class="asai-rbtns">'+
      '<a href="https://wa.me/27660018931?text='+msg+'" target="_blank" class="asai-rwa">💬 Claim This Package</a>'+
      '<button onclick="window.asaiClose()" class="asai-rclose">Close</button>'+
    '</div>';
  document.querySelectorAll('.asai-step').forEach(function(s){s.classList.remove('show');});
  document.getElementById('as5').classList.add('show');
  document.querySelector('.asai-prog').style.display='none';
}

function calcPkg(){
  var g=A.g,n=A.n,b=A.b;
  if(b==='premium'||n==='all'||g==='full')
    return{name:'💎 Full Business System',price:'R7,000 – R15,000',desc:'Website, AI agent, WhatsApp automation, dashboard, lead capture and follow-up — all in one.',inc:['Website + AI + Automation combined','Business dashboard','Lead capture & follow-up','WhatsApp automation + workflows','Branding & copy included']};
  if(b==='high'||n==='automation'||n==='whatsapp'||g==='automate')
    return{name:'🧠 AI System Build',price:'R3,500 – R7,000',desc:'Full AI workflow system with custom logic, WhatsApp integration and full deployment.',inc:['Full AI workflow system','AutoSage Lite setup','Custom business logic','WhatsApp integration','Full deployment']};
  if(b==='mid'||g==='leads'||n==='website')
    return{name:'🚀 Growth System',price:'R1,500 – R3,500',desc:'Landing page, lead capture, automation and hosting so your business works even while you sleep.',inc:['Full landing page','Lead capture system','Basic automation','Hosting setup','WhatsApp integration']};
  return{name:'⚡ Starter Package',price:'R500 – R1,500',desc:'Get online fast with a basic website or simple automation.',inc:['Basic website OR simple automation','WhatsApp integration','Basic setup & go-live']};
}

window.asaiOpen=function(){
  A={g:null,n:null,r:null,b:null};
  document.querySelectorAll('.asai-step').forEach(function(s){s.classList.remove('show');});
  document.querySelectorAll('.asai-opt').forEach(function(o){o.classList.remove('sel');});
  document.getElementById('as1').classList.add('show');
  var p=document.querySelector('.asai-prog');if(p)p.style.display='';
  for(var i=1;i<=4;i++){var d=document.getElementById('ad'+i);if(d)d.classList.toggle('on',i===1);}
  document.getElementById('asai-qoverlay').classList.add('open');
  document.body.style.overflow='hidden';
};
window.asaiClose=function(){
  var o=document.getElementById('asai-qoverlay');if(o)o.classList.remove('open');
  document.body.style.overflow='';
};

/* ─── ATTACH QUIZ TO PACKAGE CARDS ─── */
function attachQuiz(){
  var sels=['.pkg-card','.pkc','.package-card','.pricing-card',
    '[class*="pkg-c"]','[class*="pkc"]','[class*="package-c"]'];
  sels.forEach(function(s){
    document.querySelectorAll(s).forEach(function(c){
      if(c._q) return; c._q=1;
      c.style.cursor='pointer';
      c.addEventListener('click',function(e){
        if(e.target.tagName==='A') return;
        window.asaiOpen();
      });
    });
  });
  /* Buttons with quiz-related text */
  document.querySelectorAll('button,a').forEach(function(b){
    if(b._q) return;
    var t=(b.textContent||'').toLowerCase().trim();
    if(t==='get started'||t==='choose plan'||t==='select'||
       t.indexOf('find my package')>-1||t.indexOf('find out')>-1){
      b._q=1;
      b.addEventListener('click',function(e){
        e.preventDefault(); e.stopPropagation();
        window.asaiOpen();
      });
    }
  });
}

/* ─── FIX LIGHT BG TEXT ─── */
function fixLight(){
  document.querySelectorAll('section,div,main,article').forEach(function(el){
    try{
      var bg=getComputedStyle(el).backgroundColor;
      if(!bg||bg==='transparent'||bg==='rgba(0, 0, 0, 0)') return;
      var m=bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if(!m) return;
      var br=(+m[1]*299 + +m[2]*587 + +m[3]*114)/1000;
      if(br>150){
        el.style.setProperty('color','#111','important');
        el.querySelectorAll('p,h1,h2,h3,h4,h5,span,li').forEach(function(ch){
          var cb=getComputedStyle(ch).backgroundColor;
          if(!cb||cb==='transparent'||cb==='rgba(0, 0, 0, 0)')
            ch.style.setProperty('color','#111','important');
        });
      }
    }catch(e){}
  });
}

/* ─── FIX CAREERS APPLY BUTTONS ─── */
function fixCareers(){
  document.querySelectorAll('button,a,.cr-ab').forEach(function(el){
    if(el._ca) return;
    var t=(el.textContent||'').toLowerCase().trim();
    if(t==='apply now'||t==='apply'||t.indexOf('apply now')>-1){
      el._ca=1;
      var card=el.closest('[class*="crc"],[class*="career"],[class*="job"],[class*="card"]');
      var ct=card?(card.textContent||'').toLowerCase():'';
      var subj='Open Application — AutoSageAI';
      if(ct.indexOf('ai')>-1||ct.indexOf('system')>-1) subj='Application: AI Systems Builder';
      else if(ct.indexOf('web')>-1) subj='Application: Web Developer';
      else if(ct.indexOf('market')>-1||ct.indexOf('digital')>-1) subj='Application: Digital Marketing Operator';
      var body='Hi Anthony,\n\nI am applying for the '+subj.replace('Application: ','')+' role.\n\nName:\nExperience:\nWhy AutoSageAI:\n';
      var href='mailto:tonybuthel@gmail.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
      if(el.tagName==='BUTTON'){
        var a=document.createElement('a');
        a.href=href; a.className=el.className+' asai-apply';
        a.textContent=el.textContent; a._ca=1;
        el.parentNode.replaceChild(a,el);
      } else {
        el.href=href;
        el.classList.add('asai-apply');
      }
    }
  });
}

/* ─── FONT BOOST ─── */
function boostFont(){
  document.querySelectorAll('p,li,.svb,.hbd,.csb,.rdb,.bc-b').forEach(function(el){
    if(parseFloat(getComputedStyle(el).fontSize)<14)
      el.style.fontSize='15px';
  });
}

/* ─── RUN ALL ─── */
function run(){
  attachQuiz();
  fixCareers();
  fixLight();
  boostFont();
}

document.addEventListener('DOMContentLoaded',function(){
  build();
  run();
  new MutationObserver(function(ms){
    if(ms.some(function(m){return m.addedNodes.length>2;}))
      setTimeout(run,250);
  }).observe(document.body,{childList:true,subtree:true});
});

})();
