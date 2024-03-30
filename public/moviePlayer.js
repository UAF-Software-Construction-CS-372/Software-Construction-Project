let btn = document.querySelector('#like');
let result = document.querySelector('#result');

localStorage.setItem('likes', 0);
result.innerHTML = localStorage.getItem('likes');

btn.addEventListener('click', addLike());

function addLike(){
  localStorage.setItem('likes',  parseInt(localStorage.getItem('likes')) + 1);
  result.innerHTML = localStorage.getItem('likes');
}

// Data to be sent
const data = {
    key1: 'value1',
    key2: 'value2'
};

// Configuration for the fetch request
const options = {
    method: 'POST', // HTTP method (e.g., GET, POST, PUT, DELETE)
    headers: {
        'Content-Type': 'application/json' // Specify content type
        // Add any additional headers if needed
    },
    body: JSON.stringify(data) // Convert data to JSON string
};

// Send the fetch request to the same origin
self.fetch(self.origin, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response JSON
    })
    .then(data => {
        // Handle the response data
        console.log('Response received:', data);
    })
    .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    });





const commentContainer = document.getElementById('allComments');
document.getElementById('addComments').addEventListener('click', function (ev) {
   addComment(ev);
});

function addComment(ev) {
    let commentText;
    const textBox = document.createElement('div');
    const replyButton = document.createElement('button');
    replyButton.className = 'reply';
    replyButton.innerHTML = 'Reply';
    const likeButton = document.createElement('button');
    likeButton.innerHTML = 'Like';
    likeButton.className = 'likeComment';
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.className = 'deleteComment';
    const wrapDiv = document.createElement('div');
    wrapDiv.className = 'wrapper';
    wrapDiv.style.marginLeft = 0;
    commentText = document.getElementById('newComment').value;
    document.getElementById('newComment').value = '';
    textBox.innerHTML = commentText;
    wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
    commentContainer.appendChild(wrapDiv);
    
}

// Data to be sent
const data2 = {
    key1: 'value1',
    key2: 'value2'
};

// Configuration for the fetch request
const options2 = {
    method: 'POST', // HTTP method (e.g., GET, POST, PUT, DELETE)
    headers: {
        'Content-Type': 'application/json', // Specify content type
        // Add any additional headers if needed
    },
    body: JSON.stringify(data) // Convert data to JSON string
};

// Send the fetch request
fetch(options2)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response JSON
    })
    .then(data2 => {
        // Handle the response data
        console.log('Response received:', data2);
    })
    .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    });