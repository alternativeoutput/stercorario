import React, { Component } from 'react';
import './Main.css';

function cl(arg) {
  console.log(arg);
}

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
  }

  render () {
    cl('Table render ' + this.props.id);
    cl(this.state.users);
    var style = {paddingLeft: "32px"};
    return (
        <div style={style}>
        <h2>Table {this.props.name}</h2>
        <div>
        {this.state.table_users_id.map(function (user_id, id) {
          var user = this.state.users[user_id];
          return (<User key={user_id} name={user.name}
                  color={user.color}
                  ref={this.props.setUser_gen(user.id)}/>);
        }, this)}
        </div>
        <button onClick={this.props.handleTableClick}>Clean</button>
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
    cl(this.state.standup_users_id.length);
    return (
        <div>
        <h2>Standup</h2>
        <div>
        {this.state.standup_users_id.map(function (user_id) {
          var user = this.state.users[user_id];
          return (<User
                  key={user.id} name={user.name} color={user.color}
                  ref={this.props.setUser_gen(user.id)}/>);
        }, this)}
      </div>
        <button onClick={this.props.handleTableClick}>Clean</button>
        </div>
    );
  }
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.tables = [{id: 0, name: "Zer", users_id: [], comp: React.createRef()},
                   {id: 1, name: "Uno", users_id: [], comp: React.createRef()},
                   {id: 2, name: "Due", users_id: [], comp: React.createRef()},
                   {id: 3, name: "Tre", users_id: [], comp: React.createRef()}];
    this.users = [{id:0, name: "Pippo", color: "#ff0000", table: null, pos: 0, comp: React.createRef()},
                  {id:1, name: "Pluto", color: "#00ff00", table: 1, pos: 1, comp: React.createRef()},
                  {id:2, name: "Paperino", color: "#0000ff", table: 1, pos: 0, comp: React.createRef()},
                  {id:3, name: "Minnie", color: "#ff00ff", table: 2, pos: 0, comp: React.createRef()},
                  {id:4, name: "Gastone", color: "#ffff00", table: null, pos: 1, comp: React.createRef()}
                 ];
    this.standup = {users_id: [], comp: React.createRef()};
        
    for (var i = 0 ; i < this.users.length ; i++) {
      var user = this.users[i];
      
      var table_id = user.table;
      if (table_id == null) {
        this.standup.users_id.push(user.id);
      }
      else {
        if (this.tables[table_id].users_id.length < user.pos + 1) {
          for (var e = this.tables[table_id].users_id.length ;
               e < user.pos + 1 ; e++) {
            this.tables[table_id].users_id.push(null);
          }
        }
        this.tables[table_id].users_id[user.pos] = user.id;
      }
    }

    this.setUser_gen = this.setUser_gen.bind(this);
    this.handleTableClick_gen = this.handleTableClick_gen.bind(this);
    this.handleEmptyTableOneClick = this.handleEmptyTableOneClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  setUser_gen() {
    let _this = this;

    return function(user_idx) {
      let _user_idx = user_idx;

      return function(comp) {
        cl('inner setUser_gen ' + comp);
        _this.users[_user_idx].comp.current = comp;
      }
    }
  }

  handleTableClick_gen(table_idx) {
    let _this = this;
    let _table_idx = table_idx;

    return function() {
      cl("handleTableClick fired (table_id: " + _table_idx + ")");
      var users = _this.users.filter((item) => (item.table == _table_idx));
      users.sort((a, b) => (a.pos > b.pos));
      cl(users);
      users[0].color = "#000000";
      users[0].comp.current.setState(
        function(state, props){
          cl('updater: color');
          cl(state);
          return {...state, color: users[0].color}; });
    }
  }

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
        {this.tables.map(
          function(table, id) {
            return (<Table key={id} id={id} name={table.name} users={this.users}
                    table_users_id={table.users_id}
                    setUser_gen={this.setUser_gen()}
                    handleTableClick={this.handleTableClick_gen(id)}
                    ref={table.comp}/>);
          }, this)}
        <Standup users={this.users}
                 standup_users_id={this.standup.users_id}
                 setUser_gen={this.setUser_gen()}
                 handleTableClick={this.handleTableClick_gen(null)}
                 ref={this.standup.comp}/>

      </div>
      <button onClick={this.handleEmptyTableOneClick}>Empty table one.</button>
      </div>
    );
  }
}


class App extends React.PureComponent {
    render() {
        return <Board/>;
    }
}

export default App;
