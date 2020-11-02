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

class SterCell extends React.Component {
  constructor(props) {
    super(props)
  }

  render ()
  {
    let cont;
    let idx = linearIdx(this.props.row, this.props.col);
    if (idx in _sterBoardCell) {
      cont = _sterBoardCell[idx];
    }
    else {
      cont = ""
    }

    const cls = "ster_cell_" + cont + " ster_cell"
    
    return (
        <td className={cls}></td>
    )
  }
}

class SterRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render ()
  {
    return (
        <tr>
        {[...Array(17)].map((x, col) => <SterCell key={this.props.row + '_' + col} row={this.props.row} col={col}/>)}
      </tr>
    )
  }
}

var _sterBoardCell = {};

function linearIdx(y, x)
{
  return y * 17 + x;
}

function quadSet(dict, pt, v)
{
  _sterBoardCell[linearIdx(8 + pt[0], 8 + pt[1])] = v
  _sterBoardCell[linearIdx(8 - pt[1], 8 + pt[0])] = v
  _sterBoardCell[linearIdx(8 - pt[0], 8 - pt[1])] = v
  _sterBoardCell[linearIdx(8 + pt[1], 8 - pt[0])] = v
  
}

class SterBoard extends React.Component {
  constructor(props) {
    super(props)
    let c3p = [[8, 0], [8, 8]]
    let c2p = [[3, 3], [4, 4], [5, 5], [6, 6], [7, 7]]
    let c3l = [[2, 2], [2, 7], [7, 2]]
    let c2l = [[5, 0], [6, 1], [1, 1], [8, 4], [4, 8], [1, 6]]

    for (let i=0 ; i<c3p.length ; i++) 
      quadSet(_sterBoardCell, c3p[i], "3p")
    for (let i=0 ; i<c2p.length ; i++) 
      quadSet(_sterBoardCell, c2p[i], "2p")
    for (let i=0 ; i<c3l.length ; i++) 
      quadSet(_sterBoardCell, c3l[i], "3l")
    for (let i=0 ; i<c2l.length ; i++) 
      quadSet(_sterBoardCell, c2l[i], "2l")
    
    _sterBoardCell[linearIdx(8, 8)] = 'sterco'

  }

  render ()
  {
    return (<table className="ster_board">
            <tbody>
            {[...Array(17)].map((x, row) => <SterRow key={row} row={row}/>)}
            </tbody>
            </table>)
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
             <table><tbody><tr><td><SterBoard/></td><td style={{verticalAlign: "top"}}>
             <h3>Stercorario</h3>

             <label>Logged in as <b>{ this.props.username }</b></label>.<br/>

             <textarea id="chat-log" cols="40" rows="20"></textarea><br/>
             <input ref={this.textInput} id="chat-message-input" type="text" size="50" onKeyUp={this.send_key}/><br/>
             <input ref={this.submitBtn} id="chat-message-submit" type="button" value="Send" onClick={this.send_btn}/><br/>

             <button onClick={this.props.logout}>Logout</button>
             </td></tr></tbody></table></div> )
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
    cl(data)
    this.setState(prevState => ({is_initialized: true,
                                 is_auth: data.is_auth,
                                 username: data.username}))
  }

  login(user, pass, table) {
    this.transport.login(user, pass, table)
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
                <Body/>
                </React.Fragment>
        )
    }
}

export default App
