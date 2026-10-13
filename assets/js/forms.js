/**
 * MIDIR FUTURES — Contact Form JS
 * Client-side validation + honest submit behaviour
 */

(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const successMsg = document.getElementById('form-success');
  const errorBanner = document.getElementById('form-error-banner');

  // ── Validation rules ──────────────────────────────
  const validators = {
    name: function (val) {
      if (!val.trim()) return 'Please enter your full name.';
      if (val.trim().length < 2) return 'Name must be at least 2 characters.';
      return null;
    },
    email: function (val) {
      if (!val.trim()) return 'Please enter your email address.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email address.';
      return null;
    },
    message: function (val) {
      if (!val.trim()) return 'Please enter a message.';
      if (val.trim().length < 10) return 'Message must be at least 10 characters.';
      return null;
    },
    privacy: function (val) {
      if (!val) return 'You must acknowledge the privacy notice to continue.';
      return null;
    }
  };

  // ── Show / clear field error ──────────────────────
  function showFieldError(field, msg) {
    field.classList.add('error');
    const errEl = document.getElementById(field.id + '-error');
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.add('visible');
    }
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', field.id + '-error');
  }

  function clearFieldError(field) {
    field.classList.remove('error');
    const errEl = document.getElementById(field.id + '-error');
    if (errEl) {
      errEl.textContent = '';
      errEl.classList.remove('visible');
    }
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }

  // ── Real-time validation on blur ─────────────────
  ['name', 'email', 'message'].forEach(function (id) {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('blur', function () {
      const err = validators[id] ? validators[id](field.value) : null;
      err ? showFieldError(field, err) : clearFieldError(field);
    });
    field.addEventListener('input', function () {
      if (field.classList.contains('error')) clearFieldError(field);
    });
  });

  // ── Submit ────────────────────────────────────────
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let valid = true;

    // Validate each field
    ['name', 'email', 'message'].forEach(function (id) {
      const field = document.getElementById(id);
      if (!field) return;
      const err = validators[id](field.value);
      if (err) {
        showFieldError(field, err);
        valid = false;
      } else {
        clearFieldError(field);
      }
    });

    const privacyField = document.getElementById('privacy');
    if (privacyField && !privacyField.checked) {
      const err = validators.privacy(false);
      showFieldError(privacyField, err);
      valid = false;
    } else if (privacyField) {
      clearFieldError(privacyField);
    }

    if (!valid) {
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Check if form endpoint is configured
    const cfg = window.SITE_CONFIG;
    const endpoint = cfg && cfg.formEndpoint ? cfg.formEndpoint : '';

    if (!endpoint) {
      // Show honest message — form endpoint not yet configured
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.innerHTML = '<strong>Form received locally.</strong> This website\'s contact form is not yet connected to a mail service. '
          + 'To get in touch, please email us directly at '
          + (cfg && cfg.email && !cfg.email.includes('REPLACE')
              ? '<a href="mailto:' + cfg.email + '">' + cfg.email + '</a>'
              : 'the address provided on this page')
          + '.';
        successMsg.focus();
      }
      return;
    }

    // If endpoint is configured, submit via fetch
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const data = new FormData(form);

    fetch(endpoint, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (response) {
      if (response.ok) {
        if (successMsg) {
          successMsg.innerHTML = '<strong>Message sent.</strong> Thank you for reaching out. We will be in touch shortly.';
          successMsg.style.display = 'block';
          successMsg.focus();
        }
        form.reset();
      } else {
        throw new Error('Server error');
      }
    })
    .catch(function () {
      if (errorBanner) {
        errorBanner.style.display = 'block';
        errorBanner.textContent = 'Something went wrong. Please try again or email us directly.';
        errorBanner.focus();
      }
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    });
  });

})();
