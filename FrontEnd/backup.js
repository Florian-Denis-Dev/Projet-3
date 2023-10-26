// --------------------- premiere fonction ---------------------//

// Sélection de la galerie dans le DOM
let gallery = document.querySelector('.gallery');

// Suppression du contenu HTML existant dans la galerie
gallery.innerHTML = '';


// Fonction pour récupérer les données de l'API
async function getData() {
  const response = await fetch('http://localhost:5678/api/works'); // url de l'api
  const data = await response.json();
  return data;
}


// --------------------------- filtre tous ---------------------//

// Fonction pour ajouter les images et descriptions à index.html
function addToHTML(data) {
  data.forEach(item => {

      // Créer un nouvel élément figure
      const figure = document.createElement('figure');

      // Ajouter une image à la figure
      const img = document.createElement('img');
      img.src = item.imageUrl; // 
      figure.appendChild(img);

      // Ajouter une description à la figure
      const description = document.createElement('figcaption');
      description.textContent = item.title; // 
      figure.appendChild(description);

      // Ajouter la figure au conteneur gallery
      gallery.appendChild(figure);
  });
}

// Appeler la fonction getData et utiliser les données reçues pour appeler addToHTML
getData().then(data => addToHTML(data));

// ------------------------- filtre objet ---------------------//

// --------------------- filtre Appartement -------------------//

// ------------------ filtre hotel et restaurant --------------//