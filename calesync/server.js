const express = require('express');
const app = express();
const request = require('request');
const firebase = require("firebase/app");
require("firebase/firestore");

app.use(express.json());

var currentUserAccessToken;

function initFirestore() {
  const firebaseConfig = {
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
      resolve(JSON.parse(response.body));     
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

//save user's accounts/refresh token to firestore after consent
app.post('/user/save', (req, res) => {
  var authCode = req.body.code;

  var body = {
    client_id: "",
    client_secret: "",
    grant_type: "authorization_code",
    code: authCode,
    redirect_uri: "http://localhost:3000/consent"
  };

  var accessToken;
  var refreshToken;
  var accountId;

  post("https://api.cronofy.com/oauth/token", body)
    .then(data => {
      accessToken = data.access_token;
      refreshToken = data.refresh_token;
      return get("https://api.cronofy.com/v1/account", accessToken);
    })
    .then(data => {
      console.log(data);
      accountId = data.account.account_id;
      return usersCollection
        .where("accountId", "==", accountId)
        .get();
    })
    .then(querySnapshot => {
      if(querySnapshot.empty) {
        return usersCollection.add(
          {
            accountId: accountId,
            refreshToken: refreshToken
          }
        );
      }
      else{
        var doc = querySnapshot.docs[0];
        return usersCollection.doc(doc.id).update({"refreshToken": refreshToken})
      }
    })
    .then(() => res.send({ access_token: accessToken }));
});

//get user accounts
app.get('/users', (req, res) => {
  usersCollection
    .get()
    .then(querySnapshot => {
      var userPromises = [];

      querySnapshot.docs.forEach(d => {
        var refreshToken = d.data().refreshToken;
        var body = {
          "client_id": "",
          "client_secret": "",
          "grant_type": "refresh_token",
          "refresh_token": refreshToken
        };
        userPromises.push(post("https://api.cronofy.com/oauth/token", body));
      });

      return Promise.all(userPromises);
    })
    .then(results => {
      var accountPromises = [];

      results.forEach(r => {
        var accessToken = r.access_token;
        accountPromises.push(get("https://api.cronofy.com/v1/account", accessToken));
      });

      return Promise.all(accountPromises);      
    })
    .then(accounts => {
      res.send(accounts);
    })
  
});

//hack to save the currentUser's access token
app.post('/updateCurrentUser', (req, res) => {
  usersCollection
    .where("accountId", "==", req.body.userAccountId)
    .get()
    .then(querySnapshot => {
      var doc = querySnapshot.docs[0];
      var refreshToken = doc.data().refreshToken;
      var body = {
        "client_id": "",
        "client_secret": "",
        "grant_type": "refresh_token",
        "refresh_token": refreshToken
      }
      return post("https://api.cronofy.com/oauth/token", body)
    })
    .then(result => {
      currentUserAccessToken = result.access_token;
      console.log(currentUserAccessToken);
      res.send(true);
    })
    
});

//get calendar events
app.get('/user/events/start/:start/end/:end', (req, res) => {
  var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var url = `https://api.cronofy.com/v1/events?from=${req.params.start}&to=${req.params.end}&tzid=${tz}`;
  console.log(url);
  get(url, currentUserAccessToken)
    .then(eventResult => {
      res.send(eventResult);
    })
})

console.log("node server started");
app.listen(8080)