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

function addToHTMLpopUp(data) {
    data.forEach(item => {
        // Ajouter une image 
        const img = document.createElement('img');
        img.src = item.imageUrl;
        modification.appendChild(img);

        // Créer un élément SVG
        const svgNS = "http://www.w3.org/2000/svg";  
        const svg = document.createElementNS(svgNS, "svg");
        const path = document.createElementNS(svgNS, "path");

        // Configurer l'icône SVG (exemple d'une icône de croix)
        svg.setAttributeNS(null, "viewBox", "0 0 9 11");
        svg.setAttributeNS(null, "width", "9");
        svg.setAttributeNS(null, "height", "11");
        svg.setAttributeNS(null, "class", "svg-delete");
        path.setAttributeNS(null, "d", "M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z"); 
        path.setAttributeNS(null, "stroke", "#000");
        path.setAttributeNS(null, "stroke-width", "1");
        path.setAttributeNS(null, "fill", "white");

        // Ajouter le chemin à l'élément SVG et l'élément SVG à l'image
        svg.appendChild(path);
        img.parentNode.insertBefore(svg, img);

        // Ajouter un gestionnaire d'événements click à chaque élément SVG
        svg.addEventListener('click', function() {
            img.remove();
            svg.remove();
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
