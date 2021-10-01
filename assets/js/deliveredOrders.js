var pok;
var uid;

firebase.auth().onAuthStateChanged((user) => {
    const username = document.getElementById("username");
    if (user) {
        db.collection("users").doc(user.uid).get()
            .then((snapshot) => {
                username.innerText = snapshot.data().name;
            });
    } else {
        console.log('user is not signed in to retrive username');
    };
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid;
        start(user)
        console.log("1")
    } else {
        alert(
            "Your login session has expired or you have logged out, login again to continue"
        );
        location.href = "../index.html"
    };
});

function start(user) {
    var docRef = firebase.firestore().collection("pending").where("resUid", "==", user.uid).where("status", "==", "delivered")
    docRef.get()
        .then(function(snapshot) {
            snapshot.forEach(function(data, index) {
                var obj = data.data()
                console.log(obj)
                document.getElementById("div").innerHTML += `

                &nbsp;&nbsp;&nbsp;
                <div class="card">
                        <div class="card-body p-3">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="d-flex flex-column h-100">

                                        <h5 class="font-weight-bolder">${obj.titel}</h5>
                                        <span>Cetegery : ${obj.cetegory}</span>
                                        <span>Deleviery : ${obj.delivery}</span>
                                        <span>price : ${obj.price}</span>
                                        <button class="btn btn-sm btn-danger " style="float: right;" id="${data.id}" onclick="del(this)"> DELETE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    &nbsp;&nbsp;&nbsp;
           `
            })
        })
}

function del(i) {
    var db = firebase.firestore();
    db.collection("pending").doc(i.id).update({ status: "Over-Dated" });
    swal({
        title: "Done",
        text: "please refresh",
        icon: "success",
        button: "Click 'Ok' To Refresh",
    }).then((value) => {
        console.log("Item Delivered");
        location.href = "../pages/deliveredDashboard.html"
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