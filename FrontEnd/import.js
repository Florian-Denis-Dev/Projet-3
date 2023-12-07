const validateButton = document.getElementById('valider');
const dialog = document.getElementById('dialog');
const token = window.localStorage.getItem("token");
const form = document.querySelector('.ajout-text');
const fileInput = document.getElementById('imageUpload');
/** Formulaire de téléchargement image vers api */
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const file = fileInput.files[0];
  if (file) {
    const formData = new FormData();
    formData.append('image', file);
    const fieldName = document.getElementById('titre').value;
    const category = document.getElementById('categorie').value;
    formData.append('title', fieldName);
    formData.append('category', category);
    fetch('http://localhost:5678/api/works', {
      method: 'POST',
      body: formData,
      headers: {'Authorization': `Bearer ${token}`}
      })
    .then(response => response.json())
    .then(data => {
      console.log('Image uploaded successfully:', data);
      closePopup();
      generateList();
      document.getElementById('titre').value = '';
      document.getElementById('categorie').value = '';
      fileInput.value = '';
      const imageDiv = document.querySelector('.ajout-photo-container');
      imageDiv.innerHTML = '';
      const elementToHide = document.getElementById('ajout-hide');
      elementToHide.style.display = 'flex';
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } else {
    console.log('Aucun fichier sélectionné');
  }
});
/** Preview de l'image */
fileInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      const imageDiv = document.querySelector('.ajout-photo-container');
      imageDiv.innerHTML = '';
      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.width = 'auto';
      img.style.height = '169px';
      imageDiv.appendChild(img);
      const elementToHide = document.getElementById('ajout-hide');
      elementToHide.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
});
  /** Changement de couleur valider */

function checkFormAndFile() {
  var isFormFilled = Array.from(form.elements).every(function(element) {
    return element.value !== '';
  });
  var isFileSelected = fileInput.files.length > 0;
  
  if (isFormFilled && isFileSelected) {
    validateButton.style.backgroundColor = 'var(--green-color)';
    validateButton.style.color = 'white';
  } else {
    validateButton.style.backgroundColor = 'var(--gray-color)';
    validateButton.style.color = 'white'; 
  }
}
form.addEventListener('input', checkFormAndFile);
fileInput.addEventListener('change', checkFormAndFile);

// Fonction pour récupérer les données de l'API
async function getCategories() {
  const response = await fetch('http://localhost:5678/api/categories'); // url de l'api
  const data = await response.json();
  return data;
}

// Fonction pour ajouter les catégories au select
function addToSelect(data) {
const select = document.querySelector('#categorie');
data.forEach(item => {
  const option = document.createElement('option');
  option.value = item.id;
  option.text = item.name;
  select.add(option);
});
}
getCategories().then(data => addToSelect(data));

/** Function pour ajouter des photos */
document.getElementById('addButton').addEventListener('click', function() {
document.getElementById('imageUpload').click();
});
document.getElementById('imageUpload').addEventListener('change', function() {
const file = this.files[0];
if (file) {
    console.log(file);
} else {
  console.log('Aucun fichier sélectionné');
}
});

/** Delete image */
function deleteImage(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Image deleted successfully');
  })
  .catch(error => {
      console.log('There was a problem with the fetch operation: ' + error.message);
  });
}