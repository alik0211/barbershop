let navMain = document.querySelector('.main-nav');
let navToggle = navMain.querySelector('.main-nav__toggle');
let navLogin = navMain.querySelector('.main-nav__user-login');
let loginForm = document.querySelector('.login-form');
let loginFormClose = loginForm.querySelector('.login-form__close');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.remove('main-nav--opened');
    navMain.classList.add('main-nav--closed');
  }
});

navLogin.addEventListener('click', function() {
  loginForm.classList.add('login-form--opened');
});

loginFormClose.addEventListener('click', function() {
  loginForm.classList.remove('login-form--opened');
});
