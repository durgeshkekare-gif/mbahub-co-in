document.addEventListener('DOMContentLoaded',function(){
  // Hamburger menu
  var ham=document.querySelector('.nav-ham'),links=document.querySelector('.nav-links');
  if(ham&&links){ham.addEventListener('click',function(){var o=links.classList.toggle('open');Object.assign(links.style,o?{display:'flex',flexDirection:'column',position:'absolute',top:'62px',left:0,right:0,background:'#0B1F3A',padding:'1rem 4%',gap:'.75rem',zIndex:298,borderBottom:'1px solid rgba(255,255,255,.08)'}:{display:'none'});});}
  // Active nav
  var p=window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(function(a){if(a.getAttribute('href')&&a.getAttribute('href')!=='/'&&p.startsWith(a.getAttribute('href').replace(/\/index\.html$/,''))){a.classList.add('on');}});
  // Nav search
  var ns=document.getElementById('nav-search');
  if(ns)ns.addEventListener('keydown',function(e){if(e.key==='Enter'&&this.value.trim())window.location.href='/universities/?q='+encodeURIComponent(this.value.trim());});
});

function toggleFaq(btn){var it=btn.closest('.faq-item'),open=it.classList.contains('open');document.querySelectorAll('.faq-item.open').forEach(function(i){i.classList.remove('open');});if(!open)it.classList.add('open');}

function filterTable(type,btn,tableId){
  document.querySelectorAll('.fpill').forEach(function(b){b.classList.remove('on');});btn.classList.add('on');
  var rows=document.querySelectorAll((tableId||'#main-tbl')+' tbody tr');
  rows.forEach(function(r){var show=type==='all'||(r.dataset.type||'').includes(type)||(r.dataset.tag||'').includes(type);r.style.display=show?'':'none';});
}

function filterCards(type,btn){
  document.querySelectorAll('.fpill').forEach(function(b){b.classList.remove('on');});btn.classList.add('on');
  document.querySelectorAll('[data-card]').forEach(function(c){var show=type==='all'||(c.dataset.type||'').includes(type)||(c.dataset.tag||'').includes(type);c.style.display=show?'':'none';});
}

function liveSearch(q,scope){
  var els=document.querySelectorAll(scope||'[data-search]');
  els.forEach(function(el){var t=(el.dataset.search||'').toLowerCase();el.style.display=(!q||t.includes(q.toLowerCase()))?'':'none';});
}

function submitLead(e, formId, successId) {
  e.preventDefault();
  var form = document.getElementById(formId);
  var btn  = form.querySelector('button[type="submit"]');
  if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }

  // Collect all named fields
  var d = {};
  form.querySelectorAll('input[name], select[name]').forEach(function(el) {
    d[el.name] = el.value;
  });

  // Auto-attach source + UTM data
  var params = new URLSearchParams(window.location.search);
  d.sourceDomain  = window.location.hostname;
  d.sourcePage    = window.location.pathname;
  d.utmSource     = params.get('utm_source')   || '';
  d.utmMedium     = params.get('utm_medium')   || '';
  d.utmCampaign   = params.get('utm_campaign') || '';

  fetch('https://script.google.com/a/macros/jaro.in/s/AKfycbwkP_F6VWsRwjEawqDTcaqSD7p9Yyb6MkGpW39R9zr-ZbSAte47aJL3XMnXEgVmG6V80g/exec', {
    method : 'POST',
    mode   : 'no-cors',          // Apps Script needs no-cors
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify(d)
  })
  .then(function() {
    if (form)                              form.style.display = 'none';
    var s = document.getElementById(successId);
    if (s)                                 s.style.display = 'block';
  })
  .catch(function() {
    // Show success anyway — Apps Script with no-cors always resolves opaquely
    if (form)                              form.style.display = 'none';
    var s = document.getElementById(successId);
    if (s)                                 s.style.display = 'block';
  });
}
