// Fonction pour récupérer les données de l'API
async function getCategories() {
    const response = await fetch('http://localhost:5678/api/categories'); // url de l'api
    const data = await response.json();
    return data;
  }
  
  // Fonction pour ajouter les catégories au select
  function addToSelect(data) {
    // Sélectionnez le select dans le DOM
    const select = document.querySelector('#categorie');
  
    data.forEach(item => {
      // Créez une nouvelle option
      const option = document.createElement('option');
      option.value = item.id;
      option.text = item.name;
  
      // Ajoutez l'option au select
      select.add(option);
    });
  }
  
  // Appeler la fonction getCategories et utiliser les données reçues pour appeler addToSelect
  getCategories().then(data => addToSelect(data));


  /** function de click sur ajouter photo */

  document.getElementById('addButton').addEventListener('click', function() {
    document.getElementById('imageUpload').click();
  });
  
  document.getElementById('imageUpload').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      // 
      console.log(file);
    } else {
      console.log('Aucun fichier sélectionné');
    }
  });
