// *** ouverture de la pop-up **///
const modifier = document.querySelector('.modifier');
modifier.addEventListener('click', function(){
    const pannel = document.querySelector('.modification');
    pannel.style.display = 'unset';
})
//*** fermeture de la pop-up ***//
const closePannel = document.querySelector('.close-pannel');
closePannel.addEventListener('click', () => {
    const pannel = document.querySelector('.modification');
    pannel.style.display = 'none';
})
//*** function apparition photos***/

// Sélection de la galerie dans le DOM
let modification = document.querySelector('#gallery-modification');

// Fonction pour récupérer les données de l'API
async function getData() {
  const response = await fetch('http://localhost:5678/api/works'); // url de l'api
  const data = await response.json();
  return data;
}
// Fonction pour ajouter les images et descriptions à index.html
function addToHTML(data) {
  data.forEach(item => {
      // Ajouter une image 
      const img = document.createElement('img');
      img.src = item.imageUrl;
      modification.appendChild(img);
  });
}
// Appeler la fonction getData et utiliser les données reçues pour appeler addToHTML
getData().then(data => addToHTML(data));