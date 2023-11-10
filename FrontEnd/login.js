async function login() {
    const url = 'http://localhost:5678/api/users/login';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const data = { email: email, password: password };

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      const res = await response.json();
      window.localStorage.setItem("token", res.token);
      window.location.replace("index.html");
    } else {
      alert('Erreur dans le mail ou le mot de passe');
    }
  }

document.querySelector('form').addEventListener('submit', function(e){
  e.preventDefault();
  login();
})