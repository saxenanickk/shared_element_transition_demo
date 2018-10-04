import { fork } from "redux-saga/effects";
import { saga as allSymbolsSaga } from "./Containers/AllSymbolsScreen/Saga";
import { saga as favoritesSaga } from "./Containers/FavoritesScreen/Saga";

export default function* saga() {
	// console.log("Saga Intialized");
	yield [fork(allSymbolsSaga), fork(favoritesSaga)];
}
