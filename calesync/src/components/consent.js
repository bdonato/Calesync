import React from 'react';
import queryString from 'query-string';
// class ConsentContainer extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       name: 'Grant Denmead',
//       friends: ['Friend One', 'Friend Two', 'Friend Three']
//     }
//   }
//   render() {
//     return (
//       <div>
//         <h3> Name: {this.state.name} </h3>
//         <Consent names={this.state.friends} />
//       </div>
//     )
//   }
// }

class Consent extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      input: "placeholder input"
    };   

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    let authCode = queryString.parse(this.props.location.search).code;

    var response = await fetch('user/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: authCode }),
    });

    console.log(await response.json());
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  render() {
    return (
      <div>
        Hello {this.state.input} <br />
        Change Name:
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
export default Consent