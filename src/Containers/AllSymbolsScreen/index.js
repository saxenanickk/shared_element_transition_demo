import React from "react";
import {
	View,
	TouchableOpacity,
	Animated,
	Dimensions,
	FlatList,
	Text,
	SafeAreaView,
	ActivityIndicator,
	StatusBar,
	Platform
} from "react-native";
import { connect } from "react-redux";
import { getSymbols } from "./Saga";
import { addToFavorites } from "../FavoritesScreen/Saga";
import AddToFavoriteButton from "../../Components/AddToFavoriteButton";

//#5d77f9

const { width, height } = Dimensions.get("window");

class AllSymbolsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allEntities: []
		};
		this.limit = 10;
		this.oldLimit = 0;
	}

	fillEnitities = (data) => {
		let temp = this.state.allEntities
		temp = temp.concat(data.slice(this.oldLimit, this.limit))
		this.setState({
			allEntities: temp
		});
	};

	shouldComponentUpdate(props) {
		if (props.allSymbols.length > 0 && this.props.allSymbols.length === 0) {
			this.fillEnitities(props.allSymbols);
		}
		return true;
	}

	componentDidMount() {
		this.props.getSymbols();
	}

	onPressAddToFavorite = item => {
		let canBeAdded = true;
		this.props.favorites.map(data => {
			if (data.symbol === item.symbol) {
				canBeAdded = false;
			}
		});
		canBeAdded && this.props.addToFavorites(item);
	};

	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: "#232531" }}>
				<StatusBar backgroundColor={"#232531"} barStyle={"light-content"} />
				{this.props.allSymbols.length === 0 ? (
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#232531"
						}}
					>
						{Platform.OS === "android" ? (
							<ActivityIndicator color={"#ffffff"} size={height / 20} />
						) : (
								<ActivityIndicator />
							)}
					</View>
				) : (
						<FlatList
							removeClippedSubviews
							data={this.state.allEntities}
							onEndReached={() => {
								this.oldLimit = this.limit
								this.limit = this.limit + 10;
								this.fillEnitities(this.props.allSymbols);
							}}
							keyExtractor={(item, index) => index.toString()}
							renderItem={item => {
								return (
									<TouchableOpacity activeOpacity={0.8}>
										<Animated.View
											style={{
												width: width,
												padding: width / 20
											}}
										>
											<View
												style={{
													elevation: 5,
													flex: 1,
													height: null,
													width: null,
													backgroundColor: "#2c2f3f",
													borderRadius: 5,
													flexDirection: "row",
													alignItems: "center",
													justifyContent: "space-between",
													padding: width / 30
												}}
											>
												<View style={{ flex: 2 }}>
													<Text
														style={{
															fontSize: height / 45,
															color: "#fbfbfc"
														}}
													>
														{item.item.name}
													</Text>
													<Text
														style={{
															fontSize: height / 50,
															fontWeight: "bold",
															color: "#6c7687"
														}}
													>
														{`${item.item.symbol}`}
													</Text>
												</View>
												<View style={{ flex: 1.5, paddingLeft: width / 25 }}>
													<View style={{ flexDirection: "row" }}>
														<Text
															style={{
																fontSize: height / 55,
																fontWeight: "bold",
																color: "#6c7687"
															}}
														>
															{`Type: `}
														</Text>
														<Text
															style={{
																fontSize: height / 50,
																color: "#6c7687"
															}}
														>
															{`${item.item.type.toUpperCase()}`}
														</Text>
													</View>
													<View style={{ flexDirection: "row" }}>
														<Text
															style={{
																fontSize: height / 55,
																fontWeight: "bold",
																color: "#6c7687"
															}}
														>
															{`IEX ID:  `}
														</Text>
														<Text
															style={{
																fontSize: height / 50,
																color: "#6c7687"
															}}
														>
															{`${item.item.iexId}`}
														</Text>
													</View>
												</View>
												<AddToFavoriteButton
													onPress={() => this.onPressAddToFavorite(item.item)}
												/>
											</View>
										</Animated.View>
									</TouchableOpacity>
								);
							}}
						/>
					)}
			</SafeAreaView>
		);
	}
}

function mapStateToProps(state) {
	return {
		allSymbols: state.AllSymbolsScreen.allSymbols,
		favorites: state.FavoritesScreen.favorites
	};
}

const mapDispatchToProps = dispatch => ({
	getSymbols: () => dispatch(getSymbols()),
	addToFavorites: item => dispatch(addToFavorites(item))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AllSymbolsScreen);
