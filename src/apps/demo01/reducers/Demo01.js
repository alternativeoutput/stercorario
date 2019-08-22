// src/js/reducers/index.js
import { ADD_USER, WAKEUP_USER } from "../../../core/constants/action-types";
import { bindActionAttrs } from '../../../core/store/bindIndexToActionCreators'
import { addUser as addUser_table} from "../../../core/reducers/Table"
import table_comp_reducer from "../../../core/reducers/Table"

import { copy_table } from "../../../core/reducers/Table"
import { copy_user } from "../../../core/reducers/User"

const initialState = {
    user: {'azz': {name: 'Alexander', _id: 'azz', key: 'azz'},
           'izz': {name: 'Markus',    _id: 'izz', key: 'izz'},
           'uzz': {name: 'Rudolph',   _id: 'uzz', key: 'uzz'}},
    table: {name: 'TabOne', user: ['azz', 'izz', 'uzz'], key: "tazz"},
    standup: {title: "StandUp", user: []}
};

function copytbl(tbl, copy_el)
{
    return Object.keys(tbl).reduce(function(previous, current) {
        previous[current] = copy_el(tbl[current]);
        return previous;
    }, {});
}

function copy_standup(standup)
{
    return { title: standup.title,
             user: standup.user.slice()
           }
}

function copy_app(app)
{
    return {user: copytbl(app.user, copy_user),
            table: copy_table(app.table),
            standup: copy_standup(app.standup)};
}

const rootReducer = (state = initialState, action) => {
    let new_state;

    console.log('root reducer');
    console.log(action);
    switch (action.type) {
    case ADD_USER:
        new_state = copy_app(state);
        table_comp_reducer(state, new_state, state.table, new_state.table, action);

        return new_state;
    case WAKEUP_USER:
        new_state = copy_app(state);
        
        // let wakedup_user = table.user[action.index];
        state.new_table = table_comp_reducer(state, new_state, state.table, new_state.table, action);

        console.log("TODO MOVE TO WAKED_UP");
        return new_state;
    default:
        return state;
    }
};

export default rootReducer;
export const addUser = (index) => {
    return (user) => (bindActionAttrs(addUser_table(user), "table_idx", index));
}
