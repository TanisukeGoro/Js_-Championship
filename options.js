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


    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                return true;
            },
            uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: 'options.html',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        ],
        // Terms of service url.
        // tosUrl: '<your-tos-url>',
        // Privacy policy url.
        // privacyPolicyUrl: '<your-privacy-policy-url>'
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);


    firebase.auth().onAuthStateChanged((user) => {
        let h1 = document.querySelector('h1');
        let info = document.querySelector('#info');

        if (user) {
            h1.innerText = 'Login Complete!';
            info.innerHTML = `${user.displayName}さんがログインしました<br>` +
                `(${user.uid})`;
            console.log(user);

            // Get idToken if you need to use something
            firebase.auth().currentUser.getIdToken( /* forceRefresh */ true).then(function(idToken) {
                console.log('idToken', idToken);
                // Send token to your backend via HTTPS
                // ...
            }).catch(function(error) {
                // Handle error
            });
        } else {
            h1.innerText = 'Not Login';
        }
    });