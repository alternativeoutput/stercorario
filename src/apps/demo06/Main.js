import React, { Component } from 'react';
import { connect } from 'react-redux';
import { blackFirstUser } from './reducers/Main'
import './Main.css';

function cl(arg) {
  console.log(arg);
}

const mapStateToProps = state => { return state; }


// SitDown
// WakeUp
// ChangeColor
// Input: table ID

class User extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {color: props.color,
                  name: props.name };
  }

  render () {
    cl('User render');
    var bgcol = { color: this.state.color };
    var style = {paddingLeft: "32px"};
    return (
        <div style={style}>
        <h3 style={bgcol}>User: {this.state.name}</h3>
        </div>
    );
  }
}

class Table extends React.PureComponent {
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
          console.log('pre debugger');
          // debugger;
          return (<User key={user_id} name={user.name}
                  color={user.color}
                  ref={this.props.setUser_gen(user.id)}/>);
        }, this)}
        </div>
        <button onClick={this.handleTableClick}>Clean</button>
        </div>
    );
  }
}

class Standup extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {users: props.users,
                  standup_users_id: props.standup_users_id};
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
        <button onClick={this.props.blackFirstUser}>Clean</button>
        </div>
    );
  }
}


class ConnectedBoard extends React.Component {
  constructor(props) {
    super(props);

    this.setUser_gen = this.setUser_gen.bind(this);
    this.handleEmptyTableOneClick = this.handleEmptyTableOneClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.props.users.allIds.map(
      function (cur_id) {
        if (this.props.users.byId[cur_id] !== nextProps.users.byId[cur_id]) {
          console.log(this.props.users.byId[cur_id].color + ' changed !');
          this.props.users.byId[cur_id].comp.current.setState(
            nextProps.users.byId[cur_id]
          )
        }
      }, this);
    cl('shouldBoard update');
    return false;
  }

  setUser_gen() {
    let _this = this;

    return function(user_idx) {
      let _user_idx = user_idx;

      return function(comp) {
        cl('inner setUser_gen ' + comp);
        _this.props.users.byId[_user_idx].comp.current = comp;
      }
    }
  }

  // handleTableClick(event) {
  //   event.preventDefault();
    
  //   this.props.dispatch(
  //     this.props.blackFirstUser()
  //   );
  // }
   
  handleEmptyTableOneClick() {
    let table_id = 1;

    cl('EmptyOne fired');
    var table_users_id = [];
    var standup_users_id = [];

    this.tables[table_id].users_id.map(
      function (user_id) {
        cl('mapped ' + user_id);
        this.standup.users_id.push(user_id);
        this.users[user_id].table = null;
      }, this);
    standup_users_id = this.standup.users_id.slice();

    this.tables[table_id].comp.current.setState((state, props) => (
      {table_users_id: table_users_id}));
    this.standup.comp.current.setState((state, props) => (
      {standup_users_id: standup_users_id}));
  }

  render () {
    cl("Board render");
    var style = {paddingLeft: "32px"};
    return (
        <div>
        <h1>Board</h1>
        <div style={style}>
        {this.props.tables.allIds.map(
          function(table_id, id) {
            let table = this.props.tables.byId[table_id];
            return (<Table key={table_id} id={table_id}
                    users={this.props.users}
                    dispatch={this.props.dispatch}
                    ref={table.comp}

                    name={table.name}
                    table_users_id={table.users_id}
                    setUser_gen={this.setUser_gen()}
                    blackFirstUser={blackFirstUser(table_id)}
                    />);
          }, this)}
        <Standup users={this.props.users}
                 standup_users_id={this.props.standup.users_id}
                 setUser_gen={this.setUser_gen()}
                 blackFirstUser={blackFirstUser(null)}
                 ref={this.props.standup.comp}/>

      </div>
      <button onClick={this.handleEmptyTableOneClick}>Empty table one.</button>
      </div>
    );
  }
}

const Board = connect(mapStateToProps)(ConnectedBoard);


class App extends React.PureComponent {
    render() {
        return (
                <React.Fragment>
                <div><h1>Demo06</h1></div>
                <Board/>
                </React.Fragment>
        );
    }
}

export default App;
