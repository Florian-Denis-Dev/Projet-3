// Sélection du bouton
const button = document.querySelector('#ajout');

// Écouteur d'événements pour le bouton
button.addEventListener('click', function() {
  // Sélection du contenu à effacer
  const content = document.querySelector('#gallery-modification');
  
  // Effacer le contenu
  content.innerHTML = '';
  
  // Créer le formulaire
  const form = document.createElement('form');
  const imageInput = document.createElement('input');
  const titleInput = document.createElement('input');
  const categoryInput = document.createElement('input');
  const submitButton = document.createElement('button');
  
  // Configurer le formulaire
  imageInput.type = 'file';
  imageInput.accept = 'image/*';
  titleInput.placeholder = 'Titre';
  categoryInput.placeholder = 'Catégorie';
  submitButton.textContent = 'Valider';
  
  // Ajouter le formulaire au contenu
  form.appendChild(imageInput);
  form.appendChild(titleInput);
  form.appendChild(categoryInput);
  form.appendChild(submitButton);
  content.appendChild(form);
  
  // Écouteur d'événements pour le formulaire
  form.addEventListener('submit', function(event) {
    // Empêcher le rechargement de la page
    event.preventDefault();
    
    // Créer un FormData pour stocker les données du formulaire
    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    formData.append('title', titleInput.value);
    formData.append('category', categoryInput.value);
    
    // Envoyer les données du formulaire à l'API
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Fermer la fenêtre
      window.close();
      
      // Recharger la page
      location.reload();
    })
    .catch(error => console.error(error));
  });
});