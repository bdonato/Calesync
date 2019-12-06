const express = require('express');
const app = express();
const request = require('request');
const firebase = require("firebase/app");
require("firebase/firestore");

app.use(express.json());

console.log("node server started");

function initFirestore() {
  const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

  firebase.initializeApp(firebaseConfig);  
  return firebase.firestore().collection('smoothbrains');
}

function get(url, bearerToken) {
  return new Promise((resolve, reject) => {
    var clientServerOptions = {
      uri: url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + bearerToken
      }      
    };

    request(clientServerOptions, function (error, response) {
      resolve(response.body);     
    });
  });  
};

function post(url, body){
  return new Promise((resolve, reject) => {
    var options = {
      uri: url,
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    };  
    request(options, function (error, response) {
      resolve(JSON.parse(response.body));
    });
  });  
};

var usersCollection = initFirestore(/*config*/);

app.post('/user/save', (req, res) => {
  var authCode = req.body.code;

  var body = {
    client_id: "fLr2DeCpC3ifPrrUqbMADt-wqCFS1AQW",
    client_secret: "ihM2HOLqdQoujG8D0EwsCLrv4tupSc-CJHmC1NsD3zWChaGgCUFwabbrvV-gE1w5wSV2NhCATTsRH5_ctoBc4w",
    grant_type: "authorization_code",
    code: authCode,
    redirect_uri: "http://localhost:3000/consent"
  };

  var accessToken;
  var refreshToken;

  post("https://api.cronofy.com/oauth/token", body)
    .then(data => {
      accessToken = data.access_token;
      refreshToken = data.refresh_token;
      return get("https://api.cronofy.com/v1/account", accessToken);
    })
    .then(data => {
      console.log(data);
      var accountId = JSON.parse(data).account.account_id;
      return usersCollection
        .where("accountId", "==", accountId)
        .get();
    })
    .then(querySnapshot => {
      if(querySnapshot.empty) {        
        console.log("adding");
        return usersCollection.add(
          {
            accountId: "",//acctInfo.account.account_id,
            refreshToken: refreshToken
          }
        );
      }
      else{
        var doc = querySnapshot.docs[0];
        console.log(doc);
        return "";
      }
    })
    .then(() => res.send({ access_token: accessToken }));
})

app.listen(8080)