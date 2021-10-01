function login(event) {
    event.preventDefault()

    let email = document.getElementById("email").value
    let password = document.getElementById("pass").value

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
                // swal("Log In | Successful", "Click 'Okay' for Dashboard", "success");
            swal({
                title: "Log-In Successfull",
                text: "You are logged in to Food Funday",
                icon: "success",
                button: "Okay!",
            }).then((value) => {
                window.location.href = '../pages/loader.html';;
            });

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (!email || !password) {
                swal({
                    title: "Field Empty",
                    text: "Fill the input field",
                    icon: "warning",
                })
            } else {
                swal({
                    title: "Incorrect information",
                    text: `${errorMessage}`,
                    icon: "error",
                    button: "Again",
                });
            }

        });

    document.getElementById("email").value = '';
    document.getElementById("pass").value = '';

}

function resturent() {
    location.href = "./registerResturent.html"
}