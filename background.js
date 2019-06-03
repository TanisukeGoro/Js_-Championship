chrome.browserAction.onClicked.addListener(function(tab) {
    // タブに送信する

    // 現在のタブについて情報を取得
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "component" }, function(response) {
            console.log(response);
        });
    });
});　

var firebaseConfig = {
    apiKey: "AIzaSyBfrYub4md8CDQ0ThQiEXC4JM0XMf8XK9Q",
    authDomain: "mygrossary.firebaseapp.com",
    databaseURL: "https://mygrossary.firebaseio.com",
    projectId: "mygrossary",
    storageBucket: "mygrossary.appspot.com",
    messagingSenderId: "285615567998",
    appId: "1:285615567998:web:c5aac62775fbc141"
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
        firebase.auth().currentUser.getIdToken( /* forceRefresh */ true).then(function(idToken) {
            console.log('idToken', idToken);
            // Send token to your backend via HTTPS
            // ...
        }).catch(function(error) {
            // Handle error
        });

        admin.auth().verifyIdToken(_idToken)
            .then(function(decodedToken) {
                var uid = decodedToken.uid;
                console.log(uid);
                // ...
            }).catch(function(error) {
                // Handle error
            });
    } else {}
});