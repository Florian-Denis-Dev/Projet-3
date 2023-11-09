const modifier = document.querySelector('.modifier');
modifier.addEventListener('click', function(){
    const pannel = document.querySelector('.modification');
    pannel.style.display = 'unset';
})

const closePannel = document.querySelector('.close-pannel');
closePannel.addEventListener('click', () => {
    const pannel = document.querySelector('.modification');
    pannel.style.display = 'none';
})