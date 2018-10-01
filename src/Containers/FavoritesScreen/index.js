import React from "react";
import {
	View,
	TouchableOpacity,
	Animated,
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	SafeAreaView,
	StatusBar,
	LayoutAnimation,
	UIManager,
	Platform,
	ScrollView,
	Linking
} from "react-native";
import { connect } from "react-redux";
import {
	removeFromFavorites,
	getQuote,
	removeFromQuote,
	saveNews,
	getNews
} from "./Saga";
import RemoveFromFavoriteButton from "../../Components/RemoveFromFavoriteButton";

const { width, height } = Dimensions.get("window");

class FavoritesScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allEntities: [],
			activeCard: null,
			activeSymbol: null
		};
		if (Platform.OS === "android") {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
		this.symbols = [];
		this.limit = 5;
	}

	componentWillMount() {
		this.allCards = {};
		this.oldPosition = {};
		this.position = new Animated.ValueXY();
		this.dimensions = new Animated.ValueXY();
		this.animation = new Animated.Value(0);
	}

	componentDidMount() {
		if (this.props.favorites.length !== 0) {
			let i = 0;
			while (i < this.props.favorites.length) {
				this.symbols.push(this.props.favorites[i].symbol);
				i++;
			}
			this.props.dispatch(
				getQuote({
					symbols: this.symbols
				})
			);
		}
	}

	shouldComponentUpdate(props, state) {
		console.log(props);
		if (props.favorites.length > this.props.favorites.length) {
			this.symbols = [];
			let i = 0;
			while (i < props.favorites.length) {
				this.symbols.push(props.favorites[i].symbol);
				i++;
			}
			this.props.dispatch(
				getQuote({
					symbols: this.symbols
				})
			);
		}
		if (props.news.length !== this.props.news.length) {
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		}
		return true;
	}

	openCard = (index, symbol) => {
		this.allCards[index].measure((x, y, width, height, pageX, pageY) => {
			this.oldPosition.x = pageX;
			this.oldPosition.y = pageY;
			this.oldPosition.width = width;
			this.oldPosition.height = height;

			this.position.setValue({
				x: pageX,
				y: pageY
			});

			this.dimensions.setValue({
				x: width,
				y: height
			});

			this.setState(
				{ activeCard: this.props.favorites[index], activeSymbol: symbol },
				() => {
					this.viewCard.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
						Animated.parallel([
							Animated.timing(this.position.x, {
								toValue: dPageX,
								duration: 300
							}),
							Animated.timing(this.position.y, {
								toValue: dPageY,
								duration: 300
							}),
							Animated.timing(this.dimensions.x, {
								toValue: dWidth,
								duration: 300
							}),
							Animated.timing(this.dimensions.y, {
								toValue: dHeight,
								duration: 300
							}),
							Animated.timing(this.animation, {
								toValue: 1,
								duration: 300
							})
						]).start();
					});
				}
			);
		});
		this.props.dispatch(getNews({ symbol: symbol }));
	};

	closeCard = () => {
		Animated.parallel([
			Animated.timing(this.position.x, {
				toValue: this.oldPosition.x,
				duration: 300
			}),
			Animated.timing(this.position.y, {
				toValue: this.oldPosition.y,
				duration: 300
			}),
			Animated.timing(this.dimensions.x, {
				toValue: this.oldPosition.width,
				duration: 300
			}),
			Animated.timing(this.dimensions.y, {
				toValue: this.oldPosition.height,
				duration: 300
			}),
			Animated.timing(this.animation, {
				toValue: 0,
				duration: 300
			})
		]).start(() => {
			this.setState({ activeCard: null, activeSymbol: null });
		});
		this.props.dispatch(saveNews([]));
	};

	onPressRemoveFromFavorites = item => {
		this.props.dispatch(removeFromFavorites(item));
		this.props.dispatch(removeFromQuote(item.symbol));
	};

	renderDetails = (activeCardStyle, animatedCrossOpacity) => (
		<View
			style={StyleSheet.absoluteFill}
			pointerEvents={this.state.activeCard ? "auto" : "none"}
		>
			<View
				style={{ flex: 1, zIndex: 1001 }}
				ref={view => (this.viewCard = view)}
			>
				<Animated.View
					style={[
						{
							width: null,
							top: 0,
							left: 0,
							height: null,
							backgroundColor: this.state.activeCard !== null ? "#2c2f3f" : null
						},
						activeCardStyle
					]}
				>
					<ScrollView contentContainerStyle={{ padding: width / 20 }}>
						{this.state.activeCard !== null && (
							<SafeAreaView>
								<View
									style={{
										marginTop: 50,
										zIndex: 1000
									}}
								>
									<Text
										numberOfLines={1}
										ellipsizeMode={"tail"}
										style={{
											fontSize: height / 40,
											color: "#fbfbfc"
										}}
									>
										{`${
											this.props.quote[this.state.activeSymbol].quote
												.companyName
										}`}
									</Text>
									<Text
										style={{
											fontSize: height / 40,
											fontWeight: "bold",
											color: "#6c7687"
										}}
									>
										{`(${this.state.activeSymbol})`}
									</Text>
								</View>
								<Text
									style={{
										marginTop: height / 50,
										fontSize: height / 60,
										color: "#6c7687"
									}}
								>
									{`${this.props.quote[this.state.activeSymbol].quote.sector}`}
								</Text>
								<View>
									<Text
										style={{
											fontSize: height / 50,
											color: "#6c7687"
										}}
									>
										{`${
											this.props.quote[this.state.activeSymbol].quote
												.primaryExchange
										}`}
									</Text>
									<View
										style={{ marginTop: height / 50, flexDirection: "row" }}
									>
										<Text
											style={{
												fontSize: height / 60,
												color: "#6c7687"
											}}
										>
											{`Latest Price: `}
										</Text>
										<Text
											style={{
												fontSize: height / 60,
												color:
													this.props.quote[this.state.activeSymbol].quote
														.close >
													this.props.quote[this.state.activeSymbol].quote.open
														? "#80c294"
														: "#d55f5b"
											}}
										>
											{`$${
												this.props.quote[this.state.activeSymbol].quote
													.latestPrice
											}`}
										</Text>
									</View>
									<Text
										style={{
											fontSize: height / 60,
											color: "#6c7687"
										}}
									>
										{`Close: $${
											this.props.quote[this.state.activeSymbol].quote.close
										}`}
									</Text>
									<Text
										style={{
											fontSize: height / 60,
											color: "#6c7687"
										}}
									>
										{`Open: $${
											this.props.quote[this.state.activeSymbol].quote.open
										}`}
									</Text>
									<Text
										style={{
											marginTop: height / 50,
											fontSize: height / 60,
											color: "#6c7687"
										}}
									>
										{`Total Volume: ${
											this.props.quote[this.state.activeSymbol].quote
												.avgTotalVolume
										}`}
									</Text>
									<Text
										style={{
											fontSize: height / 60,
											color: "#6c7687"
										}}
									>
										{`Latest Volume: ${
											this.props.quote[this.state.activeSymbol].quote
												.latestVolume
										}`}
									</Text>
								</View>
							</SafeAreaView>
						)}
						{this.props.news.length > 0 && (
							<Text
								style={{
									marginTop: height / 50,
									color: "#ffffff",
									fontSize: height / 40
								}}
							>{`News`}</Text>
						)}
						{this.props.news.length > 0 &&
							this.props.news.map(item => (
								<View>
									<Text
										numberOfLines={1}
										ellipsizeMode={"tail"}
										style={{
											marginTop: height / 50,
											color: "#ffffff",
											fontSize: height / 50
										}}
									>
										{`${item.headline}`}
									</Text>
									<Text
										style={{
											textAlign: "justify",
											marginVertical: 5,
											color: "#afafaf",
											fontSize: height / 60
										}}
									>
										{`${item.summary}`}
									</Text>
									<TouchableOpacity
										onPress={() => {
											Linking.canOpenURL(item.url).then(supported => {
												if (supported) {
													Linking.openURL(item.url);
												} else {
													console.log(
														"Don't know how to open URI: " + item.url
													);
												}
											});
										}}
									>
										<Text
											style={{
												color: "#ffffff",
												fontSize: height / 70
											}}
										>
											{`Read Complete Article`}
										</Text>
									</TouchableOpacity>
								</View>
							))}
					</ScrollView>
				</Animated.View>
				<Animated.View
					style={[
						{ position: "absolute", top: 50, right: 30 },
						animatedCrossOpacity
					]}
				>
					<TouchableOpacity onPress={() => this.closeCard()}>
						<Text
							style={{ fontSize: 24, fontWeight: "bold", color: "#ffffff" }}
						>
							{`X`}
						</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
		</View>
	);

	render() {
		const activeCardStyle = {
			width: this.dimensions.x,
			height: this.dimensions.y,
			left: this.position.x,
			top: this.position.y
		};

		const animatedContentY = this.animation.interpolate({
			inputRange: [0, 1],
			outputRange: [-150, 0]
		});

		const animatedContentOpacity = this.animation.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [0, 1, 1]
		});

		const animatedContentStyle = {
			opacity: animatedContentOpacity,
			transform: [
				{
					translateY: animatedContentY
				}
			]
		};

		const animatedCrossOpacity = {
			opacity: this.animation
		};

		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: "#232531" }}>
				<StatusBar backgroundColor={"#232531"} barStyle={"light-content"} />
				<FlatList
					extraData={this.props.quote}
					data={this.props.favorites}
					renderItem={item => {
						return (
							<TouchableOpacity
								onPress={() => this.openCard(item.index, item.item.symbol)}
								activeOpacity={0.8}
								key={item.index}
							>
								<Animated.View
									style={{
										width: width,
										padding: width / 20
									}}
								>
									<View
										ref={card => (this.allCards[item.index] = card)}
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
											paddingHorizontal: width / 30,
											paddingVertical: height / 20
										}}
									>
										<View style={{ flex: 2 }}>
											<View style={{ flexDirection: "row" }}>
												<Text
													style={{
														fontSize: height / 50,
														color: "#fbfbfc"
													}}
												>
													{`${item.item.name}`}
												</Text>
												<Text
													style={{
														fontSize: height / 50,
														fontWeight: "bold",
														color: "#6c7687"
													}}
												>
													{` (${item.item.symbol})`}
												</Text>
											</View>
											<View style={{ flexDirection: "row" }}>
												<Text
													style={{
														fontSize: height / 60,
														color: "#6c7687"
													}}
												>
													{`IEX ID:  `}
												</Text>
												<Text
													style={{
														fontSize: height / 60,
														color: "#6c7687"
													}}
												>
													{`${item.item.iexId}`}
												</Text>
											</View>
											{this.props.quote !== null &&
												this.props.favorites.length ===
													Object.keys(this.props.quote).length && (
													<View>
														<View style={{ flexDirection: "row" }}>
															<Text
																style={{
																	fontSize: height / 60,
																	color: "#6c7687"
																}}
															>
																{`Latest Price: `}
															</Text>
															<Text
																style={{
																	fontSize: height / 60,
																	color:
																		this.props.quote[item.item.symbol].quote
																			.close >
																		this.props.quote[item.item.symbol].quote
																			.open
																			? "#80c294"
																			: "#d55f5b"
																}}
															>
																{`$${
																	this.props.quote[item.item.symbol].quote
																		.latestPrice
																}`}
															</Text>
														</View>
														<Text
															style={{
																fontSize: height / 60,
																color: "#6c7687"
															}}
														>
															{`Close: $${
																this.props.quote[item.item.symbol].quote.close
															}`}
														</Text>
														<Text
															style={{
																fontSize: height / 60,
																color: "#6c7687"
															}}
														>
															{`Open: $${
																this.props.quote[item.item.symbol].quote.open
															}`}
														</Text>
													</View>
												)}
										</View>
										<RemoveFromFavoriteButton
											onPress={() => this.onPressRemoveFromFavorites(item.item)}
										/>
									</View>
								</Animated.View>
							</TouchableOpacity>
						);
					}}
				/>
				{this.renderDetails(activeCardStyle, animatedCrossOpacity)}
			</SafeAreaView>
		);
	}
}

function mapStateToProps(state) {
	return {
		favorites: state.FavoritesScreen.favorites,
		quote: state.FavoritesScreen.quote,
		news: state.FavoritesScreen.news
	};
}

export default connect(
	mapStateToProps,
	null,
	null,
	{ withRef: true }
)(FavoritesScreen);
