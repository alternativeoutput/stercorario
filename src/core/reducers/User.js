import { WAKEUP_USER } from "../../constants/action-types"

export const wakeupUser = () => { console.log('wakeupUser fired'); return { type: WAKEUP_USER }; }

export const INITIAL_STATE =
    {name: 'XXXXX', _id: 'XXX', key: 'XXX'}

const reducer = (state = INITIAL_STATE, action) => {
    return state
}

export function copy_user(user)
{
    return { name: user.name,
             _id: user._id,
             key: user.key
           };
}

export default reducer
