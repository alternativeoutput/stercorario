import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './User';
import { blackFirstUser } from '../reducers/Main'
import { cl } from 'core/common/Utils';

function mapStateToProps(state, props) {
  return {
      ...state.standup
  }
}

const mapDispatchToProps = (dispatch_gen, props_gen) => {
  return {
    blackFirstUser: () => {
      dispatch_gen(blackFirstUser(null))
    }
  }
}


class ConnectedStandup extends React.Component {
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
                  key={user.id} id={user.id} name={user.name} color={user.color}
                  />);
        }, this)}
      </div>
        <button onClick={this.props.blackFirstUser}>Clean</button>
        </div>
    );
  }
}

const Standup = connect(mapStateToProps, mapDispatchToProps)(ConnectedStandup);

export default Standup;
