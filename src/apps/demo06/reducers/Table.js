import { BLACK_FIRST_USER } from '../constants/action-types';

// export const blackFirstUser = () => ({ type: BLACK_FIRST_USER })
export const blackFirstUser = function () {
  console.log('blackFirstUser CB');
  return { type: BLACK_FIRST_USER };
}
