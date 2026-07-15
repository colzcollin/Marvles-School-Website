(() => {
  const header=document.querySelector('.site-header');
  const menuBtn=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav');
  menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.textContent=open?'✕':'☰'});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');if(menuBtn){menuBtn.textContent='☰';menuBtn.setAttribute('aria-expanded','false')}}));
  const topBtn=document.querySelector('.back-to-top');
  const onScroll=()=>{header?.classList.toggle('is-scrolled',scrollY>20);topBtn?.classList.toggle('show',scrollY>500)};
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  topBtn?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  const counterIO=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=Number(el.dataset.target||0),suffix=el.dataset.suffix||'';let start=0;const step=Math.max(1,Math.ceil(target/55));const timer=setInterval(()=>{start=Math.min(target,start+step);el.textContent=start+suffix;if(start>=target)clearInterval(timer)},25);counterIO.unobserve(el)}),{threshold:.5});
  document.querySelectorAll('.stat-number[data-target]').forEach(el=>counterIO.observe(el));
  document.querySelectorAll('[data-gallery-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-gallery-filter]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.galleryFilter;document.querySelectorAll('[data-category]').forEach(item=>item.hidden=!(f==='all'||item.dataset.category===f))}));
  document.querySelectorAll('form[data-offline-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return}const status=form.querySelector('.form-status');status?.classList.add('show');form.reset()}));
  document.querySelectorAll('img:not([loading])').forEach(img=>img.loading='lazy');
})();