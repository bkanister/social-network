import {createStore} from "redux";
import reducer from "./reducers/reducers";

let store = createStore(reducer)

window.store = store
export default store