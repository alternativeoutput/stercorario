import React, { PureComponent } from 'react';
import User from './User';
import { cl } from 'core/common/Utils';

class Standup extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {users: props.users,
                  standup_users_id: props.standup_users_id};
    this.handleTableClick = this.handleTableClick.bind(this);
  }

  handleTableClick(event) {
    event.preventDefault();

    this.props.dispatch(this.props.blackFirstUser());
  }

  render () {
    cl('Standup render');
    return (
        <div>
        <h2>Standup</h2>
        <div>
        {this.state.standup_users_id.map(function (user_id) {
          var user = this.state.users.byId[user_id];
          return (<User
                  key={user.id} name={user.name} color={user.color}
                  ref={this.props.setUser_gen(user.id)}/>);
        }, this)}
      </div>
        <button onClick={this.handleTableClick}>Clean</button>
        </div>
    );
  }
}

export default Standup;
