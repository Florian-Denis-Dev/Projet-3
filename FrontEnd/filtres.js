// Sélection du conteneur de boutons dans le DOM
let buttonContainer = document.querySelector('.button-container');

// ...

// Fonction pour créer les boutons de filtre
function createFilterButtons(data) {
  // Obtenir toutes les catégories uniques
  let categories = [...new Set(data.map(item => item.category.name))];

  // Créer un bouton pour chaque catégorie
  categories.forEach(categorie => {
    let button = document.createElement('button');
    button.textContent = categorie;
    button.addEventListener('click', () => {
      gallery.innerHTML = '';
      addToHTML(data, categorie);
    });
    buttonContainer.appendChild(button); // Ajouter le bouton au conteneur de boutons
  });
}