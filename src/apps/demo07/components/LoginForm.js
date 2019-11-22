import React, { Component } from 'react'
import { cl } from 'core/common/Utils';

class LoginForm extends Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    cl('here we are');
    var username = event.target.querySelector('[name="user"]').value;
    var passwd = event.target.querySelector('[name="password"]').value;

    this.props.login(username, passwd);
    event.preventDefault();
    return false;
  }
  
  render () {
    return (
        <form onSubmit={this.handleSubmit}>
      <div>
        <label>User</label>
        <div>
        <input name="user" type="text" placeholder="Username."/>
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <input name="password" type="password" placeholder="Password here."/>
        </div>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
        </form>
    );
  }
}

export default LoginForm;
