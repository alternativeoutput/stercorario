import React, { PureComponent } from 'react';
import { cl } from 'core/common/Utils';

class User extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {color: props.color,
                  name: props.name };
  }

  render () {
    cl('User render');
    var bgcol = { color: this.state.color };
    var style = {paddingLeft: "32px"};
    return (
        <div style={style}>
        <h3 style={bgcol}>User: {this.state.name}</h3>
        </div>
    );
  }
}

export default User;
