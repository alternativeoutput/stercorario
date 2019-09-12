import { BLACK_FIRST_USER, EMPTY_TABLE_ONE} from '../constants/action-types';
import { bindActionAttrs } from '../../../core/store/bindIndexToActionCreators';
import { blackFirstUser as blackFirstUser_table } from './Table';
import React from 'react';

import { cl } from 'core/common/Utils';

const initialState = {
  users: {
    byId: {
      0: {id:0, name: "Pippo", color: "#ff0000", table: null, pos: 0},
      1: {id:1, name: "Pluto", color: "#00ff00", table: 1, pos: 1},
      2: {id:2, name: "Paperino", color: "#0000ff", table: 1, pos: 0},
      3: {id:3, name: "Minnie", color: "#ff00ff", table: 2, pos: 0},
      4: {id:4, name: "Gastone", color: "#ffff00", table: null, pos: 1},
      5: {id:5, name: "UserZero", color: "#ff8888", table: 0, pos: 0}
    },
    allIds: [0, 1, 2, 3, 4, 5]
  },
  tables: {
    byId: {
      0: {id: 0, name: "Zer", users_id: []},
      1: {id: 1, name: "Uno", users_id: []},
      2: {id: 2, name: "Due", users_id: []},
      3: {id: 3, name: "Tre", users_id: []}
    },
    allIds: [0, 1, 2, 3]
  },
  standup: {
    users_id: [],
    comp: React.createRef()
  }
};

initialState.users.allIds.map(function(el, id) {
  let user = this.users.byId[id];

  cl('initalStateUpdate');
  let table_id = user.table;
  if (table_id == null) {
    this.standup.users_id.push(user.id);
  }
  else {
    if (this.tables.byId[table_id].users_id.length < user.pos + 1) {
      for (var e = this.tables.byId[table_id].users_id.length ;
           e < user.pos + 1 ; e++) {
        this.tables.byId[table_id].users_id.push(null);
      }
    }
    this.tables.byId[table_id].users_id[user.pos] = user.id;
  }
}, initialState);

const rootReducer = (state = initialState, action) => {
  let new_state;
  let table, new_table;
  
  cl('root reducer');
  cl(action);

  switch (action.type) {

  case EMPTY_TABLE_ONE:
    new_state = {
        ...state,
      standup: {...state.standup}
    }
    let table_id = 1
    new_state.tables.byId[table_id].users_id.map(function (user_id) {
      this.users.byId[user_id] = { ...state.users.byId[user_id] };
      this.standup.users_id.push(user_id);
      this.users.byId[user_id].table = null;
    }, new_state);
    new_state.standup.users_id = new_state.standup.users_id.slice();
    new_state.tables.byId[table_id].users_id = [];
    cl(new_state.standup.users_id);
    return new_state;
    break;

  case BLACK_FIRST_USER:
    let changed_user_id;

    if (action.table_idx !== null) {
      if (state.tables.byId[action.table_idx].users_id.length <= 0)
        return state;
      changed_user_id = state.tables.byId[action.table_idx].users_id[0];
    }
    else {
      if (state.standup.users_id.length <= 0)
        return state;
      changed_user_id = state.standup.users_id[0];
    }

    new_state = {
      ...state
    }

    cl('CHANGED_USER_ID: ' + changed_user_id);
    let changed_user = state.users.byId[changed_user_id];
    
    new_state.users.byId[changed_user_id] = {...changed_user, color: '#000000'}

    cl('return new state here');
    return new_state;

  default:
    return state;
  }
};

export const blackFirstUser = (table_idx) => {
  return bindActionAttrs(blackFirstUser_table(), "table_idx", table_idx);
}

export const emptyTableOne = () => ({type: EMPTY_TABLE_ONE});

export default rootReducer;
