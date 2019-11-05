import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './components/LoginForm'
import './Main.css';
import { cl } from '../../core/common/Utils'

const mapStateToProps = state => { return state; }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    emptyOne: () => {
      dispatch(emptyOne())
    }
  }
}

class ConnectedBody extends React.Component {
  constructor (props) {
    super(props)
    this.login = this.login.bind(this)
    this.state = { logged: false, username: 'nouser' }
  }
  login(user, pass) {
    cl('here we are 2 user: [' + user + '] pass [' + pass + ']');
  }

  render () {
    cl("Body render");
    var style = {paddingLeft: "32px"};

    var frag;
     if (this.state.logged) {
            frag = ( <div>Logged in as { this.state.username }</div> )
          } else {
            frag = ( <LoginForm login={this.login}/> )
          }
    
    return (
        <div>
        <h1>Body</h1>
        <div style={style}>
        { frag }
      </div>
      </div>
    );
  }
}

const Body = connect(mapStateToProps, mapDispatchToProps)(ConnectedBody);


class App extends React.PureComponent {
    render() {
        return (
                <React.Fragment>
                <div><h1>Demo07</h1></div>
                <Body/>
                </React.Fragment>
        );
    }
}

export default App;
