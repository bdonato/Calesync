import React from 'react';
import queryString from 'query-string';

class Consent extends React.Component {

  async componentDidMount() {
    let authCode = queryString.parse(this.props.location.search).code;

    var response = await fetch('user/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: authCode }),
    });

    this.props.history.push("/");

  }

  render() {
    return (
      <div>
        Loading...
      </div>
    )
  }
}
export default Consent