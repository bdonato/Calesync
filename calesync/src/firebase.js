import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBQ5_LfFVfMyvnZUPZlRRW-zKzB_9n0imU",
    authDomain: "cronofy-dev-innovation-week.firebaseapp.com",
    databaseURL: "https://cronofy-dev-innovation-week.firebaseio.com",
    projectId: "cronofy-dev-innovation-week",
    storageBucket: "cronofy-dev-innovation-week.appspot.com",
    messagingSenderId: "966830346601",
    appId: "1:966830346601:web:22fedd51fb8593019f6df8",
    measurementId: "G-GPM06WVZLQ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default firebase;