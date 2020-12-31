import { applyMiddleware, compose, createStore } from "redux";
import { createEpicMiddleware } from "redux-observable";
import rootReducer from "./reducers";
import combinedEpics from "./actions";
import { loadState } from "../helpers";
import multiDispatch from "./middleware/multi-dispatch";
import module1 from "./middleware/module1";
import error from "./middleware/error";

const epicMiddleware = createEpicMiddleware();
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const stateFromLocalStorage = loadState();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    stateFromLocalStorage,
    composeEnhancers(
      applyMiddleware(epicMiddleware, multiDispatch, ...module1, ...error)
    )
  );

  epicMiddleware.run(combinedEpics);

  return store;
}
