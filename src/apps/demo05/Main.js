import React, { Component } from 'react';
import './Main.css';

// SitDown
// WakeUp
// ChangeColor
// Input: table ID

class User extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {color: props.color,
                  name: props.name };
    props.set_state_back(this.setState, this);
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
  constructor(props) {
    super(props);
    this.users_setState = [null, null, null, null, null];
    this.handleClick = this.handleClick.bind(this);
    this.setUser_setState_gen = this.setUser_setState_gen.bind(this);
  }

  setUser_setState_gen(idx) {
    var _idx = idx;
    var _this = this;
    return function(fn, ctx) {
      console.log("setUser_setState(" + _idx + ")");
      _this.users_setState[_idx] = {'fn': fn, 'ctx': ctx};
    };
  }

  handleClick() {
    // this.setState(state => ({
    //  acceso: !state.acceso
    // }));
    console.log("handleClick fired");
    console.log(this.users_setState[0]);
    this.users_setState[0].fn.apply(
      this.users_setState[0].ctx, [
        function(state, props){ console.log('updater'); console.log(state); return {...state, color: "#000000"}; }]);
  }

  render () {
    console.log('Table render');
    var style = {paddingLeft: "32px"};
    return (
        <div style={style}>
        <h2>Table {this.props.name}</h2>
        <div>
      {this.props.users.map((user, id) => (
          <User key={user.id} name={user.name} color={user.color} set_state_back={this.setUser_setState_gen(user.pos)}/>
      ))}
      </div>
        <button onClick={this.handleClick}>Clean</button>
      </div>
    );
  }
}

class Standup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.users_setState = [null, null, null, null, null];
    this.handleClick = this.handleClick.bind(this);
    this.setUser_setState_gen = this.setUser_setState_gen.bind(this);
  }

  setUser_setState_gen(idx) {
    var _idx = idx;
    var _this = this;
    return function(fn, ctx) {
      console.log("setUser_setState(" + _idx + ")");
      _this.users_setState[_idx] = {'fn': fn, 'ctx': ctx};
    };
  }

  handleClick() {
    // this.setState(state => ({
    //  acceso: !state.acceso
    // }));
    console.log("handleClick fired");
    console.log(this.users_setState[0]);
    this.users_setState[0].fn.apply(
      this.users_setState[0].ctx, [
        function(state, props){ console.log('updater'); console.log(state); return {...state, color: "#000000"}; }]);
  }

  render () {
    console.log('Standup render');
    return (
        <div>
        <h2>Standup</h2>
        <div>
      {this.props.users.map((user, id) => (
          <User key={user.id} name={user.name} color={user.color} set_state_back={this.setUser_setState_gen(user.pos)}/>
      ))}
      </div>
        <button onClick={this.handleClick}>Clean</button>
        </div>
    );
  }
}


class Board extends React.PureComponent {
  constructor(props) {
    super(props);
    this.tables = [{id: 0, name: "Zer"},
                   {id: 1, name: "Uno"},
                   {id: 2, name: "Due"},
                   {id: 3, name: "Tre"}];
    this.users = [{id:0, name: "Pippo", color: "#ff0000", table: null, pos: 0},
                  {id:1, name: "Pluto", color: "#00ff00", table: "1", pos: 1},
                  {id:2, name: "Paperino", color: "#0000ff", table: "1", pos: 0},
                  {id:3, name: "Minnie", color: "#ff00ff", table: 2, pos: 0},
                  {id:4, name: "Gastone", color: "#ffff00", table: null, pos: 1}
                 ];
  }

  render () {
    console.log("Board render");
    return (
        <div>
        <h1>Board</h1>
        {this.tables.map(
          function(table, id, arr) {
            var users = this.users.filter((item) => (item.table == id));
            users.sort((a, b) => (a.pos > b.pos));
            return (<Table key={id} id={id} name={table.name} users={users}/>);
          }, this)}
        <Standup users={this.users.filter((item) => (item.table == null))} />

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
