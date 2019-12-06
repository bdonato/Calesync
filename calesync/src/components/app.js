import React from 'react';
import firebase from '../firebase.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Calensync</h1>
        <AuthButton />
      </div>
    )
  }
}

class AuthButton extends React.Component{
    async authorizeUser(){

      /*var response = await fetch("https://app.cronofy.com/oauth/authorize?client_id=fLr2DeCpC3ifPrrUqbMADt-wqCFS1AQW&redirect_uri=https://www.google.com&response_type=code&scope=read_events",
        { headers: {'Content-Type': 'application/json'}}
      );

      console.log(await response.json())*/
      window.location.href = "https://app.cronofy.com/oauth/authorize?client_id=fLr2DeCpC3ifPrrUqbMADt-wqCFS1AQW&redirect_uri=http://localhost:3000/consent&response_type=code&scope=read_events";


      //alert("Auth with Cronofy Here");
      /*firebase //change this to auth
        .firestore()
        .collection('smoothbrains')
        .where("accountId", "==", "acc_5de82ddefc1fe1008d17879e")
        .get()
        .then(c => {          
            console.log(c.docs[0].data());
            c.forEach(a => console.log(a.data()));
        });*/
            
    }
    render() {
        return(
            <div>
                <button onClick={this.authorizeUser} > Authorize </button>
            </div>

        )
    }
}




export default App