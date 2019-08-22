import { createStore } from "redux";
import rootReducer from "../apps/yojne/reducers/Main";
const store = createStore(rootReducer);
export default store;
