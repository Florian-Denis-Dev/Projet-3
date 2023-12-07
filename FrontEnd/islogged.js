function checkToken() {
  const token = window.localStorage.getItem("token");
  if (token) {
    document.querySelector('body').classList.add('userLogged');
    const loginLink = document.querySelector('.login-link');
    loginLink.textContent = 'Logout';
    loginLink.href = 'index.html'; // 
    loginLink.addEventListener('click', function() {
      window.localStorage.removeItem("token");
    });
  }
}
checkToken();