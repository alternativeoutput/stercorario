import React, { Component } from 'react';
import { connect } from 'react-redux';
import { blackFirstUser, emptyTableOne } from './reducers/Main'
import Table from './components/Table'
import Standup from './components/Standup'
import './Main.css';
import { cl } from '../../core/common/Utils'

const mapStateToProps = state => { return state; }


// SitDown
// WakeUp
// ChangeColor
// Input: table ID


class ConnectedBoard extends React.Component {
  constructor(props) {
    super(props);

    this.handleEmptyTableOneClick = this.handleEmptyTableOneClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  handleEmptyTableOneClick(event) {
    let table_id = 1;

    event.preventDefault();
    this.props.dispatch(emptyTableOne());
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

                    name={table.name}
                    table_users_id={table.users_id}
                    blackFirstUser={blackFirstUser(table_id)}
                    />);
          }, this)}
        <Standup users={this.props.users}
                 dispatch={this.props.dispatch}
                 standup_users_id={this.props.standup.users_id}
                 blackFirstUser={blackFirstUser(null)}
        />

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
