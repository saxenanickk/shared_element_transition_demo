import React from "react";
import {
	View,
	Text,
	FlatList,
	Dimensions,
	TouchableOpacity,
	LayoutAnimation,
	UIManager,
	Platform
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class New extends React.Component {
	constructor() {
		super();
		this.state = {
			active: null,
			operator: null,
			region: null,
			fillDetails: null
		};
		if (Platform.OS === "android") {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}

	scrollToIndex = index => {
		this.flatListRef.scrollToIndex({
			animated: true,
			index: index
		});
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<View
					style={{
						justifyContent: "center",
						height: 70,
						width: width / 1.1,
						alignSelf: "center"
					}}
				>
					<Text style={{ fontWeight: "bold" }}>Gocharge</Text>
				</View>
				<FlatList
					ref={ref => {
						this.flatListRef = ref;
					}}
					nestedScrollEnabled={true}
					keyboardShouldPersistTaps={"always"}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item, index) => index.toString()}
					contentContainerStyle={{
						width: width / 1.1,
						alignSelf: "center",
						paddingBottom: 30
					}}
					data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
					ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
					renderItem={data => (
						<View
							style={{ elevation: 2, borderWidth: 0.5, borderColor: "#ffffff" }}
						>
							<TouchableOpacity
								activeOpacity={1}
								onPress={() => {
									LayoutAnimation.configureNext(
										LayoutAnimation.Presets.easeInEaseOut
									);
									this.scrollToIndex(data.index);
									this.setState({ active: data.item, fillDetails: data.item });
								}}
								style={{ padding: 25 }}
							>
								<View>
									<Text>{`PREPAID`}</Text>
								</View>
							</TouchableOpacity>
							{this.state.fillDetails === data.item && (
								<View
									style={{
										zIndex: 1,
										height: height / 5,
										justifyContent: "center",
										alignItems: "center"
									}}
								>
									<TouchableOpacity
										activeOpacity={1}
										onPress={() => {
											LayoutAnimation.configureNext(
												LayoutAnimation.Presets.easeInEaseOut
											);
											this.scrollToIndex(data.index);
											this.setState({ operator: data.item, fillDetails: null });
										}}
										style={{ padding: 10 }}
									>
										<View>
											<Text>{`Operator`}</Text>
										</View>
									</TouchableOpacity>
								</View>
							)}
							{this.state.operator === data.item && (
								<View style={{ zIndex: 2, height: height / 2 }}>
									<Text>Operator</Text>
									<TouchableOpacity
										activeOpacity={1}
										onPress={() => {
											LayoutAnimation.configureNext(
												LayoutAnimation.Presets.easeInEaseOut
											);
											this.scrollToIndex(data.index);
											this.setState({ region: data.item, operator: null });
										}}
										style={{ padding: 10 }}
									>
										<View>
											<Text>{`Region`}</Text>
										</View>
									</TouchableOpacity>
								</View>
							)}
							{this.state.region === data.item && (
								<View style={{ zIndex: 3, height: height / 2 }}>
									<Text>Region</Text>
									<TouchableOpacity
										activeOpacity={1}
										onPress={() => {
											LayoutAnimation.configureNext(
												LayoutAnimation.Presets.easeInEaseOut
											);
											this.scrollToIndex(data.index);
											this.setState({ region: null, fillDetails: data.item });
										}}
										style={{ padding: 10 }}
									>
										<View>
											<Text>{`Goback`}</Text>
										</View>
									</TouchableOpacity>
								</View>
							)}
						</View>
					)}
				/>
			</View>
		);
	}
}
