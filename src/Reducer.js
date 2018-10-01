import { combineReducers } from "redux";
import { reducer as allSymbolsReducer } from "./Containers/AllSymbolsScreen/Reducer";
import { reducer as favoritesReducer } from "./Containers/FavoritesScreen/Reducer";

const reducer = combineReducers({
	AllSymbolsScreen: allSymbolsReducer,
	FavoritesScreen: favoritesReducer
});

export default reducer;
