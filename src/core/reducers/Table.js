import { ADD_USER, WAKEUP_USER } from "../../core/constants/action-types";
import { bindActionAttrs } from '../../store/bindIndexToActionCreators'
import { wakeupUser as wakeupUser_user } from './User'
import { copy_user } from "./User"

export const addUser = (user) => ({
    type: ADD_USER,
    user: user
})

export const INITIAL_STATE =
    {name: 'XXXXX', _id: 'XXX', key: 'XXX'}

export function copy_table(table)
{
    return { name: table.name,
             user: table.user.slice()
           };
}

// state and new_state are generic app objects, comp and new_comp are
// current and next component states.
const comp_reducer = (state, new_state, comp, new_comp, action) => {
    switch (action.type) {
    case ADD_USER:
        new_state.user[action.user._id] = copy_user(action.user);
        new_comp.user.push(action.user._id);
        return new_comp;
    case WAKEUP_USER:
        // let wakedup_user = table.user[action.index];
        new_comp.user = [
                ...comp.user.slice(0, action.index),
                ...comp.user.slice(action.index + 1)];
        console.log("TODO MOVE TO WAKED_UP");
        return new_comp;
    default:
        return new_comp;
    }
}

export const wakeupUser = (index) => {
    return () => (bindActionAttrs(wakeupUser_user(), "index", index));
}

export default comp_reducer
