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
    var table = event.target.querySelector('[name="table"]').value;
    console.log('quiquo: ' + table)
    this.props.login(username, passwd, table);
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
        <label>Table</label>
        <div>
          <input name="table" type="text" placeholder="Select table."/>
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
