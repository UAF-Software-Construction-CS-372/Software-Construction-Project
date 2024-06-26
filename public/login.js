function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error", "form--hidden");
    messageElement.classList.add(`form__message--${type}`);
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#Login");
    const all_buttons = document.querySelectorAll('.btn');
    let clickedButton = ""; 
    var success = true;
    
    all_buttons.forEach(bt => {
        bt.addEventListener('mousedown', (a) => {
            clickedButton = a.target.innerHTML;
            console.log(clickedButton);
            if(clickedButton == "Login") {
                console.log("Successful login detection");
            } else {
                console.log("Successful Signup detection");
            }
        });
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Special Characters
        let specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,<>\/?~ ]/;

        let uppercase = /[A-Z]/;

        let numbers =/[0123456789]/;

        // Info Search, AJAX/Fetch (will look into what those two terms mean)
        var username = document.getElementById("user").value;
        // Check if Username has at least 4 letters and exactly 1 underscore
        if (username.length >= 4 && username.split("_").length === 2 && !uppercase.test(username)) {
            // Username meets the criteria
            setFormMessage(loginForm, "success", "Username is valid.");
            // You can proceed with further actions here
        } else {
            // Username does not meet the criteria
            setFormMessage(loginForm, "error", "Invalid username. Please make sure it has at least 4 letters and exactly 1 underscore.");
            // Add counter (WIP)
            console.log("Incorrect username");
            success = false;
            return;
        }

        // Info Search, AJAX/Fetch (will look into what those two terms mean)
        var password = document.getElementById("pass").value.toString();
        // Check if Username has at least 4 letters and exactly 1 underscore
        if (password.length >= 8 && specialChars.test(password)  && numbers.test(password)) {
            // Username meets the criteria
            setFormMessage(loginForm, "success", "Password is valid.");
            // You can proceed with further actions here
        } else {
            // Username does not meet the criteria
            setFormMessage(loginForm, "error", "Invalid password. Please make sure it has at least 8 letters, all lowercase, 1 special character, and 1 number.");
            success = false;
            console.log("Incorrect password");
            return;
        }

        if (success) {
            console.log("Submitting form!");
            if (clickedButton != "Login") {
                loginForm.setAttribute('action', "/signup");   
            } else {
                loginForm.setAttribute('action', "/login");
            }

            // Use fetch to send the form data
            fetch(loginForm.getAttribute('action'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(new FormData(loginForm))
            })
            .then(async data => {
                

                localStorage.setItem('username', username);

                const headers = data.headers;

                if (headers.get('Content-Type').includes('text/html')) {
                    document.body.innerHTML = await data.text();
                } else {
                    const response = await data.json();
                    if (!response.success) {
                        alert(response.message);
                    }
                    console.log(response);
                }
            })
            .catch(error => {
                // Handle any errors
                console.error('Error:', error);
            });
        }
    });
});