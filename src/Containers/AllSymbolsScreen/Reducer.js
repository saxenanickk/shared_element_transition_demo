import { SAVE_SYMBOLS } from "./Saga";

const initialState = {
	allSymbols: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_SYMBOLS:
			return {
				...state,
				allSymbols: action.payload
			};
		default:
			return state;
	}
};
