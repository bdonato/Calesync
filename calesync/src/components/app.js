import React from 'react'
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

    authorizeUser(){
        alert("Auth with Cronofy Here");
        firebase //change this to auth
          .firestore()
          .collection('smoothbrains')
          .get()
          .then(c => {
              console.log(c.docs[0].data());
          });
            
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