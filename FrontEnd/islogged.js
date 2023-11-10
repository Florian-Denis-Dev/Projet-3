function checkToken() {
  const token = window.localStorage.getItem("token");
  if (token) {
    const loginLink = document.querySelector('.login-link');
    loginLink.textContent = 'Logout';
    loginLink.href = 'login.html'; // 

    // suppression du token dans le localstorage lors du click
    loginLink.addEventListener('click', function() {
      window.localStorage.removeItem("token");
      const edition = document.querySelectorAll('.edition');
      edition.forEach((element) => {
          element.style.display = 'none';
      }); 
    });
  }
}

// Appelez la fonction checkToken lorsque la page est chargée
window.addEventListener('DOMContentLoaded', checkToken);
