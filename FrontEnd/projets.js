// --------------- Chargement du contenu -----------//
let projets = document.querySelector('#portfolio h2');
let gallery = document.querySelector('.gallery');
let buttonContainer = document.createElement('div');
buttonContainer.className = 'button-container';
projets.appendChild(buttonContainer);

// Fonction pour récupérer les données de l'API
async function getData() {
  const response = await fetch('http://localhost:5678/api/works');
  const data = await response.json();
  return data;
}

// Fonction pour ajouter les images et descriptions à index.html
function addToHTML(data, categorie) {
  let filteredData = data;
  if (categorie) {
    filteredData = data.filter(item => item.category.name === categorie);
  }
  gallery.innerHTML = '';
  filteredData.forEach(item => {
         const figure = document.createElement('figure');
         const img = document.createElement('img');
         img.src = item.imageUrl;
         figure.appendChild(img);
         const description = document.createElement('figcaption');
         description.textContent = item.title;
         figure.appendChild(description);
         gallery.appendChild(figure);
  });
}

//------------------ boutons filtres ---------------//

// Fonction pour créer les boutons de filtre
function createFilterButtons(data) {
  buttonContainer.innerHTML = '';
  let categories = [...new Set(data.map(item => item.category.name))];
  let allButton = document.createElement('button');
  allButton.textContent = 'Tous';
  allButton.addEventListener('click', () => {
    addToHTML(data);
  });
  buttonContainer.appendChild(allButton);
  categories.forEach(categorie => {
  let button = document.createElement('button');
  button.textContent = categorie;
  button.addEventListener('click', () => {
    addToHTML(data, categorie);
    });
  buttonContainer.appendChild(button);
  });
}
async function generateList (){getData().then(data => {
  addToHTML(data);
  createFilterButtons(data);
})}; 

generateList();