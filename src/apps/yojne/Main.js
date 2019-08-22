import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../../core/components/Table';
import { addUser, wakeupUser } from './reducers/Main'
import './Main.css';

const mapStateToProps = state => (
    { table: state.table })

/*  {...tableDispatchProperties(tindex)(this.props.dispatch)} */

class ConnectedApp extends Component {
    render() {
        return (
                <div className="App">
                <header className="App-header">
                <h1 className="App-title">Welcome to Yojne</h1>
                </header>
                <div>
                {this.props.table.map(
                    (table, index) =>
                        (<Table
                         {...this.props.table[index]}
                         wakeupUser={wakeupUser(index)}
                         addUser={addUser(index)}
                         />
                        ))
                }
            </div></div>);
    }
}
const App = connect(mapStateToProps)(ConnectedApp);

export default App;
