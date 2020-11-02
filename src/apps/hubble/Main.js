import * as jQuery from 'jquery'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import Transport from './components/Transport'
import Cookies from 'js-cookie'
import './Main.css'
import { cl } from '../../core/common/Utils'

const mapStateToProps = state => { return state }

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    emptyOne: () => {
      dispatch(emptyOne())
    }
  }
}

class AuthApp extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
    this.submitBtn = React.createRef()
    this.send_key = this.send_key.bind(this)
    this.send_btn = this.send_btn.bind(this)
  }


  send_key(e)
  {
    cl('send_key')
    if (e.keyCode === 13) {  // enter, return
      this.submitBtn.current.click();
    }
  }

  send_btn(e)
  {
    cl('send_btn')
    let textInput = this.textInput.current
    let message = textInput.value
    console.log('onclick send');
    this.props.send(message)

    textInput.value = ''
  }

  render ()
  {
    return ( <div>
             <label>Logged in as <b>{ this.props.username }</b></label>.<br/>

             <textarea id="chat-log" cols="100" rows="20"></textarea><br/>
             <input ref={this.textInput} id="chat-message-input" type="text" size="50" onKeyUp={this.send_key}/><br/>
             <input ref={this.submitBtn} id="chat-message-submit" type="button" value="Send" onClick={this.send_btn}/><br/>

             <button onClick={this.props.logout}>Logout</button>
             </div> )
  }
}

class ConnectedBody extends React.Component {
  constructor (props) {
    super(props)
    this.state = { is_initialized: false, is_auth: false, username: 'nouser' }

    this.transp_cb = this.transp_cb.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.send = this.send.bind(this)

    this.transport = new Transport(this.transp_cb)
  }

  transp_cb(meth, data) {
    cl('transp_cb')
    this.setState(prevState => ({is_initialized: true,
                                 is_auth: data.is_auth,
                                 username: data.username}))
  }

  login(user, pass) {
    this.transport.login(user, pass)
  }

  logout() {
    this.transport.logout()
  }

  logout_cb() {
  }

  send(message) {
    console.log(typeof(this.transport))
    this.transport.send((JSON.stringify({
      'type': 'chat-message',
      'message': message
    })))
  }

  componentDidMount() {
    this.transport.proof()
  }

  render ()
  {
    cl("Body render")
    var style = {paddingLeft: "32px"}

    var sessionid = Cookies.get('sessionid',{domain: 'localhost'})
    console.log('SESSID: ' + sessionid)

    var frag

    if (this.state.is_initialized) {
      if (this.state.is_auth) {
        frag = ( <AuthApp username={this.state.username} send={this.send} logout={this.logout}/> )
      } else {
        frag = ( <LoginForm login={this.login}/> )
      }
    }
    else {
      frag = ( <div>Connecting to the server ...</div> )
    }
    return (
        <div>
        <h1>Body</h1>
        <div style={style}>
        { frag }
      </div>
      </div>
    )
  }
}

const Body = connect(mapStateToProps, mapDispatchToProps)(ConnectedBody)


class App extends React.PureComponent {
    render() {
        return (
                <React.Fragment>
                <div><h1>Demo07</h1></div>
                <Body/>
                </React.Fragment>
        )
    }
}

export default App
