// phone used on site
const PHONE = '+919780010087';

// Services list (edit prices or add more)
const services = [
  { id:1, name:"PAN card", price:"250 Rs", desc:"PAN application & correction assistance."},
  { id:2, name:"Aadhaar card", price:"50 Rs", desc:"Aadhaar enrolment and update help."},
  { id:3, name:"Ayushman card", price:"100 Rs", desc:"Ayushman Bharat enrollment & queries."},
  { id:4, name:"EPFO fund withdrawal", price:"300 Rs", desc:"EPFO claim & fund withdrawal support."},
  { id:5, name:"Caste certificate", price:"300 Rs", desc:"Caste certificate application help."},
  { id:6, name:"Residence / Income cert.", price:"250 Rs", desc:"Residence & income certificate assistance."}
];

// render services list
function renderServices(){
  const container = document.getElementById('servicesList');
  if(!container) return;
  container.innerHTML = '';
  services.forEach(s=>{
    const btn = document.createElement('div');
    btn.className = 'service';
    btn.innerHTML = `<div><div class="title">${s.name}</div><div class="muted">${s.desc}</div></div><div class="price">${s.price}</div>`;
    btn.addEventListener('click', ()=> openServiceDetail(s));
    container.appendChild(btn);
  });
}

// open service detail
function openServiceDetail(service){
  const panel = document.getElementById('serviceDetail');
  document.getElementById('detailName').innerText = service.name;
  document.getElementById('detailDesc').innerText = service.desc;
  document.getElementById('detailPrice').innerText = service.price;
  const wa = document.getElementById('detailWA');
  wa.href = `https://wa.me/919780010087?text=${encodeURIComponent(service.name + ' - ' + service.price + ' | I want this service')}`;
  const call = document.getElementById('detailCall');
  if(call) call.href = 'tel:' + PHONE;
  panel.style.display = 'block';
  panel.setAttribute('aria-hidden','false');
  switchPage('services', false);
}

// close detail
function closeServiceDetail(){
  const panel = document.getElementById('serviceDetail');
  panel.style.display = 'none';
  panel.setAttribute('aria-hidden','true');
}

// switch pages
function switchPage(page, hideDetail=true){
  document.querySelectorAll('.page').forEach(p=> p.classList.remove('active'));
  const t = document.getElementById(page);
  if(t) t.classList.add('active');

  document.querySelectorAll('.box-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.page === page);
  });

  if(hideDetail) closeServiceDetail();
  // smooth scroll to top
  window.scrollTo({top:0,behavior:'smooth'});
}

// init
(function init(){
  // fill phone links
  const phoneLink = document.getElementById('phoneLink');
  if(phoneLink) phoneLink.href = 'tel:' + PHONE.replace(/\s+/g,'');

  const waLink = document.getElementById('waLink');
  if(waLink) waLink.href = 'https://wa.me/' + PHONE.replace(/\+| /g,'');

  renderServices();
  switchPage('home');
})();
