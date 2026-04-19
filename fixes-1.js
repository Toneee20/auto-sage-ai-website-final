/* AutoSageAI fixes.js - v2 */
(function(){
'use strict';

/* ── QUIZ DATA ── */
var qa={g:null,n:null,r:null,b:null};

function buildModal(){
  if(document.getElementById('asai-quiz-overlay')) return;
  var el=document.createElement('div');
  el.id='asai-quiz-overlay';
  el.innerHTML=
    '<div id="asai-quiz-box">'+
      '<button class="asai-quiz-close" id="asaiClose">&#x2715;</button>'+
      '<div class="asai-qprog">'+
        '<div class="asai-qdot on" id="aqd1"></div>'+
        '<div class="asai-qdot" id="aqd2"></div>'+
        '<div class="asai-qdot" id="aqd3"></div>'+
        '<div class="asai-qdot" id="aqd4"></div>'+
      '</div>'+
      /* Q1 */
      '<div class="asai-qstep active" id="aqs1">'+
        '<span class="asai-qtag">Question 1 of 4</span>'+
        '<h2>What\'s your primary goal?</h2>'+
        '<p class="asai-qhint">What result matters most to your business right now?</p>'+
        '<div class="asai-qopts">'+
          '<button class="asai-qopt" data-v="leads" data-s="1"><span class="asai-qoe">📥</span><span class="asai-qot">Get More Leads</span><span class="asai-qos">Capture &amp; convert customers</span></button>'+
          '<button class="asai-qopt" data-v="automate" data-s="1"><span class="asai-qoe">⚙️</span><span class="asai-qot">Automate My Ops</span><span class="asai-qos">Save time &amp; reduce errors</span></button>'+
          '<button class="asai-qopt" data-v="online" data-s="1"><span class="asai-qoe">🌐</span><span class="asai-qot">Get Online Fast</span><span class="asai-qos">Website &amp; online presence</span></button>'+
          '<button class="asai-qopt" data-v="full" data-s="1"><span class="asai-qoe">💎</span><span class="asai-qot">Run My Whole Business</span><span class="asai-qos">Full AI-powered system</span></button>'+
        '</div>'+
        '<div class="asai-qacts"><div></div><button class="asai-qnext" data-f="1">Next →</button></div>'+
      '</div>'+
      /* Q2 */
      '<div class="asai-qstep" id="aqs2">'+
        '<span class="asai-qtag">Question 2 of 4</span>'+
        '<h2>What do you need built?</h2>'+
        '<p class="asai-qhint">Select the features most important to your business.</p>'+
        '<div class="asai-qopts">'+
          '<button class="asai-qopt" data-v="website" data-s="2"><span class="asai-qoe">🌐</span><span class="asai-qot">Professional Website</span><span class="asai-qos">Landing page or full site</span></button>'+
          '<button class="asai-qopt" data-v="whatsapp" data-s="2"><span class="asai-qoe">💬</span><span class="asai-qot">WhatsApp AI Agent</span><span class="asai-qos">24/7 automated replies</span></button>'+
          '<button class="asai-qopt" data-v="automation" data-s="2"><span class="asai-qoe">⚡</span><span class="asai-qot">Full Automation</span><span class="asai-qos">Workflows, bookings, follow-ups</span></button>'+
          '<button class="asai-qopt" data-v="all" data-s="2"><span class="asai-qoe">🏆</span><span class="asai-qot">Everything Combined</span><span class="asai-qos">Website + AI + Automation</span></button>'+
        '</div>'+
        '<div class="asai-qacts"><button class="asai-qback" data-f="2">← Back</button><button class="asai-qnext" data-f="2">Next →</button></div>'+
      '</div>'+
      /* Q3 */
      '<div class="asai-qstep" id="aqs3">'+
        '<span class="asai-qtag">Question 3 of 4</span>'+
        '<h2>Once-off or ongoing support?</h2>'+
        '<p class="asai-qhint">Do you want a one-time build or monthly management?</p>'+
        '<div class="asai-qopts sc">'+
          '<button class="asai-qopt" data-v="once" data-s="3"><span class="asai-qoe">🔨</span><span class="asai-qot">Once-Off Build Only</span><span class="asai-qos">Get it built and take it from there</span></button>'+
          '<button class="asai-qopt" data-v="monthly" data-s="3"><span class="asai-qoe">📅</span><span class="asai-qot">Monthly Retainer</span><span class="asai-qos">Ongoing management and improvements</span></button>'+
          '<button class="asai-qopt" data-v="both" data-s="3"><span class="asai-qoe">🚀</span><span class="asai-qot">Build + Monthly Support</span><span class="asai-qos">Best value — build it right, keep it running</span></button>'+
        '</div>'+
        '<div class="asai-qacts"><button class="asai-qback" data-f="3">← Back</button><button class="asai-qnext" data-f="3">Next →</button></div>'+
      '</div>'+
      /* Q4 */
      '<div class="asai-qstep" id="aqs4">'+
        '<span class="asai-qtag">Question 4 of 4</span>'+
        '<h2>What\'s your budget range?</h2>'+
        '<p class="asai-qhint">All prices are once-off unless a retainer is selected.</p>'+
        '<div class="asai-qopts sc">'+
          '<button class="asai-qopt" data-v="low" data-s="4"><span class="asai-qoe">💵</span><span class="asai-qot">R500 – R1,500</span><span class="asai-qos">Just getting started</span></button>'+
          '<button class="asai-qopt" data-v="mid" data-s="4"><span class="asai-qoe">💰</span><span class="asai-qot">R1,500 – R3,500</span><span class="asai-qos">Ready to grow</span></button>'+
          '<button class="asai-qopt" data-v="high" data-s="4"><span class="asai-qoe">💎</span><span class="asai-qot">R3,500 – R7,000</span><span class="asai-qos">Serious about AI</span></button>'+
          '<button class="asai-qopt" data-v="premium" data-s="4"><span class="asai-qoe">🏆</span><span class="asai-qot">R7,000+</span><span class="asai-qos">Full business transformation</span></button>'+
        '</div>'+
        '<div class="asai-qacts"><button class="asai-qback" data-f="4">← Back</button><button class="asai-qnext" data-f="4" id="aqShowResult">See My Package →</button></div>'+
      '</div>'+
      /* Result */
      '<div class="asai-qstep" id="aqsR"><div class="asai-qresult" id="aqResult"></div></div>'+
    '</div>';
  document.body.appendChild(el);

  el.querySelector('#asaiClose').addEventListener('click', closeQuiz);
  el.addEventListener('click',function(e){ if(e.target===el) closeQuiz(); });

  el.addEventListener('click',function(e){
    var opt=e.target.closest('.asai-qopt');
    if(opt){
      var s=opt.dataset.s;
      opt.closest('.asai-qopts').querySelectorAll('.asai-qopt').forEach(function(o){o.classList.remove('sel');});
      opt.classList.add('sel');
      var keys=['g','n','r','b'];
      qa[keys[s-1]]=opt.dataset.v;
    }
    var nx=e.target.closest('.asai-qnext');
    if(nx){
      var f=parseInt(nx.dataset.f);
      if(f===4){showResult();return;}
      var fo=document.querySelector('#aqs'+f+' .asai-qopt');
      if(fo&&!document.querySelector('#aqs'+f+' .asai-qopt.sel')) fo.click();
      showStep(f+1);
    }
    var bk=e.target.closest('.asai-qback');
    if(bk) showStep(parseInt(bk.dataset.f)-1);
  });
}

function showStep(n){
  document.querySelectorAll('.asai-qstep').forEach(function(s){s.classList.remove('active');});
  var st=document.getElementById('aqs'+n);
  if(st) st.classList.add('active');
  for(var i=1;i<=4;i++){
    var d=document.getElementById('aqd'+i);
    if(d) d.classList.toggle('on',i<=n);
  }
}

function showResult(){
  var pkg=calcPkg();
  var waMsg=encodeURIComponent('Hi Anthony, I did the package quiz and was recommended: '+pkg.name+". I'd like to find out more.");
  document.getElementById('aqResult').innerHTML=
    '<div class="asai-rbadge">✓ Your Recommended Package</div>'+
    '<div class="asai-rpn">'+pkg.name+'</div>'+
    '<div class="asai-rpp">'+pkg.price+'</div>'+
    '<p class="asai-rdesc">'+pkg.desc+'</p>'+
    '<div class="asai-rinc"><h4>What\'s Included</h4><ul>'+
      pkg.features.map(function(f){return '<li>'+f+'</li>';}).join('')+
    '</ul></div>'+
    '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">'+
      '<a href="https://wa.me/27660018931?text='+waMsg+'" target="_blank" class="asai-rwa">💬 Claim This Package</a>'+
      '<button onclick="window.asaiCloseQuiz()" class="asai-rclose-btn">Close</button>'+
    '</div>';
  document.querySelectorAll('.asai-qstep').forEach(function(s){s.classList.remove('active');});
  document.getElementById('aqsR').classList.add('active');
  document.querySelector('.asai-qprog').style.display='none';
}

function calcPkg(){
  var g=qa.g,n=qa.n,b=qa.b;
  if(b==='premium'||n==='all'||g==='full')
    return{name:'💎 Full Business System',price:'R7,000 – R15,000 once-off',desc:'Website, AI agent, WhatsApp automation, dashboard, lead capture, and follow-up — all in one system.',features:['Website + AI + automation combined','Business dashboard','Lead capture and follow-up','WhatsApp automation + full workflows','Branding & copy included']};
  if(b==='high'||n==='automation'||n==='whatsapp'||g==='automate')
    return{name:'🧠 AI System Build',price:'R3,500 – R7,000 once-off',desc:'Full AI workflow system with custom logic, decision tools, and full deployment.',features:['Full AI workflow system','AutoSage Lite setup','Custom business logic','AI agent trained on your content','Full deployment']};
  if(b==='mid'||g==='leads'||n==='website')
    return{name:'🚀 Growth System',price:'R1,500 – R3,500 once-off',desc:'Full landing page, lead capture, automation, and hosting — even while you sleep.',features:['Full landing page','Lead capture system','Basic automation','Hosting setup','WhatsApp integration']};
  return{name:'⚡ Starter Package',price:'R500 – R1,500 once-off',desc:"Get online and working fast with a basic website or automation.",features:['Basic website OR simple automation','WhatsApp integration','Basic setup and go-live']};
}

window.asaiOpenQuiz=function(){
  qa={g:null,n:null,r:null,b:null};
  document.querySelectorAll('.asai-qstep').forEach(function(s){s.classList.remove('active');});
  document.querySelectorAll('.asai-qopt').forEach(function(o){o.classList.remove('sel');});
  document.getElementById('aqs1').classList.add('active');
  var prog=document.querySelector('.asai-qprog');
  if(prog) prog.style.display='';
  for(var i=1;i<=4;i++){var d=document.getElementById('aqd'+i);if(d)d.classList.toggle('on',i===1);}
  document.getElementById('asai-quiz-overlay').classList.add('open');
  document.body.style.overflow='hidden';
};
window.asaiCloseQuiz=closeQuiz;
function closeQuiz(){
  var ov=document.getElementById('asai-quiz-overlay');
  if(ov) ov.classList.remove('open');
  document.body.style.overflow='';
}

/* ── ATTACH QUIZ TO PACKAGE CARDS ── */
function attachQuiz(){
  /* Find ALL clickable package/pricing cards */
  var cards=document.querySelectorAll(
    '.pkc, .pkg-card, .package-card, .pricing-card, .price-card, '+
    '[class*="pkc"], [class*="pkg-card"], [class*="package-card"], '+
    '[class*="tier-card"], [class*="plan-card"], [class*="pricing"]'
  );
  cards.forEach(function(c){
    if(c.dataset.quizAttached) return;
    c.dataset.quizAttached='1';
    c.style.cursor='pointer';
    c.style.pointerEvents='auto';
    c.addEventListener('click',function(e){
      if(e.target.tagName==='A') return;
      window.asaiOpenQuiz();
    });
  });

  /* Buttons that say "Get Started", "Choose", "Select", "Find out" */
  document.querySelectorAll('button, a').forEach(function(b){
    if(b.dataset.quizAttached) return;
    var t=(b.textContent||'').toLowerCase().trim();
    if(t.indexOf('get started')>-1||t.indexOf('choose plan')>-1||
       t.indexOf('select plan')>-1||t.indexOf('find out')>-1||
       t.indexOf('choose this')>-1||t.indexOf('select this')>-1){
      b.dataset.quizAttached='1';
      b.addEventListener('click',function(e){
        e.preventDefault();e.stopPropagation();
        window.asaiOpenQuiz();
      });
    }
  });
}

/* ── FIX CAREERS APPLY BUTTONS ── */
function fixCareers(){
  document.querySelectorAll('button,a').forEach(function(el){
    if(el.dataset.careerFixed) return;
    var t=(el.textContent||'').toLowerCase().trim();
    if(t==='apply now'||t==='apply'||t.indexOf('apply now')>-1){
      el.dataset.careerFixed='1';
      var card=el.closest('[class*="career"],[class*="job"],[class*="role"],[class*="card"]');
      var ct=card?(card.textContent||'').toLowerCase():'';
      var subj='Open Application — AutoSageAI';
      if(ct.indexOf('ai')>-1||ct.indexOf('system')>-1) subj='Application: AI Systems Builder';
      else if(ct.indexOf('web')>-1) subj='Application: Web Developer';
      else if(ct.indexOf('market')>-1||ct.indexOf('digital')>-1) subj='Application: Digital Marketing Operator';
      var body='Hi Anthony,\n\nI am applying for the '+subj.replace('Application: ','')+' role.\n\nName:\nExperience:\nWhy AutoSageAI:\n';
      var href='mailto:tonybuthel@gmail.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
      if(el.tagName==='BUTTON'){
        var a=document.createElement('a');
        a.href=href; a.className=el.className+' asai-apply-btn';
        a.innerHTML=el.innerHTML; a.dataset.careerFixed='1';
        el.parentNode.replaceChild(a,el);
      } else {
        el.href=href; el.className+=' asai-apply-btn';
      }
    }
  });
}

/* ── FIX LIGHT BACKGROUND TEXT ── */
function fixLightBg(){
  /* Walk all elements, check computed background, fix text if light */
  document.querySelectorAll('section,div,article').forEach(function(el){
    try{
      var bg=window.getComputedStyle(el).backgroundColor;
      if(!bg||bg==='transparent'||bg==='rgba(0, 0, 0, 0)') return;
      /* Parse RGB */
      var m=bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if(!m) return;
      var r=+m[1],g=+m[2],b=+m[3];
      var brightness=(r*299+g*587+b*114)/1000;
      if(brightness>160){
        /* Light background — ensure dark text */
        el.style.setProperty('color','#111111','important');
        el.querySelectorAll('p,h1,h2,h3,h4,h5,span,li,a:not(.asai-apply-btn)').forEach(function(ch){
          var chBg=window.getComputedStyle(ch).backgroundColor;
          if(!chBg||chBg==='transparent'||chBg==='rgba(0, 0, 0, 0)'){
            ch.style.setProperty('color','#111111','important');
          }
        });
      }
    }catch(e){}
  });
}

/* ── FONT SIZE BOOST ── */
function boostFonts(){
  document.querySelectorAll('p,li,.desc,.description,[class*="desc"]').forEach(function(el){
    var fs=parseFloat(window.getComputedStyle(el).fontSize);
    if(fs<14) el.style.fontSize='15px';
  });
}

/* ── RUN ALL ── */
function runAll(){
  attachQuiz();
  fixCareers();
  fixLightBg();
  boostFonts();
}

document.addEventListener('DOMContentLoaded',function(){
  buildModal();
  runAll();
  /* SPA navigation observer */
  new MutationObserver(function(muts){
    if(muts.some(function(m){return m.addedNodes.length>3;}))
      setTimeout(runAll,300);
  }).observe(document.body,{childList:true,subtree:true});
});

})();
