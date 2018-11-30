import React from "react";
import {
	View,
	FlatList,
	TouchableOpacity,
	LayoutAnimation,
	Dimensions,
	TextInput,
	UIManager,
	Platform
} from "react-native";

const { width, height } = Dimensions.get("window");

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		if (Platform.OS === "android") {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
		this.state = {
			active: false
		};
	}

	render() {
		return (
			<FlatList
				data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
				keyboardShouldPersistTaps={"always"}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item, index) => index.toString()}
				renderItem={data => (
					<View
						style={{
							elevation: 5,
							borderWidth: 0.5,
							borderColor: "#ffffff",
							backgroundColor: "#ffffff"
						}}
					>
						<TouchableOpacity
							onPress={() => {
								LayoutAnimation.easeInEaseOut();
								this.setState({ active: !this.state.active });
							}}
							style={{ padding: width / 25, backgroundColor: "#ffffff" }}
						/>
						{this.state.active && (
							<View>
								<TextInput placeholder={`Mobile Number`} />
								<TextInput placeholder={`Select Operator`} />
								<TextInput placeholder={`Amount`} />
							</View>
						)}
					</View>
				)}
			/>
		);
	}
}
