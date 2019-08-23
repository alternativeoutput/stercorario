import { createStore } from "redux";
import rootReducer from "../reducers/Main";
const store = createStore(rootReducer);
export default store;
