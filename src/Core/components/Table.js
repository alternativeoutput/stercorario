import React, { Component } from 'react';
import { connect } from 'react-redux'
import User from '../../components/User';
import { addUser } from '../../reducers/Table'
import { wakeupUser } from '../../reducers/Table'

import { v4 as uuidv4 } from 'uuid'

const mapStateToProps = state => (
    { user_tbl: state.user })

class ConnectedTable extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        let name = this.new_user_name.value;
        this.new_user_name.value = "";

        if (name === "") {
            alert("User name is empty");
            return false;
        }
        let uu = uuidv4();
        this.props.dispatch(
            (this.props.addUser === undefined ?
             addUser :
             this.props.addUser)({name: name, _id: uu, key: uu})
        );
    }

    render() {
        let user_tbl = this.props.user_tbl;
        let name = this.props.name;
        let user = this.props.user;
        let adder = "";

        if (user.length < 5) {
            adder = (<div>Name: <input type="text" ref={new_user_name => (this.new_user_name = new_user_name)}/>&nbsp;<button onClick={this.handleClick}>Add User</button></div>);
        }
        console.log('From Table');
        console.log(this.props.wakeupUser);
        return (
                <div className="container">
                <strong>Table: {name}</strong>
                <table className="tableComponent"><tbody>
                { user.map(
                    (_id, index) =>
                        (<User
                         wakeupUser={(this.props.wakeupUser === undefined ?
                                      wakeupUser : this.props.wakeupUser)(index)}
                         {...user_tbl[_id]}/>
                        )
                ) }
            </tbody></table>{adder}<hr/><br/></div>);
        }
}

const Table = connect(mapStateToProps)(ConnectedTable);
export default Table;
