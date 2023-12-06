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
      // 
      console.log(file);
    } else {
      console.log('Aucun fichier sélectionné');
    }
  });
  