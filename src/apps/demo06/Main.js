import React, { Component } from 'react';
import { connect } from 'react-redux';
import { blackFirstUser } from './reducers/Main'
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

    this.setUser_gen = this.setUser_gen.bind(this);
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
                 dispatch={this.props.dispatch}
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
