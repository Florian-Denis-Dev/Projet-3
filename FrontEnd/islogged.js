function checkToken() {
  const token = window.localStorage.getItem("token");
  if (token) {
    document.querySelector('body').classList.add('userLogged');
    const loginLink = document.querySelector('.login-link');
    loginLink.textContent = 'Logout';
    loginLink.href = 'index.html'; // 

    // suppression du token dans le localstorage lors du click
    loginLink.addEventListener('click', function() {
      window.localStorage.removeItem("token");
    });
  }
}

// Appelez la fonction checkToken lorsque la page est chargée
checkToken();

