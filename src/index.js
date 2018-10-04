import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import reducer from "./Reducer";
import saga from "./Saga";
import RegisterScreen from "./RegisterScreen";

const sagaMiddleware = createSagaMiddleware();
var middlewares = [sagaMiddleware];
// console.log("__DEV__", __DEV__);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// if (__DEV__) middlewares = [...middlewares, logger];

const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(saga);

console.disableYellowBox = true;

const App = () => (
	<Provider store={store}>
		<RegisterScreen />
	</Provider>
);

export default App;
