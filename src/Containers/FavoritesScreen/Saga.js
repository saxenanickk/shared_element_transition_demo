import { takeLatest, takeEvery, call, put } from "redux-saga/effects";
import Api from "../../Api";

// Actions
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
export const GET_QUOTE = "GET_QUOTE";
export const SAVE_QUOTE = "SAVE_QUOTE";
export const REMOVE_FROM_QUOTE = "REMOVE_FROM_QUOTE";
export const GET_NEWS = "GET_NEWS";
export const SAVE_NEWS = "SAVE_NEWS";

// Action Creators
export const addToFavorites = payload => ({ type: ADD_TO_FAVORITES, payload });
export const removeFromFavorites = payload => ({
	type: REMOVE_FROM_FAVORITES,
	payload
});
export const getQuote = payload => ({ type: GET_QUOTE, payload });
export const saveQuote = payload => ({ type: SAVE_QUOTE, payload });
export const removeFromQuote = payload => ({
	type: REMOVE_FROM_QUOTE,
	payload
});
export const getNews = payload => ({ type: GET_NEWS, payload });
export const saveNews = payload => ({ type: SAVE_NEWS, payload });

// Saga (Generator Functions)
export function* saga(dispatch) {
	yield takeLatest(GET_QUOTE, handleGetQuote);
	yield takeLatest(GET_NEWS, handleGetNews);
}

// Handlers (Generator Functions)
function* handleGetQuote(action) {
	try {
		let quote = yield call(Api.getQuote, action.payload);
		// console.log("Get Quote Saga data: ", quote);
		yield put(saveQuote(quote));
	} catch (error) {
		console.log("Get Quote Saga Error: ", error);
	}
}

function* handleGetNews(action) {
	try {
		let news = yield call(Api.getNews, action.payload);
		// console.log("Get News Saga data: ", news);
		yield put(saveNews(news[action.payload.symbol].news));
	} catch (error) {
		console.log("Get News Saga Error: ", error);
	}
}
