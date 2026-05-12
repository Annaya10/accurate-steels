/* ============================================
   ACCURATE STEEL FABRICATION — MAIN JS
   Multi-page compatible
   ============================================ */

// --- Sticky header on scroll ---
const header = document.getElementById('site-header');
// if (header) {
//   window.addEventListener('scroll', () => {
//     header.style.background = window.scrollY > 40
//       ? 'rgba(15,20,26,0.98)'
//       : 'rgba(15,20,26,0.95)';
//   });
// }

// --- Mobile hamburger ---
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');
if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mainNav.classList.toggle('open');
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mainNav.classList.remove('open');
    });
  });
}

// --- Scroll fade-in animation ---
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.service-card, .cert-card, .testimonial, .process-step, .project-card, ' +
  '.milestone, .stat, .team-card, .timeline-content, .vm-card, .value-item, ' +
  '.proj-card, .maintenance-card, .cert-item, .quality-point, .service-feature, ' +
  '.infra-stat, .ps-stat, .contact-detail, .svc-img-card, .gallery-item, ' +
  '.wwa-stat, .cap-card, .testimonial-card, .ceo-grid, .maint-icon-block'
).forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// --- Project filter (works on both index and projects page) ---
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card, .proj-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
    });
  });
});

// --- RFQ Form submission ---
const rfqForm     = document.getElementById('rfq-form');
const formSuccess = document.getElementById('form-success');
if (rfqForm && formSuccess) {
  rfqForm.addEventListener('submit', e => {
    e.preventDefault();
    const required = rfqForm.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#ef4444';
        valid = false;
      }
    });
    if (!valid) return;

    const submitBtn = rfqForm.querySelector('[type="submit"]');
    const origText  = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled  = true;

    setTimeout(() => {
      rfqForm.reset();
      submitBtn.innerHTML = origText;
      submitBtn.disabled  = false;
      formSuccess.style.display = 'flex';
      setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
    }, 1200);
  });
}

// --- Smooth scroll for same-page anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- Active nav link on scroll (index page only) ---
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.main-nav a');
if (sections.length > 2) {
  const scrollObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => {
          if (l.getAttribute('href') === '#' + entry.target.id) {
            l.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => scrollObserver.observe(s));
}

// --- Service page sticky nav highlight ---
const serviceNavLinks = document.querySelectorAll('.service-nav-link');
if (serviceNavLinks.length) {
  const serviceObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        serviceNavLinks.forEach(l => {
          l.style.borderBottomColor = 'transparent';
          l.style.color = 'var(--steel)';
        });
        const active = document.querySelector(`.service-nav-link[href="#${entry.target.id}"]`);
        if (active) {
          active.style.borderBottomColor = 'var(--steel-blue)';
          active.style.color = 'var(--steel-blue)';
        }
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('.service-detail[id]').forEach(s => serviceObs.observe(s));
}

// --- Animated counters (About page) ---
const counterEls = document.querySelectorAll('.counter-num');
if (counterEls.length) {
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const step   = Math.ceil(target / (duration / 16));
      let current  = 0;
      const timer  = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toLocaleString();
      }, 16);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => countObserver.observe(el));
}
