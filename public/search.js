document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector("#search_form");

    searchForm.addEventListener("submit", e => {
        e.preventDefault();

        // Use fetch to send the form data
        fetch(searchForm.getAttribute('action'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(new FormData(searchForm))
        })
        .then(async data => {
            const response = await data.json();
            if (response.message !== null) {
                alert(response.message);
            }
            console.log(response);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
    });
});