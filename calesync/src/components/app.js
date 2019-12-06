import React from 'react';
import { withRouter } from "react-router-dom";

class Home extends React.Component{
    constructor(){
      super();
      this.state = { 
        allUsers: []
      };

      this.selectUser = this.selectUser.bind(this);
    }

    async componentDidMount() {
      var response = await fetch('users');
      var users = await response.json();

      this.setState({
        allUsers: users
      });
    }

    async addNewUser() {
      window.location.href = "https://app.cronofy.com/oauth/authorize?client_id=fLr2DeCpC3ifPrrUqbMADt-wqCFS1AQW&redirect_uri=http://localhost:3000/consent&response_type=code&scope=read_events";
    }

    async selectUser(user) {
      await fetch('updateCurrentUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userAccountId: user.account.account_id }),
      });

      this.props.history.push("/calendar");
    }

    render() {
      return(
          <div>
            <div>
              <h3>Select a User</h3>
              {
                this.state.allUsers.map((u, i) => <button key={i} onClick={() => this.selectUser(u)}>{u.account.name}</button>)
              }
            </div>
            <br/>
            <h3>or</h3>
            <button onClick={this.addNewUser} > Add User/Account </button>
          </div>

      )
    }
}




export default Home