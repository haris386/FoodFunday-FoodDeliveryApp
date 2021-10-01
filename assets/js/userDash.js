var pok;
var uid;

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

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid;
        render(uid)
    } else {
        alert(
            "Your login session has expired or you have logged out, login again to continue"
        );
        location.href = "../index.html"
    }
});

function render(uid) {
    firebase.firestore().collection("dishes").get()
        .then(function(snapshot) {
            snapshot.forEach(function(data) {
                var obj = data.data()
                var src = obj.filename;
                var storage = firebase.storage();
                var storageRef = storage.ref();
                storageRef.child('dish/' + src).getDownloadURL()
                    .then((url) => {
                        document.getElementById("div").innerHTML +=
                            `
                        <div class="col mb-4">
                        <div class="card h-100">
                            <img src="${url}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${obj.name}</h5>
                                <p class="card-text text-success" style="font-weight: 500; margin: -1%;">Price: ${obj.price}</p>
                                    <p class="card-text" style=" margin: -1%;" >Cetegory: ${obj.cetegory}</p>
                                    <p class="card-text" style=" margin: -1%;" >Delivery Type : ${obj.delivery}</p>
                                    <button  class="btn btn-primary" style="float: right;" id="${data.id}" onclick="order(this)">Order</button>
                            </div>
                        </div>
                    </div>
                        `
                    })
            })
        })
}

var newobj;

function order(t) {
    var docRef = firebase.firestore().collection("dishes").doc(t.id);
    docRef.get().then((doc) => {
        if (doc.exists) {
            var data = doc.data()
            newobj = {
                status: "panding",
                titel: data.name,
                price: data.price,
                cetegory: data.cetegory,
                delivery: data.delivery,
                userUid: uid,
                resUid: data.resuid,
            }
            console.log(newobj)
            var db = firebase.firestore().collection("pending");
            db.add(newobj)
                .then(
                    () => {
                        swal({
                            title: "Order Has Been Placed",
                            text: "Order placed for: " + data.name,
                            icon: "success",
                            button: "Continue",
                        })
                    }
                )
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function logout() {
    firebase.auth().signOut().then(() => {
        location.href = "../index.html";
    }).catch((error) => {
        // An error happened.
    });
    return false
}