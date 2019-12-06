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

      this.state = {
        events: []
      }; 

      this.handleDateChange = this.handleDateChange.bind(this);
  }

  formatLocalISO(date) {
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    var ms = ("0" + date.getMilliseconds()).slice(-3)

    return [year, '-', month, '-', day, 'T', hours, ':', minutes, ':', seconds, ".", ms].join('');
  }

  async handleDateChange(selectedDate) {   
    var startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    var endDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 24);

    var response = await fetch(`user/events/start/${this.formatLocalISO(startDate)}/end/${this.formatLocalISO(endDate)}`);
    var eventList = await response.json();

    this.setState({
        events: eventList.events
    });
  }

  render() {
      return (
          <div>
              <div style={{display: "inline-block"}}>
                <Calendar
                    onChange={this.handleDateChange}
                    value={this.state.date}
                />
              </div>
              <div style={{marginTop: "50px"}}>
                {
                    this.state.events.map((e, i) => 
                        <div key={i} style={{display: "inline-block", width: "200px", height: "200px", border: "2px solid blue", verticalAlign: "top", marginRight: "10px", padding: "10px"}}>
                            <p><b>{e.summary}</b></p>
                            <p>Start: {new Date(e.start).toLocaleString()}</p>
                            <p>End: {new Date(e.end).toLocaleString()}</p>
                        </div>
                    )
                }
              </div>
          </div>
      );
  }

}


export default UserCalendar

