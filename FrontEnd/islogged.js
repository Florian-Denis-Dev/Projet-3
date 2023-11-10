function checkToken() {
  console.log("test 1")
  const token = window.localStorage.getItem("token");
  console.log("etape 2")
  if (token) {
    document.querySelector('body').classList.add('userLogged');
    const loginLink = document.querySelector('.login-link');
    loginLink.textContent = 'Logout';
    loginLink.href = 'index.html'; // 

    // suppression du token dans le localstorage lors du click
    loginLink.addEventListener('click', function() {
      window.localStorage.removeItem("token");
      const edition = document.querySelectorAll('.edition');
      edition.forEach((element) => {
          element.style.display = 'none !important';
      }); 
    });
  }
}

// Appelez la fonction checkToken lorsque la page est chargée
window.addEventListener('DOMContentLoaded', checkToken);

