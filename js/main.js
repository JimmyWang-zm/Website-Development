/* ============================================
   KWC Motor — Main JavaScript (main.js)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ====== Header scroll effect ====== */
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ====== Mobile menu toggle ====== */
  const mobileToggle = document.querySelector('.header__mobile-toggle');
  const nav = document.querySelector('.header__nav');
  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Mobile mega-menu toggle (tap to expand)
    const navItems = nav.querySelectorAll('.header__nav-item');
    navItems.forEach(item => {
      const link = item.querySelector('.header__nav-link');
      const mega = item.querySelector('.mega-menu');
      if (link && mega) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 1024) {
            e.preventDefault();
            item.classList.toggle('open');
          }
        });
      }
    });
  }

  /* ====== Scroll-triggered animations ====== */
  const animatedEls = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-children');
  if (animatedEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(el => observer.observe(el));
  }

  /* ====== Counter animation (Trust Bar) ====== */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          const duration = 2000;
          const start = performance.now();

          const animate = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.round(eased * target);
            el.textContent = prefix + current + suffix;
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ====== Tabs ====== */
  const tabContainers = document.querySelectorAll('[data-tabs]');
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab');
    const panels = container.querySelectorAll('.tab-panel');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = container.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  });

  /* ====== Form validation ====== */
  const forms = document.querySelectorAll('[data-validate]');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(err => err.remove());
      form.querySelectorAll('.form-input.error, .form-textarea.error').forEach(el => el.classList.remove('error'));

      // Validate required fields
      form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('error');
          const errorEl = document.createElement('span');
          errorEl.className = 'form-error';
          errorEl.textContent = '此字段为必填项';
          field.parentNode.appendChild(errorEl);
        }
      });

      // Validate email
      const emailField = form.querySelector('[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
          valid = false;
          emailField.classList.add('error');
          const errorEl = document.createElement('span');
          errorEl.className = 'form-error';
          errorEl.textContent = '请输入有效的邮箱地址';
          emailField.parentNode.appendChild(errorEl);
        }
      }

      if (valid) {
        const action = form.getAttribute('action');
        if (action && action.includes('formspree.io')) {
          // AJAX submit to Formspree
          const submitBtn = form.querySelector('[type="submit"]');
          if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = '提交中...'; }
          fetch(action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
          }).then(res => {
            if (res.ok) {
              const successMsg = document.createElement('div');
              successMsg.style.cssText = 'padding:16px;background:#10B981;color:#fff;border-radius:8px;text-align:center;margin-top:16px;font-weight:600;';
              successMsg.textContent = '提交成功！我们会尽快与您联系。';
              form.appendChild(successMsg);
              form.reset();
              setTimeout(() => successMsg.remove(), 4000);
            } else {
              alert('提交失败，请发送邮件至 kunmiwang@gmail.com');
            }
          }).catch(() => alert('网络错误，请稍后重试或发送邮件至 kunmiwang@gmail.com'))
            .finally(() => { if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = '提交询盘 →'; } });
        } else {
          // Show success message (demo mode - no action configured)
          const successMsg = document.createElement('div');
          successMsg.style.cssText = 'padding:16px;background:#10B981;color:#fff;border-radius:8px;text-align:center;margin-top:16px;font-weight:600;';
          successMsg.textContent = '提交成功！我们会尽快与您联系。';
          form.appendChild(successMsg);

          // Reset form
          setTimeout(() => {
            form.reset();
            successMsg.remove();
          }, 3000);
        }
      }
    });
  });

  /* ====== Smooth scroll for anchor links ====== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height'), 10) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ====== Back to top ====== */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
