function myFetcher() {
    console.log('Liking!');

    const title = document.getElementById('movie_name').innerHTML;

    // Use fetch to send the form data
    fetch('/movie-likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            user: localStorage.getItem("username"),
            title: title,
        })
    })
    .then(async data => {
        const response = await data.json();
        if (!response.success) {
            alert(response.message);
        }
        console.log(response);
    })
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('like').addEventListener('click', myFetcher);
});
