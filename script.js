/* global script for all pages */

/* --- year in footer --- */
document.addEventListener('DOMContentLoaded', () => {
  const y = new Date().getFullYear();
  ['year','year2','year3','year4'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = y;
  });

  /* appear animations already added via CSS .appear */
});

/* --- custom cursor --- */
(function customCursor(){
  const dot = document.getElementById('cursor-dot');
  const out = document.getElementById('cursor-outline');
  if(!dot || !out) return;
  let mouseX=0, mouseY=0, outlineX=0, outlineY=0;
  const speed = 0.15; // outline lerp speed

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animate(){
    outlineX += (mouseX - outlineX) * speed;
    outlineY += (mouseY - outlineY) * speed;
    out.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(animate);
  }
  animate();

  // interactive states
  const hoverEls = document.querySelectorAll('a, button, .thumb img, .btn');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform += ' scale(0.85)';
      out.style.transform += ' scale(1.25)';
      out.style.opacity = '0.95';
    });
    el.addEventListener('mouseleave', () => {
      out.style.opacity = '1';
      // reset by forcing exact translation next tick
      setTimeout(()=> {
        out.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      },50);
    });
  });
})();

/* --- highlight active nav link by comparing path --- */
(function navActive(){
  const links = document.querySelectorAll('.nav-link');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if(href === path || (href==='index.html' && path==='')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
})();

/* --- contact form validation + fake send --- */
(function contactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const msg = document.getElementById('formMsg');

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if(!name || !email || !message){
      msg.textContent = 'Please fill all fields.';
      return;
    }
    // simple email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!re.test(email)){
      msg.textContent = 'Please enter a valid email.';
      return;
    }

    msg.textContent = 'Sending message...';
    // simulate sending
    setTimeout(()=>{
      msg.textContent = 'Message sent! Thank you — I will get back to you.';
      form.reset();
    }, 900);
  });
})();

/* --- optional: clicking thumbnails could open in new tab (simple lightbox fallback) */
(function galleryPreview(){
  const thumbs = document.querySelectorAll('.thumb img');
  thumbs.forEach(img=>{
    img.addEventListener('click', ()=> {
      if(!img.src) return;
      window.open(img.src, '_blank');
    });
  });
})();
