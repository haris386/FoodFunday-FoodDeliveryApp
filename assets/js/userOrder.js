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


var uid;
var pok;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {

        uid = user.uid;
        start(uid)
        console.log("1")


    } else {
        alert(
            "Your login session has expired or you have logged out, login again to continue"
        );
        location.href = "../index.html"
    }
})


function start(uid) {
    var docRef = firebase.firestore().collection("pending").where("userUid", "==", uid)
    docRef.get()
        .then(function(snapshot) {
            snapshot.forEach(function(data, index) {
                var obj = data.data()
                console.log(obj)
                document.getElementById("div").innerHTML += `

                <div class="col mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${obj.titel}</h5>
                        <p class="card-text text-success" style="font-weight: 500; margin: -1%;">Price: ${obj.price}</p>
                            <p class="card-text" style=" margin: -1%;" >Cetegory: ${obj.cetegory}</p>
                            <p class="card-text" style=" margin: -1%;" >Delivery Type: ${obj.delivery}</p>
                            <p class="card-text" style=" margin: -1%;" >Status: ${obj.status}</p>
                            <button  class="btn btn-sm btn-danger" style="float: right;" id="${data.id}" onclick="del(this)">Delete</button>
                    </div>
                </div>
            </div>
           `
            })
        })
}

function del(i) {
    var db = firebase.firestore();
    db.collection("pending").doc(i.id).update({ userUid: "delete" });
    swal({
        title: "Item Deleted",
        text: "Please Refresh",
        icon: "success",
        button: "Click 'Ok' To Refresh",
    }).then((value) => {
        console.log("Item Deleted");
        location.href = "../pages/UserorderDashboard.html"
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