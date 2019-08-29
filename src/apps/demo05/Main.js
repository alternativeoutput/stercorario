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
    this.users_comp = [React.createRef(),
                       React.createRef(),
                       React.createRef(),
                       React.createRef(),
                       React.createRef()];

    this.handleClick = this.handleClick.bind(this);
    this.setUser_gen = this.setUser_gen.bind(this);
  }

  setUser_gen(idx) {
    let _idx = idx;
    let _this = this;

    return function(comp) {
      _this.users_comp[_idx].current = comp;
    }
  }

  handleClick() {
    // this.setState(state => ({
    //  acceso: !state.acceso
    // }));
    console.log("handleClick fired");
    console.log(this.users_comp);
    this.users_comp[0].current.setState(
        function(state, props){ console.log('updater'); console.log(state); return {...state, color: "#000000"}; });
  }

  render () {
    console.log('Table render');
    var style = {paddingLeft: "32px"};
    return (
        <div style={style}>
        <h2>Table {this.props.name}</h2>
        <div>
        {this.props.users.map(function (user, id) {
          return (<User key={user.id} name={user.name} color={user.color}  ref={this.setUser_gen(user.pos)}/>);
        }, this)}
      </div>
        <button onClick={this.handleClick}>Clean</button>
      </div>
    );
  }
}

class Standup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.users_comp = [React.createRef(),
                       React.createRef(),
                       React.createRef(),
                       React.createRef(),
                       React.createRef()];
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // this.setState(state => ({
    //  acceso: !state.acceso
    // }));
    console.log("handleClick fired");
    this.users_comp[0].current.setState(
      function(state, props){ console.log('updater'); console.log(state); return {...state, color: "#000000"}; });
  }

  render () {
    console.log('Standup render');
    return (
        <div>
        <h2>Standup</h2>
        <div>
      {this.props.users.map((user, id) => (
          <User key={user.id} name={user.name} color={user.color} ref={this.users_comp[user.pos]}/>
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
    var style = {paddingLeft: "32px"};
    return (
        <div>
        <h1>Board</h1>
        <div style={style}>
        {this.tables.map(
          function(table, id, arr) {
            var users = this.users.filter((item) => (item.table == id));
            users.sort((a, b) => (a.pos > b.pos));
            return (<Table key={id} id={id} name={table.name} users={users}/>);
          }, this)}
        <Standup users={this.users.filter((item) => (item.table == null))} />
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
