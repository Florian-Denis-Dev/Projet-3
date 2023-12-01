// Sélection du bouton dans le DOM
const validateButton = document.getElementById('valider');
const dialog = document.getElementById('dialog');
const token = window.localStorage.getItem("token");
const form = document.querySelector('.ajout-text');
const fileInput = document.getElementById('imageUpload');

// Ajoutez un écouteur d'événements au bouton
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const file = fileInput.files[0];
  if (file) {
    // Créez un FormData pour stocker le fichier
    const formData = new FormData();
    formData.append('image', file);

    // Ajoutez le nom du champ et la catégorie au formData
    const fieldName = document.getElementById('titre').value;
    const category = document.getElementById('categorie').value;
    formData.append('title', fieldName);
    formData.append('category', category);

    // Envoyez une requête POST à votre API avec le fichier
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData,
      headers: {'Authorization': `Bearer ${token}`}
      })
    .then(response => response.json())
    .then(data => {
      console.log('Image uploaded successfully:', data);

      // Fermez la pop-up
      closePopup(); // retirer class open pop up
      
      // Supprimez les données de votre galerie
     

      // Appelez votre fonction addToHTML
      generateList();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } else {
    console.log('Aucun fichier sélectionné');
  }
});

// Ajoutez un écouteur d'événements pour le changement de fichier
fileInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Sélectionnez la div dans laquelle vous voulez afficher l'image
      const imageDiv = document.querySelector('.ajout-photo');
      // Effacez le contenu de la div
      imageDiv.innerHTML = '';
      // Créez une nouvelle image et définissez sa source sur les données du fichier
      const img = document.createElement('img');
      img.src = e.target.result;
      // Définissez la largeur et la hauteur de l'image
      img.style.width = 'auto';
      img.style.height = '169px';
      // Ajoutez l'image à la div
      imageDiv.appendChild(img);
    
      // Sélectionnez l'élément que vous souhaitez cacher
      const elementToHide = document.getElementById('ajout-hide');
      // Modifiez son style pour le cacher
      elementToHide.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
});

