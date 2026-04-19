/* ═══════════════════════════════════════════════════════════
   AutoSageAI — fixes.js  (surgical patches only)
   Upload to GitHub alongside index.html
   Add before </body>:
     <link rel="stylesheet" href="fixes.css">
     <script src="fixes.js"></script>
   ═══════════════════════════════════════════════════════════ */

(function(){
'use strict';

/* ─────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────── */
function qs(sel, ctx){ return (ctx||document).querySelector(sel); }
function qsa(sel, ctx){ return Array.from((ctx||document).querySelectorAll(sel)); }

/* ─────────────────────────────────────────────────────────
   1. PACKAGE QUIZ MODAL
   ───────────────────────────────────────────────────────── */
var quizAnswers = {goal:null, needs:null, recurring:null, budget:null};

function buildQuizModal(){
  var el = document.createElement('div');
  el.id = 'pkg-quiz-overlay';
  el.innerHTML =
    '<div id="pkg-quiz-box">' +
      '<button class="quiz-close-btn" id="qClose">&#x2715;</button>' +
      '<div class="quiz-progress">' +
        '<div class="quiz-dot active" id="qd1"></div>' +
        '<div class="quiz-dot" id="qd2"></div>' +
        '<div class="quiz-dot" id="qd3"></div>' +
        '<div class="quiz-dot" id="qd4"></div>' +
      '</div>' +

      /* STEP 1 */
      '<div class="quiz-step active" id="qs1">' +
        '<span class="q-tag">Question 1 of 4</span>' +
        '<h2>What\'s your primary goal?</h2>' +
        '<p class="q-hint">What result matters most to your business right now?</p>' +
        '<div class="quiz-opts">' +
          '<button class="quiz-opt" data-v="leads" data-step="1"><span class="oe">📥</span><span class="ot">Get More Leads</span><span class="os">Capture &amp; convert customers</span></button>' +
          '<button class="quiz-opt" data-v="automate" data-step="1"><span class="oe">⚙️</span><span class="ot">Automate My Ops</span><span class="os">Save time &amp; reduce errors</span></button>' +
          '<button class="quiz-opt" data-v="online" data-step="1"><span class="oe">🌐</span><span class="ot">Get Online Fast</span><span class="os">Website &amp; online presence</span></button>' +
          '<button class="quiz-opt" data-v="full" data-step="1"><span class="oe">💎</span><span class="ot">Run My Whole Business</span><span class="os">Full AI-powered system</span></button>' +
        '</div>' +
        '<div class="quiz-actions"><div></div><button class="quiz-btn-next" data-from="1">Next →</button></div>' +
      '</div>' +

      /* STEP 2 */
      '<div class="quiz-step" id="qs2">' +
        '<span class="q-tag">Question 2 of 4</span>' +
        '<h2>What do you need built?</h2>' +
        '<p class="q-hint">Select the features most important to your business.</p>' +
        '<div class="quiz-opts">' +
          '<button class="quiz-opt" data-v="website" data-step="2"><span class="oe">🌐</span><span class="ot">Professional Website</span><span class="os">Landing page or full site</span></button>' +
          '<button class="quiz-opt" data-v="whatsapp" data-step="2"><span class="oe">💬</span><span class="ot">WhatsApp AI Agent</span><span class="os">24/7 automated replies</span></button>' +
          '<button class="quiz-opt" data-v="automation" data-step="2"><span class="oe">⚡</span><span class="ot">Full Automation System</span><span class="os">Workflows, bookings, follow-ups</span></button>' +
          '<button class="quiz-opt" data-v="all" data-step="2"><span class="oe">🏆</span><span class="ot">Everything Combined</span><span class="os">Website + AI + Automation</span></button>' +
        '</div>' +
        '<div class="quiz-actions"><button class="quiz-btn-back" data-from="2">← Back</button><button class="quiz-btn-next" data-from="2">Next →</button></div>' +
      '</div>' +

      /* STEP 3 */
      '<div class="quiz-step" id="qs3">' +
        '<span class="q-tag">Question 3 of 4</span>' +
        '<h2>Once-off or ongoing support?</h2>' +
        '<p class="q-hint">Do you want a one-time build, or continued monthly management?</p>' +
        '<div class="quiz-opts single">' +
          '<button class="quiz-opt" data-v="once" data-step="3"><span class="oe">🔨</span><span class="ot">Once-Off Build Only</span><span class="os">Get it built and take it from there</span></button>' +
          '<button class="quiz-opt" data-v="monthly" data-step="3"><span class="oe">📅</span><span class="ot">Monthly Retainer</span><span class="os">Ongoing management and improvements</span></button>' +
          '<button class="quiz-opt" data-v="both" data-step="3"><span class="oe">🚀</span><span class="ot">Build + Monthly Support</span><span class="os">Best value — build it right, keep it running</span></button>' +
        '</div>' +
        '<div class="quiz-actions"><button class="quiz-btn-back" data-from="3">← Back</button><button class="quiz-btn-next" data-from="3">Next →</button></div>' +
      '</div>' +

      /* STEP 4 */
      '<div class="quiz-step" id="qs4">' +
        '<span class="q-tag">Question 4 of 4</span>' +
        '<h2>What\'s your budget range?</h2>' +
        '<p class="q-hint">All prices are once-off unless a retainer is selected.</p>' +
        '<div class="quiz-opts single">' +
          '<button class="quiz-opt" data-v="low" data-step="4"><span class="oe">💵</span><span class="ot">R500 – R1,500</span><span class="os">Just getting started</span></button>' +
          '<button class="quiz-opt" data-v="mid" data-step="4"><span class="oe">💰</span><span class="ot">R1,500 – R3,500</span><span class="os">Ready to grow</span></button>' +
          '<button class="quiz-opt" data-v="high" data-step="4"><span class="oe">💎</span><span class="ot">R3,500 – R7,000</span><span class="os">Serious about AI</span></button>' +
          '<button class="quiz-opt" data-v="premium" data-step="4"><span class="oe">🏆</span><span class="ot">R7,000+</span><span class="os">Full business transformation</span></button>' +
        '</div>' +
        '<div class="quiz-actions"><button class="quiz-btn-back" data-from="4">← Back</button><button class="quiz-btn-next" data-from="4" id="qShowResult">See My Package →</button></div>' +
      '</div>' +

      /* RESULT */
      '<div class="quiz-step" id="qsResult">' +
        '<div class="quiz-result" id="qResult"></div>' +
      '</div>' +

    '</div>';
  document.body.appendChild(el);

  /* Close */
  el.querySelector('#qClose').addEventListener('click', closeQuiz);
  el.addEventListener('click', function(e){ if(e.target===el) closeQuiz(); });

  /* Option selection */
  el.addEventListener('click', function(e){
    var opt = e.target.closest('.quiz-opt');
    if(!opt) return;
    var step = opt.dataset.step;
    var parent = opt.closest('.quiz-opts');
    parent.querySelectorAll('.quiz-opt').forEach(function(o){ o.classList.remove('sel'); });
    opt.classList.add('sel');
    var keys = ['goal','needs','recurring','budget'];
    quizAnswers[keys[step-1]] = opt.dataset.v;
  });

  /* Next / Back */
  el.addEventListener('click', function(e){
    var btn = e.target.closest('.quiz-btn-next');
    if(btn){
      var from = parseInt(btn.dataset.from);
      if(from === 4){ showResult(); return; }
      /* ensure selection */
      var firstOpt = qs('#qs'+from+' .quiz-opt');
      if(firstOpt && !qs('#qs'+from+' .quiz-opt.sel')) firstOpt.click();
      showStep(from+1);
    }
    var back = e.target.closest('.quiz-btn-back');
    if(back){
      showStep(parseInt(back.dataset.from)-1);
    }
  });
}

function showStep(n){
  qsa('.quiz-step').forEach(function(s){ s.classList.remove('active'); });
  var step = qs('#qs'+n);
  if(step) step.classList.add('active');
  for(var i=1;i<=4;i++){
    var dot = qs('#qd'+i);
    if(dot) dot.classList.toggle('active', i<=n);
  }
}

function showResult(){
  var pkg = calcPackage();
  qs('#qResult').innerHTML =
    '<div class="rbadge">✓ Your Recommended Package</div>' +
    '<div class="rpn">'+pkg.name+'</div>' +
    '<div class="rpp">'+pkg.price+'</div>' +
    '<p class="rdesc">'+pkg.desc+'</p>' +
    '<div class="rinc"><h4>What\'s Included</h4><ul>'+
      pkg.features.map(function(f){ return '<li>'+f+'</li>'; }).join('')+
    '</ul></div>' +
    '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">' +
      '<a href="https://wa.me/27660018931?text='+encodeURIComponent('Hi Anthony, I did the package quiz and was recommended the '+pkg.name+". I'd like to find out more.")+'" target="_blank" class="quiz-wa-btn">💬 Claim This Package</a>' +
      '<button onclick="closeQuiz()" class="quiz-btn-back" style="border-radius:8px">Close</button>' +
    '</div>';
  qsa('.quiz-step').forEach(function(s){ s.classList.remove('active'); });
  qs('#qsResult').classList.add('active');
  qs('.quiz-progress').style.display = 'none';
}

function calcPackage(){
  var g=quizAnswers.goal, n=quizAnswers.needs, b=quizAnswers.budget;
  if(b==='premium'||n==='all'||g==='full')
    return{name:'💎 Full Business System',price:'R7,000 – R15,000 once-off',desc:'This runs your entire business operation. Website, AI agent, WhatsApp automation, dashboard, lead capture, and follow-up — all in one system.',features:['Website + AI + automation combined','Business dashboard','Lead capture and follow-up system','WhatsApp automation + full workflows','Branding & copy included','Full deployment & handover']};
  if(b==='high'||n==='automation'||n==='whatsapp'||g==='automate')
    return{name:'🧠 AI System Build',price:'R3,500 – R7,000 once-off',desc:'This replaces manual thinking in your business. A full AI workflow system with custom logic, decision tools, and full deployment.',features:['Full AI workflow system','Decision tool / AutoSage Lite setup','Custom business logic','AI agent trained on your content','Full deployment','WhatsApp integration']};
  if(b==='mid'||g==='leads'||n==='website')
    return{name:'🚀 Growth System',price:'R1,500 – R3,500 once-off',desc:'This gets your business capturing leads automatically — even while you sleep. Full landing page, lead capture, automation, and hosting.',features:['Full landing page','Lead capture system','Basic automation','Hosting setup and go-live','WhatsApp integration']};
  return{name:'⚡ Starter Package',price:'R500 – R1,500 once-off',desc:"Let's get you online and working fast. A basic website or simple automation with WhatsApp integration.",features:['Basic website OR simple automation','WhatsApp integration','Basic setup and go-live','5 business day delivery']};
}

window.openPackageQuiz = function(){
  quizAnswers = {goal:null,needs:null,recurring:null,budget:null};
  qsa('.quiz-step').forEach(function(s){ s.classList.remove('active'); });
  qsa('.quiz-dot').forEach(function(d){ d.classList.remove('active'); });
  qs('#qs1').classList.add('active');
  qs('#qd1').classList.add('active');
  qs('.quiz-progress').style.display = '';
  qsa('.quiz-opt').forEach(function(o){ o.classList.remove('sel'); });
  qs('#pkg-quiz-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeQuiz = function(){
  qs('#pkg-quiz-overlay').classList.remove('open');
  document.body.style.overflow = '';
};

/* ─────────────────────────────────────────────────────────
   2. ATTACH QUIZ TO ALL PACKAGE CARDS + FIND-MY-PACKAGE BTNS
   ───────────────────────────────────────────────────────── */
function attachQuizTriggers(){
  /* Any element with these classes or text triggers the quiz */
  var selectors = [
    '.pkg-card', '.package-card', '.pricing-card', '.price-card',
    '[class*="pkg"][class*="card"]',
    '[class*="package"][class*="card"]'
  ];
  selectors.forEach(function(sel){
    qsa(sel).forEach(function(card){
      /* Remove any inline onclick that freezes or does nothing */
      card.removeAttribute('onclick');
      card.style.cursor = 'pointer';
      card.style.pointerEvents = 'auto';
      card.addEventListener('click', function(e){
        if(e.target.tagName === 'A') return; /* allow links inside */
        window.openPackageQuiz();
      });
    });
  });

  /* Buttons with "find my package" / "get started" text */
  qsa('button, a').forEach(function(el){
    var txt = (el.textContent||'').toLowerCase();
    if(txt.indexOf('find my package') > -1 ||
       txt.indexOf('find out if this fits') > -1 ||
       txt.indexOf('package quiz') > -1){
      el.addEventListener('click', function(e){
        e.preventDefault();
        window.openPackageQuiz();
      });
    }
  });

  /* Package buttons inside cards */
  qsa('[class*="btn"][class*="pkg"], [class*="pkg"][class*="btn"]').forEach(function(btn){
    btn.removeAttribute('onclick');
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      window.openPackageQuiz();
    });
  });
}

/* ─────────────────────────────────────────────────────────
   3. FIX CAREERS APPLY BUTTONS → MAILTO
   ───────────────────────────────────────────────────────── */
function fixCareersApply(){
  /* Find any button/link that says "Apply Now" and point to mailto */
  var roles = {
    'ai': 'Application: AI Systems Builder',
    'web': 'Application: Web Developer',
    'digital': 'Application: Digital Marketing Operator',
    'marketing': 'Application: Digital Marketing Operator',
    'default': 'Open Application — AutoSageAI'
  };

  qsa('button, a, [class*="apply"]').forEach(function(el){
    var txt = (el.textContent||el.innerText||'').toLowerCase().trim();
    if(txt === 'apply now' || txt === 'apply' || txt.indexOf('apply now') > -1){
      /* Detect role from parent card context */
      var card = el.closest('[class*="career"], [class*="job"], [class*="role"]');
      var cardText = card ? (card.textContent||'').toLowerCase() : '';
      var subject = roles.default;
      if(cardText.indexOf('ai') > -1 || cardText.indexOf('systems') > -1) subject = roles.ai;
      else if(cardText.indexOf('web') > -1) subject = roles.web;
      else if(cardText.indexOf('marketing') > -1 || cardText.indexOf('digital') > -1) subject = roles.marketing;

      var body = 'Hi Anthony,\n\nI am applying for the '+subject.replace('Application: ','')+' role.\n\nName:\nExperience:\nWhy AutoSageAI:\n';
      var href = 'mailto:tonybuthel@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);

      /* Convert to link if it's a button */
      if(el.tagName === 'BUTTON'){
        var link = document.createElement('a');
        link.href = href;
        link.className = el.className + ' career-apply-link';
        link.textContent = el.textContent;
        el.parentNode.replaceChild(link, el);
      } else {
        el.href = href;
        el.className += ' career-apply-link';
        el.target = ''; /* open in same tab so mail client opens */
      }
    }
  });

  /* Also fix "Send an Open Application" links */
  qsa('a, button').forEach(function(el){
    var txt = (el.textContent||'').toLowerCase();
    if(txt.indexOf('open application') > -1){
      el.href = 'mailto:tonybuthel@gmail.com?subject=Open%20Application%20%E2%80%94%20AutoSageAI&body=Hi%20Anthony%2C%0A%0AI%27d%20like%20to%20work%20with%20AutoSageAI.%0A%0AName%3A%0AWhat%20I%20do%3A%0AWhy%20AutoSageAI%3A';
    }
  });
}

/* ─────────────────────────────────────────────────────────
   4. REMOVE BLOG / ABOUT US / CAREERS FROM DIGITAL MARKETING
   ───────────────────────────────────────────────────────── */
function cleanDigitalMarketing(){
  /* Find the digital marketing section/page */
  var dmContainers = qsa(
    '#digital-marketing, #digitalMarketing, #dm, [data-page="digital-marketing"], ' +
    '[class*="digital-marketing"], [class*="digital_marketing"]'
  );

  dmContainers.forEach(function(dm){
    /* Remove list items that mention blog, about us, careers */
    qsa('li, p, .service-item, .feature, .deliverable', dm).forEach(function(item){
      var txt = (item.textContent||'').toLowerCase();
      if(txt.indexOf('blog') > -1 || txt.indexOf('about us') > -1 ||
         txt.indexOf('careers') > -1 || txt.indexOf('about page') > -1){
        item.style.display = 'none';
      }
    });
  });

  /* Also check service description areas for DM content */
  qsa('.service-desc, .service-description, [class*="service"][class*="desc"]').forEach(function(desc){
    /* Look for parent that's digital marketing */
    var parent = desc.closest('[class*="digital"], [class*="marketing"]');
    if(!parent) return;
    var items = qsa('li', parent);
    items.forEach(function(li){
      var t = li.textContent.toLowerCase();
      if(t.indexOf('blog') > -1 || t.indexOf('about us') > -1 || t.indexOf('careers') > -1){
        li.style.display = 'none';
      }
    });
  });
}

/* ─────────────────────────────────────────────────────────
   5. INJECT WEB DEVELOPMENT & MAINTENANCE SERVICE CARD
   ───────────────────────────────────────────────────────── */
function injectWebDevService(){
  /* Only inject once */
  if(document.getElementById('webdev-service-injected')) return;

  /* Find the services grid / container */
  var grids = qsa(
    '#services .services-grid, #services .service-grid, ' +
    '.services-section .services-grid, .services-grid, ' +
    '[class*="service"][class*="grid"]'
  );

  var webDevCard = document.createElement('div');
  webDevCard.id = 'webdev-service-injected';
  webDevCard.className = 'webdev-service-card';
  webDevCard.innerHTML =
    '<div class="svc-num">05 — WEB DEVELOPMENT &amp; MAINTENANCE</div>' +
    '<span class="svc-icon">🌐</span>' +
    '<h3 class="svc-title">Web Development &amp; Maintenance</h3>' +
    '<p class="svc-desc">We build fast, professional websites and landing pages — and keep them running. From basic online presence to full lead-capture systems. Live in 48 hours. Maintained monthly so you never have to worry about downtime, updates, or broken links.</p>' +
    '<div class="svc-tags">' +
      '<span class="tag">Landing Pages</span>' +
      '<span class="tag">Lead Capture</span>' +
      '<span class="tag">Hosting &amp; Updates</span>' +
      '<span class="tag">48h Delivery</span>' +
      '<span class="tag">Monthly Maintenance</span>' +
    '</div>';

  if(grids.length > 0){
    /* Insert as last child of the first services grid */
    grids[0].appendChild(webDevCard);
  } else {
    /* Fallback: insert after the services section heading */
    var svcSection = qs('#services, .services-section');
    if(svcSection) svcSection.appendChild(webDevCard);
  }
}

/* ─────────────────────────────────────────────────────────
   6. ALSO INJECT WEBDEV INTO DIGITAL MARKETING SERVICES LIST
   ───────────────────────────────────────────────────────── */
function injectWebDevIntoDM(){
  if(document.getElementById('webdev-dm-injected')) return;
  var dmSections = qsa(
    '#digital-marketing, #digitalMarketing, ' +
    '[data-page="digital-marketing"], [class*="digital-marketing"]'
  );
  dmSections.forEach(function(dm){
    var list = qs('ul, .service-list, .features-list', dm);
    if(!list) return;
    var li = document.createElement('li');
    li.id = 'webdev-dm-injected';
    li.textContent = 'Web Development & Maintenance';
    list.appendChild(li);
  });
}

/* ─────────────────────────────────────────────────────────
   BOOT — run after DOM is ready and again after any SPA nav
   ───────────────────────────────────────────────────────── */
function runFixes(){
  attachQuizTriggers();
  fixCareersApply();
  cleanDigitalMarketing();
  injectWebDevService();
  injectWebDevIntoDM();
}

/* Build modal once */
document.addEventListener('DOMContentLoaded', function(){
  buildQuizModal();
  runFixes();

  /* Re-run after any page navigation in the SPA */
  /* Watch for DOM mutations (page content changes) */
  var observer = new MutationObserver(function(mutations){
    var significant = mutations.some(function(m){
      return m.addedNodes.length > 2;
    });
    if(significant) setTimeout(runFixes, 200);
  });
  observer.observe(document.body, {childList:true, subtree:true});
});

/* Expose global so inline onclick="openPackageQuiz()" still works */
window.openPackageQuiz = window.openPackageQuiz || function(){ /* built above */ };

})();
