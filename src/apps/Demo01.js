import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table';
import './Demo01.css';

const mapStateToProps = state => (
    { table: state.table })

/*  {...tableDispatchProperties(tindex)(this.props.dispatch)} */

class ConnectedApp extends Component {
    render() {
        return (
                <div className="App">
                <header className="App-header">
                <h1 className="App-title">Welcome to Yojne: Demo01</h1>
                </header>
                <div>
                <Table {...this.props.table} />
            </div></div>);
    }
}
const App = connect(mapStateToProps)(ConnectedApp);

export default App;
