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

const { width, height } = Dimensions.get("window");

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default class First extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allEntities: [],
			activeCard: null,
			activeSymbol: null,
			clicked: false
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

			this.setState({ activeCard: index, activeSymbol: symbol }, () => {
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
			});
		});
	};

	closeCard = () => {
		Animated.parallel([
			Animated.timing(this.animation, {
				toValue: 0,
				duration: 200
			}),
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
			})
		]).start(() => {
			this.setState({ activeCard: null, activeSymbol: null, clicked: false });
		});
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
							height: null,
							backgroundColor:
								this.state.activeCard !== null ? "#ff0000" : null,
							justifyContent: "center",
							alignItems: "center"
						},
						activeCardStyle
					]}
				>
					{/* <AnimatedTouchable
						style={
							this.state.activeCard
								? [{ backgroundColor: "transparent" }, activeCardStyle]
								: { backgroundColor: null, width: null, height: null }
						}
						onPress={() => this.closeCard()}
					/> */}
					<Animated.View
						style={[
							{
								alignSelf: "center",
								// position: "absolute",
								width: width / 1.1,
								height: this.state.clicked ? height / 1.3 : height / 2,
								backgroundColor: "#ffffff",
								elevation: 10,
								justifyContent: "center",
								alignItems: "center"
							},
							animatedCrossOpacity
						]}
					>
						<TouchableOpacity
							onPress={() => {
								LayoutAnimation.configureNext(
									LayoutAnimation.Presets.easeInEaseOut
								);
								this.setState({ clicked: !this.state.clicked });
							}}
						>
							<Text>Click</Text>
						</TouchableOpacity>
					</Animated.View>
				</Animated.View>
				<Animated.View
					style={[
						{ position: "absolute", top: 50, right: 30 },
						animatedCrossOpacity
					]}
				>
					<TouchableOpacity onPress={() => this.closeCard()}>
						<Text
							style={{ fontSize: 24, fontWeight: "bold", color: "#000000" }}
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
			<SafeAreaView style={{ flex: 1, backgroundColor: "#ff0000" }}>
				<StatusBar backgroundColor={"#ffffff"} barStyle={"light-content"} />
				<FlatList
					// style={this.state.activeCard ? { width: 0, height: 0 } : {}}
					removeClippedSubviews
					keyExtractor={(item, index) => index.toString()}
					data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
					renderItem={item => {
						console.log(item);
						return item.index === 0 ? null : (
							<TouchableOpacity
								onPress={() => this.openCard(item.index, item.item)}
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
									/>
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
