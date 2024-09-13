
const config = {
    apiKey: "AIzaSyDX9PgLbMNz0BHDW75TyXxpYOC0kFXWE6o",
    authDomain: "debi2024.firebaseapp.com",
    databaseURL: "https://debi2024-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "debi2024",
    storageBucket: "debi2024.appspot.com",
    messagingSenderId: "389019486455",
    appId: "1:389019486455:web:133531ac3f92fab5f22bf2"
};

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
        throw new Error('No Firebase configuration object provided.' + '\n' +
            'Add your web app\'s configuration object to firebase-config.ts');
    } else {
        return config;
    }
}
