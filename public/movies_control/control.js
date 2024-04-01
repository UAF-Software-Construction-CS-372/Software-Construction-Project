document.addEventListener("DOMContentLoaded", () => {
    const putForm = document.querySelector("#put_movie");

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

    const deleteForm = document.querySelector("#delete_movie");

    deleteForm.addEventListener("submit", e => {
        e.preventDefault();

        // Use fetch to send the form data
        fetch(deleteForm.getAttribute('action'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(new FormData(deleteForm))
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