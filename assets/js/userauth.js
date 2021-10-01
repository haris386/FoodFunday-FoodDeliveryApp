function resturent() {
    location.href = "./registerResturent.html"
}

function signupUser(event) {
    event.preventDefault()

    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("pass").value
    let phone = document.getElementById("phone").value
    let country = document.getElementById("country").value
    let city = document.getElementById("city").value

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;



            // store data in firestore
            return firebase.firestore().collection(`users`).doc(user.uid).set({
                    name: name,
                    email: email,
                    uid: user.uid,
                    phone: phone,
                    country: country,
                    city: city,
                    status: "user",
                })
                .then(() => {
                    swal("Success", "Congratulations, your account has been created successfully", "success");
                    location.href = "../pages/loginUser.html";
                    console.log('user added!')
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });



        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (!email || !password || !name || !phone || !country || !city) {
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
            // ..
        });

    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("pass").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("country").value = '';
    document.getElementById("city").value = '';


}


function signupResturent(event) {
    event.preventDefault()

    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("pass").value
    let country = document.getElementById("country").value
    let city = document.getElementById("city").value

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;



            // store data in firestore
            return firebase.firestore().collection(`users`).doc(user.uid).set({
                    name: name,
                    email: email,
                    uid: user.uid,
                    country: country,
                    city: city,
                    status: "resturent",
                })
                .then(() => {
                    swal("Success", "Congratulations, your account has been created successfully", "success");
                    location.href = "./loginUser.html";
                    console.log('user added!')
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });



        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (!email || !password || !name || !country || !city) {
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
            // ..
        });

    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("pass").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("country").value = '';
    document.getElementById("city").value = '';


}