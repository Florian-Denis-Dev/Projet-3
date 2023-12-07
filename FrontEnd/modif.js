// *** ouverture de la pop-up **///
const modifier = document.querySelector('.modifier');
const pannel = document.querySelector('.modification');
const overlay = document.querySelector('.overlay');
modifier.addEventListener('click', function(){
    pannel.classList.add('open');
})
//*** fermeture de la pop-up ***//
function closePopup() {
    pannel.classList.remove('open');
    gallery.innerHTML = '';
    generateList();
    closePopup2();
}
const closePannels = document.querySelectorAll('.close-pannel');
closePannels.forEach(function(pannel) {
    pannel.addEventListener('click', closePopup);
});
//*** via Échap ***//
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});
//*** via l'overlay ***//
overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
        closePopup();
    }
});

//*** function apparition photos***/
let modification = document.querySelector('#gallery-modification');
async function getData() {
  const response = await fetch('http://localhost:5678/api/works');
  const data = await response.json();
  return data;
}
function addToHTMLpopUp(data) {
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'image-container';
        const img = document.createElement('img');
        img.src = item.imageUrl;
        div.appendChild(img); 
        const svgNS = "http://www.w3.org/2000/svg";  
        const svg = document.createElementNS(svgNS, "svg");
        const path = document.createElementNS(svgNS, "path");
        svg.setAttributeNS(null, "viewBox", "0 0 9 11");
        svg.setAttributeNS(null, "width", "9");
        svg.setAttributeNS(null, "height", "11");
        svg.setAttributeNS(null, "class", "svg-delete");
        path.setAttributeNS(null, "d", "M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z"); 
        path.setAttributeNS(null, "stroke", "#000");
        path.setAttributeNS(null, "stroke-width", "0.1");
        path.setAttributeNS(null, "fill", "white");
        svg.appendChild(path);
        div.appendChild(svg);
        modification.appendChild(div);
        svg.addEventListener('click', function() {
            div.remove();
            deleteImage(item.id);
        });
    });
}
getData().then(data => addToHTMLpopUp(data));

/** ajouter photos  **/
const addButton = document.getElementById('ajout');
const hiddenElements = document.querySelectorAll('.hidden');
const visibleElements = document.querySelectorAll('.visible')
addButton.addEventListener('click', function() {
    modification.innerHTML = '';
    visibleElements.forEach(function(element){
        element.style.display = 'none';
    });
    hiddenElements.forEach(function(element) {
        element.style.display = 'block';
    });
});

//** return popup */
function returnPopUp() {
    visibleElements.forEach(function(element){
        element.style.display = 'flex';
    });
    hiddenElements.forEach(function(element){
        element.style.display = 'none';
    });
    getData().then(data => addToHTMLpopUp(data));
}
document.querySelector('.return-pannel').addEventListener('click', returnPopUp);

//** close popup */
function closePopup2(){
    modification.innerHTML = ''; 
    visibleElements.forEach(function(element){
        element.style.display = 'flex';
    });
    hiddenElements.forEach(function(element) {
        element.style.display = 'none';
    });
    getData().then(data => addToHTMLpopUp(data));
}