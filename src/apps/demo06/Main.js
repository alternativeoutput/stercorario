import React, { Component } from 'react';
import { connect } from 'react-redux';
import { blackFirstUser, emptyTableOne } from './reducers/Main'
import Table from './components/Table'
import Standup from './components/Standup'
import './Main.css';
import { cl } from '../../core/common/Utils'

const mapStateToProps = state => { return state; }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    emptyTableOne: () => {
      dispatch(emptyTableOne())
    }
  }
}

// SitDown
// WakeUp
// ChangeColor
// Input: table ID


class ConnectedBoard extends React.Component {
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
                    />);
          }, this)}
        <Standup users={this.props.users}
                 dispatch={this.props.dispatch}
                 standup_users_id={this.props.standup.users_id}
                 blackFirstUser={blackFirstUser(null)}
        />

      </div>
      <button onClick={this.props.emptyTableOne}>Empty table one.</button>
      </div>
    );
  }
}
//                     blackFirstUser={blackFirstUser(table_id)}

const Board = connect(mapStateToProps, mapDispatchToProps)(ConnectedBoard);


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
