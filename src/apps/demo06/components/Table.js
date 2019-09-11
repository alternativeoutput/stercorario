import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from './User';
import { cl } from 'core/common/Utils';

function makeMapStateToProps(state_gen, props_gen) {
  function mapStateToProps(state, props) {
    let user = state_gen.tables.byId[props_gen.id];
    return {
      ...user
    }
  }
  return mapStateToProps;
}

class ConnectedTable extends Component {
  constructor (props) {
    super(props);
    this.state = {users: props.users,
                  table_users_id: props.table_users_id};
    this.handleTableClick = this.handleTableClick.bind(this);
  }

  handleTableClick(event) {
    event.preventDefault();

    this.props.dispatch(this.props.blackFirstUser());
  }

  render () {
    cl('Table render ' + this.props.id);
    var style = {paddingLeft: "32px"};
    return (
        <div style={style}>
        <h2>Table {this.props.name}</h2>
        <div>
        {this.props.users_id.map(function (user_id, id) {
          var user = this.state.users.byId[user_id];
          return (<User key={user_id} id={user_id} name={user.name}
                  color={user.color}
                  />);
        }, this)}
        </div>
        <button onClick={this.handleTableClick}>Clean</button>
        </div>
    );
  }
}

const Table = connect(makeMapStateToProps)(ConnectedTable);

export default Table;
