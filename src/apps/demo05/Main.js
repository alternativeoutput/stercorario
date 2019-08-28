import React, { Component } from 'react';
import './Main.css';

// SitDown
// WakeUp
// ChangeColor
// Input: table ID

class User extends React.PureComponent {
  constructor(props) {
    super(props);
    this.color = props.color;
    this.name = props.name;
  }
  
  render () {
    var bgcol = { color: this.color };
    var style = {paddingLeft: "32px"};
    return (
        <div style={style}>
        <h3 style={bgcol}>User: {this.name}</h3>
        </div>
    );
  }
}

class Table extends React.PureComponent {
  constructor(props) {
    super(props);
  }

/*
  handleClick() {
    // this.setState(state => ({
    //  acceso: !state.acceso
    // }));
    console.log("handleClick fired");
  }
*/
  
  render () {
    console.log('Table here');
    var style = {paddingLeft: "32px"};
    return (
        <div style={style}>
        <h2>Table {this.props.name}</h2>
        <div>
      {this.props.users.map((user, id) => (
          <User key={user.id} name={user.name} color={user.color}/>
      ))}
      </div>
        <button>Clean</button>
      </div>
    );
  }
}

class Standup extends React.PureComponent {
  render () {
    console.log('Standup here');
    return (
        <div>
        <h2>Standup</h2>
        <div>
      {this.props.users.map((user, id) => (
          <User key={id} name={user.name} color={user.color}/>
      ))}
      </div>
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
                  {id:3, name: "Minnie", color: "#ff00ff", table: 2, pos: 0}];
  }

  render () {
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
