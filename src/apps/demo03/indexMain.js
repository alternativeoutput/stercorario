import React from "react";
import ReactDOM from 'react-dom';

// These two containers are siblings in the DOM
const appContainer = document.getElementById('app-container');
const modalContainer = document.getElementById('modal-container');

// Let's create a Modal component that is an abstraction around
// the portal API.
class Modal extends React.Component {
  // Create a div that we'll render the modal into. Because each
  // Modal component has its own element, we can render multiple
  // modal components into the modal container.
  el = document.createElement('div');
  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalContainer.appendChild(this.el);
  }
  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalContainer.removeChild(this.el);
  }
  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el,
    );
  }
}

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
class App extends React.Component {
  state = {showModal: false};
  onShow = () => this.setState({showModal: true});
  onHide = () => this.setState({showModal: false});
  render() {
    // Show a Modal on click.
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)
    const modal = this.state.showModal
      ? <Modal
          key="modal"
          children={
            <div className="modal">
              <div>
                With a portal, we can render content into a different part of
                the DO, as if it were any other React child.
              </div>
              This is being rendered inside the #modal-container div
              <button onClick={this.onHide}>Hide modal</button>
            </div>
          }
        />
      : null;

    return (
      <div className="app">
        This div has overflow: hidden.
        <button onClick={this.onShow}>Show modal</button>
        {modal}
      </div>
    );
  }
}

import './indexMain.css';
ReactDOM.render(<App />, appContainer);
