import { takeLatest, call, put } from "redux-saga/effects";
import Api from "../../Api";

// Actions
export const GET_SYMBOLS = "GET_SYMBOLS";
export const SAVE_SYMBOLS = "SAVE_SYMBOLS";

// Action Creators
export const getSymbols = payload => ({ type: GET_SYMBOLS, payload });
export const saveSymbols = payload => ({ type: SAVE_SYMBOLS, payload });

// Saga (Generator Functions)
export function* saga(dispatch) {
	yield takeLatest(GET_SYMBOLS, handleGetSymbols);
}

// Handlers (Generator Functions)
function* handleGetSymbols(action) {
	try {
		let allSymbols = yield call(Api.getAllSymbols, action.payload);
		console.log("All Symbols Saga data: ", allSymbols);
		yield put(saveSymbols(allSymbols));
	} catch (error) {
		console.log("All Symbols Saga Error: ", error);
	}
}
