import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { cl } from 'core/common/Utils';

function makeMapStateToProps(state_gen, props_gen) {
  function mapStateToProps(state, props) {
    // debugger;
    let user = state.users.byId[props_gen.id];
    return {
      id: user.id,
      name: user.name,
      color: user.color
    }
  }
  return mapStateToProps;
}


class ConnectedUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: props.color,
                  name: props.name };
  }

  render () {
    cl('User render ' + this.props.id);
    var bgcol = { color: this.props.color };
    var style = {paddingLeft: "32px"};
    return (
        <div style={style}>
        <h3 style={bgcol}>User: {this.props.name}</h3>
        </div>
    );
  }
}

const User = connect(makeMapStateToProps, null, null, { forwardRef: true })(ConnectedUser);

export default User;
