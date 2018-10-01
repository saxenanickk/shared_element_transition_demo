import React from "react";
import { View, Image, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const AddToFavoriteButton = props => (
	<TouchableOpacity activeOpacity={0.7} onPress={props.onPress}>
		<View
			style={{
				flex: 0.5,
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Image
				style={{
					width: width / 15,
					height: width / 15,
					borderRadius: width / 30
				}}
				source={require("../Assets/Img/AddToFavorite.png")}
			/>
		</View>
	</TouchableOpacity>
);

export default AddToFavoriteButton;
