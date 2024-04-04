document.addEventListener("DOMContentLoaded", () => 
{
    const putForm = document.querySelector("#");

    putForm.addEventListener("", e => 
    {
        e.preventDefault();

        fetch(putForm.getAttribute('action'), 
        {
            method:'POST',
            headers: 
            {
                'Content-Type': 'application/x-www-form-urlencoded, 
            }, 
            body: new URLSearchParams(new FormData(putForm))
        })
        .then(async data => {
            const response = await data.json();
            if(!response.success) 
            {
                alert(response.message);
            }
            console.log(response);
        })
        .catch(error => {
            console.error('Error', error)
        });
    });
});