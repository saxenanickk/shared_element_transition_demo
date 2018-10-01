import {
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
	REMOVE_FROM_QUOTE,
	SAVE_QUOTE,
	SAVE_NEWS
} from "./Saga";

const initialState = {
	favorites: [],
	quote: null,
	news: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_FAVORITES:
			return {
				...state,
				favorites: [...state.favorites, action.payload]
			};
		case REMOVE_FROM_FAVORITES:
			let remove_from_favorites = state.favorites.filter(item => {
				return item.symbol !== action.payload.symbol && item;
			});
			return {
				...state,
				favorites: remove_from_favorites
			};
		case SAVE_QUOTE:
			return {
				...state,
				quote: action.payload
			};
		case REMOVE_FROM_QUOTE:
			let remove_from_quote = {};
			let i = 0;
			while (i < Object.keys(state.quote).length) {
				if (
					state.quote[Object.keys(state.quote)[i]].quote.symbol !==
					action.payload
				) {
					remove_from_quote = {
						...remove_from_quote,
						[state.quote[Object.keys(state.quote)[i]].quote.symbol]:
							state.quote[Object.keys(state.quote)[i]]
					};
				}
				i++;
			}
			return {
				...state,
				quote: remove_from_quote
			};
		case SAVE_NEWS:
			return {
				...state,
				news: action.payload
			};
		default:
			return state;
	}
};
