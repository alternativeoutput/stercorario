import React, { Component } from 'react';
import './Main.css';

function print(arg) {
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
    console.log('User render');
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
  render () {
    console.log('Table render');
    var style = {paddingLeft: "32px"};
    return (
        <div style={style}>
        <h2>Table {this.props.name}</h2>
        <div>
        {this.props.users.map(function (user, id) {
          return (<User key={user.id} name={user.name} color={user.color}
                  ref={this.props.setUser_gen(user.id)}/>);
        }, this)}
      </div>
        <button onClick={this.props.handleTableClick}>Clean</button>
      </div>
    );
  }
}

class Standup extends React.PureComponent {
  render () {
    console.log('Standup render');
    return (
        <div>
        <h2>Standup</h2>
        <div>
      {this.props.users.map((user, id) => (
          <User key={user.id} name={user.name} color={user.color}
        ref={this.props.setUser_gen(user.id)}/>
      ))}
      </div>
        <button onClick={this.props.handleTableClick}>Clean</button>
        </div>
    );
  }
}


class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.tables = [{id: 0, name: "Zer", comp: React.createRef()},
                   {id: 1, name: "Uno", comp: React.createRef()},
                   {id: 2, name: "Due", comp: React.createRef()},
                   {id: 3, name: "Tre", comp: React.createRef()}];
    this.users = [{id:0, name: "Pippo", color: "#ff0000", table: null, pos: 0, comp: React.createRef()},
                  {id:1, name: "Pluto", color: "#00ff00", table: 1, pos: 1, comp: React.createRef()},
                  {id:2, name: "Paperino", color: "#0000ff", table: 1, pos: 0, comp: React.createRef()},
                  {id:3, name: "Minnie", color: "#ff00ff", table: 2, pos: 0, comp: React.createRef()},
                  {id:4, name: "Gastone", color: "#ffff00", table: null, pos: 1, comp: React.createRef()}
                 ];
    this.setUser_gen = this.setUser_gen.bind(this);
    this.handleTableClick_gen = this.handleTableClick_gen.bind(this);
  }

  setUser_gen() {
    let _this = this;

    return function(user_idx) {
      let _user_idx = user_idx;

      console.log('first');
      console.log(_user_idx);

      return function(comp) {
        console.log('second');
        console.log(_this);
        _this.users[_user_idx].comp.current = comp;
      }
    }
  }

  handleTableClick_gen(table_idx) {
    let _this = this;
    let _table_idx = table_idx;

    return function() {
      console.log("handleTableClick fired " + _table_idx);
      var users = _this.users.filter((item) => (item.table == _table_idx));
      users.sort((a, b) => (a.pos > b.pos));
      console.log(users);
      users[0].comp.current.setState(
        function(state, props){ console.log('updater'); console.log(state); return {...state, color: "#000000"}; });
    }
  }

  render () {
    console.log("Board render");
    var style = {paddingLeft: "32px"};
    return (
        <div>
        <h1>Board</h1>
        <div style={style}>
        {this.tables.map(
          function(table, id, arr) {
            var users = this.users.filter((item) => (item.table == id));
            users.sort((a, b) => (a.pos > b.pos));
            return (<Table key={id} id={id} name={table.name} users={users}
                    setUser_gen={this.setUser_gen()}
                    handleTableClick={this.handleTableClick_gen(id)}/>);
          }, this)}
        <Standup users={this.users.filter((item) => (item.table == null))}
                 setUser_gen={this.setUser_gen()}
                 handleTableClick={this.handleTableClick_gen(null)}/>

      </div>
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
