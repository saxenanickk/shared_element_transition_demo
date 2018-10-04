import { SERVER_BASE_URL } from "../Constants";

class Api {
	getAllSymbols() {
		return new Promise((resolve, reject) => {
			fetch(`${SERVER_BASE_URL}/ref-data/symbols`, {
				method: "GET"
			})
				.then(response => {
					response.status === 200
						? response.json().then(res => resolve(res))
						: response.json().then(res => reject(res));
				})
				.catch(error => reject(error));
		});
	}

	getQuote(params) {
		let SYMBOL = "";
		let i = 0;
		while (i < params.symbols.length) {
			SYMBOL = `${SYMBOL}${params.symbols[i]}${
				params.symbols.length !== 1 ? "," : ""
			}`;
			i++;
		}
		return new Promise((resolve, reject) => {
			fetch(
				`${SERVER_BASE_URL}/stock/market/batch?symbols=${SYMBOL}&types=quote`,
				{
					method: "GET"
				}
			)
				.then(response => {
					response.status === 200
						? response.json().then(res => resolve(res))
						: response.json().then(res => reject(res));
				})
				.catch(error => reject(error));
		});
	}

	getNews(params) {
		let SYMBOL = params.symbol;
		return new Promise((resolve, reject) => {
			fetch(
				`${SERVER_BASE_URL}/stock/market/batch?symbols=${SYMBOL}&types=news&last=5`,
				{
					method: "GET"
				}
			)
				.then(response => {
					response.status === 200
						? response.json().then(res => resolve(res))
						: response.json().then(res => reject(res));
				})
				.catch(error => reject(error));
		});
	}
}

export default new Api();
