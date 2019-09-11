import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { cl } from 'core/common/Utils';

function makeMapStateToProps(state_gen, props_gen) {
  function mapStateToProps(state, props) {
    let user = state_gen.users.byId[props_gen.id];
    return {
      ...user
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

const User = connect(makeMapStateToProps)(ConnectedUser);

export default User;
