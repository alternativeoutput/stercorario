import React from "react";
import ReactDom from 'react-dom';

const appRoot = document.getElementById('root');

/*
  Parent
    Reparentable
      Child
  */

class NChild extends React.Component {
  componentDidMount() {
    console.log('componentDidMount');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  
  render() {
   return (
      <div>
       CHILD
      </div>
    );
  }
}
class NReparentable extends React.Component {
  ref = React.createRef();

  componentDidMount() {
    this.ref.current.appendChild(this.props.el);
  }

  render() {
    return <div ref={this.ref}/>;
  }
}

class NParent extends React.Component {
  childContainer = document.createElement('div');
  state = {
    acquired: false,
  };

  handleClick = () => {
    this.setState(prevState => ({
      acquired: true
    }));
  }

  render() {
    return (
      <div>
        <p>Acquired: {this.state.acquired + ''}</p>
        <button onClick={this.handleClick}>Click</button>
        {ReactDom.createPortal(<NChild />, this.childContainer)}
            <h2>Root {this.props.title}</h2>
        <div>
          {this.state.acquired && <NReparentable el={this.childContainer} />}
        </div>
      </div>
    );
  }
}

class NPage extends React.Component {
    render() {
        return (
                <div>
                <NParent title="1" />
                <NParent title="2" />
                <NChild />
                </div>
        );
    }
}

ReactDom.render(<NPage />, appRoot);
