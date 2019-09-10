import React, { PureComponent } from 'react';
import User from './User';
import { cl } from 'core/common/Utils';

class Table extends PureComponent {
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
        {this.state.table_users_id.map(function (user_id, id) {
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

export default Table;
