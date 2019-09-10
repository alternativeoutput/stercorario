// src/js/reducers/index.js
import { BLACK_FIRST_USER } from '../constants/action-types';
import { bindActionAttrs } from '../../../core/store/bindIndexToActionCreators';
import { blackFirstUser as blackFirstUser_table } from './Table';
import React from 'react';

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

  console.log('initalStateUpdate');
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

// function copytbl(tbl, copy_el)
// {
//     return Object.keys(tbl).reduce(function(previous, current) {
//         previous[current] = copy_el(tbl[current]);
//         return previous;
//     }, {});
// }

// function copy_standup(standup)
// {
//     return { title: standup.title,
//              user: standup.user.slice()
//            }
// }

// function copy_app(app)
// {
//     return {user: copytbl(app.user, copy_user),
//             table: app.table.map((el) => (copy_table(el))),
//             standup: copy_standup(app.standup)};
// }

const rootReducer = (state = initialState, action) => {
  let new_state;
  let table, new_table;
  
  console.log('root reducer');
  console.log(action);

  switch (action.type) {
  case BLACK_FIRST_USER:
    if (action.table_idx !== null) {
      if (state.tables.byId[action.table_idx].users_id.length <= 0)
        return state;
    }
    else {
      if (state.standup.users_id.length <= 0)
        return state;
    }

    new_state = {
      users: {byId: {}, allIds: []}, 
      tables: {byId: state.tables.byId, allIds: state.tables.allIds},
      standup: {users_id: state.standup.users_id}
    }

    state.users.allIds.map(function (idx) {
      new_state.users.byId[idx] = this.byId[idx];
      new_state.users.allIds.push(idx)
    }, state.users);

    let changed_user_id;
    if (action.table_idx !== null) {
      changed_user_id = state.tables.byId[action.table_idx].users_id[0];
    }
    else {
      changed_user_id = state.standup.users_id[0];
    }
    console.log('CHANGED_USER_ID: ' + changed_user_id);
    let changed_user = state.users.byId[changed_user_id];
    
    new_state.users.byId[changed_user_id] = {
      id: changed_user.id,
      name: changed_user.name,
      color: '#000000',
      table: changed_user.table,
      pos: changed_user.pos
    }

    console.log('return new state here');
    return new_state;

  default:
    return state;
  }
};

export const blackFirstUser = (table_idx) => {
  return () => (bindActionAttrs(blackFirstUser_table(), "table_idx", table_idx));
}

export default rootReducer;
