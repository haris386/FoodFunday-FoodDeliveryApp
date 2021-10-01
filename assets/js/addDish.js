var uid;
var fileName;

auth.onAuthStateChanged((user) => {
    const username = document.getElementById("username");
    if (user) {
        db.collection("users").doc(user.uid).get()
            .then((snapshot) => {
                username.innerText = snapshot.data().name;
            });
    } else {
        console.log('user is not signed in to retrive username');
    }
});

function start() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            uid = user.uid;
            star(uid)
        } else {
            alert(
                "Your login session has expired or you have logged out, login again to continue"
            );
            location.href = "../index.html"
        }
    })
}

function star(uid) {
    var name = document.getElementById("name").value
    var price = document.getElementById("price").value
    var cetegory = document.getElementById("cetegory").value
    var delivery = document.getElementById("delivery").value
    var dishobj = {
        name: name,
        price: price,
        cetegory: cetegory,
        delivery: delivery,
        resuid: uid,
        filename: fileName,
    }
    var db = firebase.firestore().collection(`dishes`);
    db.add(dishobj)
        .then(() => {
            document.getElementById("name").value = ""
            document.getElementById("price").value = ""
            document.getElementById("cetegory").value = ""
            document.getElementById("delivery").value = ""
            swal({
                title: "Item Added",
                text: "Added: " + name,
                icon: "success",
            })
        })
        .catch((error) => {
            if (!name || !price || !cetegory || !deli) {
                swal({
                    title: "Field Empty",
                    text: "Fill the input field",
                    icon: "warning",
                })
            } else {
                swal({
                    title: "Correct",
                    text: "refresh the page",
                    icon: "success",
                });
                document.getElementById("name").value = ""
                document.getElementById("price").value = ""
                document.getElementById("cetegory").value = ""
                document.getElementById("delivery").value = ""
            };
        })
}


function upload() {
    var img = document.getElementById("file").files[0];
    fileName = img.name

    var storageref = firebase.storage().ref("dish/" + fileName)

    storageref.put(img);
    start()
}

function logout() {
    firebase.auth().signOut().then(() => {
        location.href = "../index.html";
    }).catch((error) => {
        // An error happened.
    });
    return false
}