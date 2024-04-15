document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.querySelector("#feedback_form");

    searchForm.addEventListener("submit", e => {
        e.preventDefault();

        // Use fetch to send the form data
        fetch(feedbackForm.getAttribute('action'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(new FormData(feedbackForm))
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