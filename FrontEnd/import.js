const validateButton = document.getElementById('valider');
const dialog = document.getElementById('dialog');
const token = window.localStorage.getItem("token");
const form = document.querySelector('.ajout-text');
const fileInput = document.getElementById('imageUpload');
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