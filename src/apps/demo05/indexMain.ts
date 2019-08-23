const appRoot = document.getElementById('app-root');

class Reparentable extends React.Component<{ el: HTMLElement }> {
  private readonly ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.ref.current!.appendChild(this.props.el);
  }

  render() {
    return <div ref={this.ref}/>;
  }
}

class Parent extends React.Component {
  private readonly childContainer: HTMLElement = document.createElement('div');
  state = {
    down: false,
  };

  handleClick = () => {
    this.setState(prevState => ({
      down: !prevState.down
    }));
  }

  render() {
    return (
      <div>
        <p>Down: {this.state.down + ''}</p>
        <button onClick={this.handleClick}>Click</button>
        {ReactDOM.createPortal(<Child />, this.childContainer)}
        <h2>Root 1</h2>
        <div key="1">
          {!this.state.down && <Reparentable el={this.childContainer} />}
        </div>
        <h2>Root 2</h2>
        <div key="2">
          {this.state.down && <Reparentable el={this.childContainer} />}
        </div>
      </div>
    );
  }
}

class Child extends React.Component {
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

ReactDOM.render(<Parent />, appRoot);
