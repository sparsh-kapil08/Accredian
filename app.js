/**
 * Accredian Enterprise Application Logic
 * Vanilla ES6 JavaScript
 */

const backend = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000').replace(/\/$/, '');

// FAQ Data Source
const faqsData = [
  {
    category: "About the Course",
    q: "What types of corporate training programs does Accredian offer?",
    a: "Accredian provides industry-specific, customizable training programs tailored to meet your organization's unique needs, covering domains like leadership, tech, data, fintech, and Generative AI."
  },
  {
    category: "About the Course",
    q: "What domain specializations are available?",
    a: "We offer deep domain expertise across 7 key pillars: Gen-AI Mastery, Product & Innovation Hub, Leadership Elevation, Tech & Data Insights, Operations Excellence, Digital Enterprise, and Fintech Innovation Lab."
  },
  {
    category: "About the Delivery",
    q: "Can the courses be customized for specific enterprise teams or tech stacks?",
    a: "Absolutely! Our programs are 100% customizable. We align content, case studies, proprietary datasets, schedules, and learning formats to match your corporate goals and internal tech stack."
  },
  {
    category: "About the Delivery",
    q: "Who are the instructors for these programs?",
    a: "Our courses are delivered live by global industry leaders, former C-level executives, senior data scientists, and seasoned practitioners with real-world enterprise experience."
  },
  {
    category: "Miscellaneous",
    q: "What is the ideal team size for corporate training cohorts?",
    a: "Our CAT Framework scale allows us to cater flexibly to small specialized product teams (10-15 professionals) up to enterprise-wide cohorts of 500+ learners."
  },
  {
    category: "Miscellaneous",
    q: "How do we get started with Accredian Enterprise?",
    a: "Getting started is simple: click 'Enquire Now' or reach out to enterprise@accredian.com. Our enterprise advisors will conduct a complimentary Skill Gap Analysis and build a custom upskilling roadmap for your organization."
  }
];

let activeFaqCategory = 'All';

document.addEventListener('DOMContentLoaded', () => {
  // Initial FAQ Render
  renderFaqs();

  // Mobile menu toggle listener
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', toggleMobileMenu);
  }

  // Header sticky scroll effect
  window.addEventListener('scroll', handleHeaderScroll);

  // Close modal on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeEnquireModal();
    }
  });

  // Modal backdrop click to close
  const modalContainer = document.getElementById('enquire-modal');
  if (modalContainer) {
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        closeEnquireModal();
      }
    });
  }
});

// Mobile menu drawer toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');
  
  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden');
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>`;
  } else {
    menu.classList.add('hidden');
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>`;
  }
}

// Header background change on scroll
function handleHeaderScroll() {
  const header = document.getElementById('main-header');
  if (window.scrollY > 40) {
    header.classList.add('shadow-xl', 'bg-brand-950/98');
  } else {
    header.classList.remove('shadow-xl');
  }
}

// FAQ Filter Tabs
function filterFaqs(category) {
  activeFaqCategory = category;

  document.querySelectorAll('.faq-tab-btn').forEach(btn => {
    const cat = btn.getAttribute('data-category');
    if (cat === category) {
      btn.className = 'faq-tab-btn px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 text-white shadow-lg shadow-brand-600/30 transition-all';
    } else {
      btn.className = 'faq-tab-btn px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all';
    }
  });

  renderFaqs();
}

// Render FAQs into DOM
function renderFaqs() {
  const container = document.getElementById('faq-list-container');
  if (!container) return;

  const filtered = faqsData.filter(item => activeFaqCategory === 'All' || item.category === activeFaqCategory);

  container.innerHTML = filtered.map((faq, idx) => `
    <div class="rounded-2xl bg-white border border-slate-200/90 overflow-hidden transition-all shadow-sm hover:border-brand-500/40">
      <button onclick="toggleFaq(${idx})" class="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-brand-600 transition-colors focus:outline-none">
        <span>${faq.q}</span>
        <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0 transition-transform duration-300" id="faq-arrow-bg-${idx}">
          <svg id="faq-arrow-${idx}" class="w-4 h-4 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </button>
      <div id="faq-answer-${idx}" class="hidden px-5 sm:px-6 pb-6 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
        ${faq.a}
      </div>
    </div>
  `).join('');
}

// Toggle accordion items
function toggleFaq(idx) {
  const ans = document.getElementById(`faq-answer-${idx}`);
  const arrow = document.getElementById(`faq-arrow-${idx}`);
  const arrowBg = document.getElementById(`faq-arrow-bg-${idx}`);

  if (ans.classList.contains('hidden')) {
    // Close other open accordions for clean UX
    document.querySelectorAll('[id^="faq-answer-"]').forEach((el) => el.classList.add('hidden'));
    document.querySelectorAll('[id^="faq-arrow-"]').forEach((el) => el.classList.remove('rotate-180'));
    document.querySelectorAll('[id^="faq-arrow-bg-"]').forEach((el) => el.classList.remove('bg-brand-600', 'text-white'));

    // Open target
    ans.classList.remove('hidden');
    arrow.classList.add('rotate-180');
    if (arrowBg) {
      arrowBg.classList.add('bg-brand-600', 'text-white');
    }
  } else {
    ans.classList.add('hidden');
    arrow.classList.remove('rotate-180');
    if (arrowBg) {
      arrowBg.classList.remove('bg-brand-600', 'text-white');
    }
  }
}

// Modal Functions
function openEnquireModal(preselectedDomain = null) {
  const modal = document.getElementById('enquire-modal');
  const formScreen = document.getElementById('modal-form-screen');
  const successScreen = document.getElementById('modal-success-screen');

  if (!modal) return;

  if (preselectedDomain) {
    const domainSelect = document.getElementById('form-domain');
    if (domainSelect) {
      domainSelect.value = preselectedDomain;
    }
  }

  formScreen.classList.remove('hidden');
  successScreen.classList.add('hidden');

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeEnquireModal() {
  const modal = document.getElementById('enquire-modal');
  if (!modal) return;

  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.style.overflow = '';
}

// Form submit handler
async function handleEnquireSubmit(e) {
  e.preventDefault();
  
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const phoneInput = document.getElementById('form-phone');
  const domainInput =document.getElementById('form-domain');

  const name = nameInput ? nameInput.value : 'Applicant';
  const email = emailInput ? emailInput.value : '';
  const phone = phoneInput ? phoneInput.value : '';
  const domain=domainInput? domainInput.value : "";
  if (!name || !email || !phone) {
    alert('Please fill out all required fields.');
    return;
  }

  // Display user details on success screen
  const userNameElem = document.getElementById('success-user-name');
  const refNumElem = document.getElementById('success-ref-num');

  if (userNameElem) userNameElem.innerText = name;
  if (refNumElem) refNumElem.innerText = `#ACC-ENT-${Math.floor(10000 + Math.random() * 90000)}`;
  const res = await fetch(`${backend}/info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      ticket: refNumElem ? refNumElem.innerText : '',
      domain: domain
    })
  });
  console.log(res);
  // Toggle modal screens
  document.getElementById('modal-form-screen').classList.add('hidden');
  document.getElementById('modal-success-screen').classList.remove('hidden');
}

window.openEnquireModal = openEnquireModal;
window.closeEnquireModal = closeEnquireModal;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleFaq = toggleFaq;
window.handleEnquireSubmit = handleEnquireSubmit;
