document.addEventListener("DOMContentLoaded", () => {
    const putForm = document.querySelector("#");

    putForm.addEventListener("submit", e => {
        e.preventDefault();

        // Use fetch to send the form data
        fetch(putForm.getAttribute('action'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(new FormData(putForm))
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
    });
});