function openModal() {
    document.getElementById('auth-modal').classList.remove('hidden');
    document.getElementById('modal-overlay').classList.remove('hidden');
  }
  
  function closeModal() {
    document.getElementById('auth-modal').classList.add('hidden');
    document.getElementById('modal-overlay').classList.add('hidden');
  }
  
  function showSignUp() {
    document.getElementById('sign-up-form').classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
  
    document.getElementById('signUpTab').classList.add('active');
    document.getElementById('loginTab').classList.remove('active');
  }
  
  function showLogin() {
    document.getElementById('sign-up-form').classList.add('hidden');
    document.getElementById('login-form').classList.remove('hidden');
  
    document.getElementById('signUpTab').classList.remove('active');
    document.getElementById('loginTab').classList.add('active');
  }