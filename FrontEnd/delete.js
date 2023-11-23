// deleteImage.js
function deleteImage(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log('Image deleted successfully');
    })
    .catch(error => {
        console.log('There was a problem with the fetch operation: ' + error.message);
    });
}