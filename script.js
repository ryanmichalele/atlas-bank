(function () {
  document.querySelectorAll('[data-close]').forEach(function (button) {
    button.addEventListener('click', function () {
      var target = document.getElementById(button.getAttribute('data-close'));
      if (target) target.remove();
    });
  });

  var menuToggle = document.querySelector('.menu-toggle');
  var mobileDrawer = document.getElementById('mobileMenuDrawer');

  function openMobileMenu() {
    document.body.classList.add('mobile-menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    if (mobileDrawer) mobileDrawer.setAttribute('aria-hidden', 'false');
  }

  function closeMobileMenu() {
    document.body.classList.remove('mobile-menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    if (mobileDrawer) mobileDrawer.setAttribute('aria-hidden', 'true');
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', function (event) {
      event.stopPropagation();
      if (document.body.classList.contains('mobile-menu-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  document.querySelectorAll('[data-mobile-menu-close]').forEach(function (control) {
    control.addEventListener('click', closeMobileMenu);
  });

  var navItems = document.querySelectorAll('.primary-nav__item');
  function closeNavDropdowns() {
    navItems.forEach(function (item) {
      item.classList.remove('is-open');
      var trigger = item.querySelector('.primary-nav__trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }

  navItems.forEach(function (item) {
    var trigger = item.querySelector('.primary-nav__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', function (event) {
      event.stopPropagation();
      var shouldOpen = !item.classList.contains('is-open');
      closeNavDropdowns();
      item.classList.toggle('is-open', shouldOpen);
      trigger.setAttribute('aria-expanded', String(shouldOpen));
    });
  });

  document.addEventListener('click', function (event) {
    if (!event.target.closest('.primary-nav__item')) closeNavDropdowns();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeNavDropdowns();
      closeMobileMenu();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 920) closeMobileMenu();
  });

  var loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var userId = document.getElementById('userId');
      if (userId && userId.value.trim() === '') {
        userId.focus();
        return;
      }
      window.location.href = 'dashboard.html';
    });
  }
}());
