import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCc3nwe0RpwiYUjLH8_e0vUnWhdbfLTLqU",
    authDomain: "hyde-api.firebaseapp.com",
    databaseURL: "https://hyde-api.firebaseio.com",
    projectId: "hyde-api",
    storageBucket: "hyde-api.appspot.com",
    messagingSenderId: "684817438021",
    appId: "1:684817438021:web:1031018de8c9cb70a9da2c"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const database = firebaseApp.firestore()

export default database