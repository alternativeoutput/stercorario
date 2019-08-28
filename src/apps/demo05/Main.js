import React, { Component } from 'react';
import './Main.css';

// SitDown
// WakeUp
// ChangeColor
// Input: table ID

class Table extends React.PureComponent {
  render () {
    console.log('Table here');
    return (
        <div>
        <h3>Table {this.props.name}</h3>
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
    this.users = [{id:0, name: "Pippo", table: null, pos: 0},
                  {id:1, name: "Pluto", table: "1", pos: 1},
                  {id:2, name: "Paperino", table: "1", pos: 0},
                  {id:3, name: "Minnie", table: 2, pos: 0}];
  }

  render () {
    return (
        <div>
        <h1>Board</h1>
        {this.tables.map(
          function(table, id, arr) {
            return (<Table key={id} id={id} name={table.name} users={this.users}/>);
          }, this)}
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
