var uid;
var status;
var user;


var firebaseConfig = {
    apiKey: "AIzaSyCpEL2EcdCz8CU0JQfS3RwCrtcY1nb2jL4",
    authDomain: "sampleapp-ca14f.firebaseapp.com",
    projectId: "sampleapp-ca14f",
    storageBucket: "sampleapp-ca14f.appspot.com",
    messagingSenderId: "492716693860",
    appId: "1:492716693860:web:44108172f634a9c7a24271"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        user = user;
        uid = user.uid;

        var db = firebase.firestore();

        db.collection("users").doc(user.uid).get().then((snap) => {

            status = snap.data().status;
            Start(status)

        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        // ...

    } else {
        location.href = "../index.html"
    }
});

function Start(status) {

    if (status == "resturent") {
        location.href = "../pages/restaurantDashboard.html"

    } else if (status == "user") {
        location.href = "../pages/dashboard.html"
    } else {
        console.log("x")
    }
}