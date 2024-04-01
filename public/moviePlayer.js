$('.btn-counter').on('click', function(event, count) {
    event.preventDefault();
    
    var $this = $(this),
        count = $this.attr('data-count'),
        active = $this.hasClass('active'),
        multiple = $this.hasClass('multiple-count');
    
    // First method, allows to add custom function
    // Use when you want to do an ajax request
    /* if (multiple) {
    $this.attr('data-count', ++count);
    // Your code here
    } else {
    $this.attr('data-count', active ? --count : ++count).toggleClass('active');
    // Your code here
    } */
    
    // Second method, use when ... I dunno when but it looks cool and that's why it is here
    $.fn.noop = $.noop;
    $this.attr('data-count', ! active || multiple ? ++count : --count  )[multiple ? 'noop' : 'toggleClass']('active');
    
  });

const url = '/play-movie'; // Replace this with your API endpoint URL

// Data to be sent
const data = {
    key1: 'value1',
    key2: 'value2'
};

// Configuration for the fetch request
const options = {
    method: 'POST', // HTTP method (e.g., GET, POST, PUT, DELETE)
    headers: {
        'Content-Type': 'likes', // Specify content type
        // Add any additional headers if needed
    },
    body: JSON.stringify(data) // Convert data to JSON string
};

// Send the fetch request
fetch(url, options)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response JSON
    })
    .then(data => {
        // Handle the response data
        console.log('Response received:', data2);
    })
    .catch(error => {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    });





    const field = document.querySelector('textarea');
    const backUp = field.getAttribute('placeholder')
    const submit = document.querySelector('#submit')
    // const comments = document.querySelector('#comment-box')
    const comments = document.getElementById('comment-box');
    
    // array to store the comments
    const comments_arr = [];
    
    // to generate html list based on comments array
    const display_comments = () => {
      let list = '<ul>';
       comments_arr.forEach(comment => {
        list += `<li>${comment}</li>`;
      })
      list += '</ul>';
      comments.innerHTML = list;
    }
    
    submit.onclick = function(event){
        event.preventDefault();
        const content = field.value;
        if(content.length > 0){ // if there is content
          // add the comment to the array
          comments_arr.push(content);
          // re-genrate the comment html list
          display_comments();
          // reset the textArea content 
          field.value = '';
        }
    }

const url2 = '/play-movie'; // Replace this with your API endpoint URL

// Data to be sent
const data2 = {
    key1: 'value1',
    key2: 'value2'
};

// Configuration for the fetch request
const options2 = {
    method: 'POST', // HTTP method (e.g., GET, POST, PUT, DELETE)
    headers: {
        'Content-Type': 'commments', // Specify content type
        // Add any additional headers if needed
    },
    body: JSON.stringify(data) // Convert data to JSON string
};

// Send the fetch request
fetch(url2, options2)
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