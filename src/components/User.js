import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { wakeupUser } from '../reducers/User';

const mapStateToProps = state => (
    {});

class ConnectedUser extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.wakeupUser = null;
    }

    handleClick(event) {
        event.preventDefault();
        console.log("this.wakeupUser");
        console.log(this.wakeupUser);
        this.wakeupUser();
    }

    render() {
        this.wakeupUser = bindActionCreators(
            (this.props.wakeupUser === undefined ? wakeupUser :
             this.props.wakeupUser),
            this.props.dispatch);
        
        return (<tr><td>User: {this.props.name}</td>
                <td><button onClick={this.handleClick}>Wake Up</button></td></tr>);
    }
}

const User = connect(mapStateToProps)(ConnectedUser);
export default User;
