import React from 'react'
import ReactDOM from 'react-dom';

import Calendar from 'react-calendar';
import firebase from '../firebase.js';


class UserCalendar extends React.Component {
  render() {
    return( 
    <div>
        <h1>Calendar</h1> 
        <Calesync />
    </div>
    );
  }
}

class Calesync extends React.Component {
  constructor() {
      super();

      /*firebase
          .firestore()
          .collection('smoothbrains')
          .get()
          .then(c => {
              console.log(c.docs[0].data());
          });*/
  }

  state = {
      date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
      return (
          <div>
              <Calendar
                  onChange={this.onChange}
                  value={this.state.date}
              />
          </div>
      );
  }

}


export default UserCalendar

