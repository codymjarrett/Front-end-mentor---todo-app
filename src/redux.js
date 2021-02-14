import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducers/index";

const enhancer = composeWithDevTools(
  applyMiddleware(...[reduxImmutableStateInvariant(), logger])
);
let store = createStore(reducer, undefined, enhancer);

export { store };
