import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
export default function configureStore() {
  return createStore(
    compose(
      applyMiddleware(thunk)
    )
  );
}