// js/auth.js
import { supabase } from './supabase.js';

// DOM refs
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');

const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const signupEmail = document.getElementById('signupEmail');
const signupPassword = document.getElementById('signupPassword');

const loginError = document.getElementById('loginError');
const signupError = document.getElementById('signupError');

// ---- Tab Switching ----
function switchTab(tab) {
  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginTab.className = 'flex-1 py-2.5 text-sm font-semibold rounded-md transition bg-white text-purple-700 shadow-sm';
    signupTab.className = 'flex-1 py-2.5 text-sm font-semibold rounded-md transition text-gray-500 hover:text-gray-700';
    loginError.classList.add('hidden');
    signupError.classList.add('hidden');
  } else {
    loginForm.classList.add('hidden');
    signupForm.classList.remove('hidden');
    signupTab.className = 'flex-1 py-2.5 text-sm font-semibold rounded-md transition bg-white text-purple-700 shadow-sm';
    loginTab.className = 'flex-1 py-2.5 text-sm font-semibold rounded-md transition text-gray-500 hover:text-gray-700';
    loginError.classList.add('hidden');
    signupError.classList.add('hidden');
  }
}

loginTab.addEventListener('click', () => switchTab('login'));
signupTab.addEventListener('click', () => switchTab('signup'));

// ---- Helper: Show error ----
function setError(el, msg) {
  el.textContent = msg;
  el.classList.remove('hidden');
}

// ---- SIGN UP ----
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  signupError.classList.add('hidden');

  const email = signupEmail.value.trim();
  const password = signupPassword.value;

  if (password.length < 6) {
    return setError(signupError, 'Password must be at least 6 characters.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return setError(signupError, error.message);
  }

  alert(' Account created! You can now sign in.');
  switchTab('login');
  loginEmail.value = email; 
  loginPassword.value = '';
  signupEmail.value = '';
  signupPassword.value = '';
});


loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginError.classList.add('hidden');

  const email = loginEmail.value.trim();
  const password = loginPassword.value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return setError(loginError, error.message);
  }

  // Signed in successfully -> redirect to projects
  window.location.href = '/projects.html';
});

// ---- Auto-redirect if already logged in ----
// If user is already authenticated, send them straight to projects.
const { data: sessionData } = await supabase.auth.getSession();
if (sessionData?.session) {
  window.location.href = '/projects.html';
}