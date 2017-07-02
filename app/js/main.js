let navMain = document.querySelector('.main-nav');
let navToggle = document.querySelector('.main-nav__toggle');
let userLogin = document.querySelector('.main-nav__user-login');
let loginForm = document.querySelector('.login-form');
let loginFormClose = document.querySelector('.login-form__close');

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

userLogin.addEventListener('click', function() {
  loginForm.classList.add('login-form--opened');
});

loginFormClose.addEventListener('click', function() {
  loginForm.classList.remove('login-form--opened');
});
