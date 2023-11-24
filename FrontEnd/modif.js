// *** ouverture de la pop-up **///
const modifier = document.querySelector('.modifier');
const pannel = document.querySelector('.modification');
const overlay = document.querySelector('.overlay');

modifier.addEventListener('click', function(){
    pannel.classList.add('open');
})

//*** fermeture de la pop-up ***//
const closePannel = document.querySelector('.close-pannel');
closePannel.addEventListener('click', closePopup);

//*** fermeture de la pop-up avec la touche Échap ***//
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});

//*** fermeture de la pop-up en cliquant sur l'overlay ***//
overlay.addEventListener('click', function(event) {
    // Vérifie si le clic a eu lieu à l'intérieur de la pop-up
    if (event.target === overlay) {
        closePopup();
    }
});

function closePopup() {
    pannel.classList.remove('open');
}
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
function addToHTMLpopUp(data) {
    data.forEach(item => {
        // Ajouter une image 
        const img = document.createElement('img');
        img.src = item.imageUrl;
        modification.appendChild(img);
        // Ajouter un élément span avec un texte "x" au-dessus de chaque image
        const span = document.createElement('span');
        span.innerText = 'x';
        span.classList.add('x-span');
        img.parentNode.insertBefore(span, img);
        // Ajouter un gestionnaire d'événements click à chaque élément span
        span.addEventListener('click', function() {
            img.remove();
            span.remove();
            // Supprimer l'image via l'API
            deleteImage(item.id);
        });
    });
}
// Appeler la fonction getData et utiliser les données reçues pour appeler addToHTML
getData().then(data => addToHTMLpopUp(data));

/** ajouter photos  **/

// Sélectionnez le bouton dans le DOM
const addButton = document.getElementById('ajout');

// Sélectionnez les éléments à afficher
const hiddenElements = document.querySelectorAll('.hidden');

// Sélection des éléments à supprimer
const visibleElements = document.querySelectorAll('.visible')

// Ajoutez un écouteur d'événements au bouton
addButton.addEventListener('click', function() {
    // Effacez la galerie
    modification.innerHTML = '';
    // Parcourez chaque élément et changez leur style display
    visibleElements.forEach(function(element){
        element.style.display = 'none';
    });
    hiddenElements.forEach(function(element) {
        element.style.display = 'block';
    });
});
