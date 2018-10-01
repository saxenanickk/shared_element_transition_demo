import React from "react";
import { View, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const RemoveFromFavoriteButton = props => (
	<TouchableOpacity style={{ elevation: 5 }} onPress={props.onPress}>
		<View
			style={{
				width: width / 15,
				height: width / 15,
				borderRadius: width / 30,
				backgroundColor: "#d55f5b",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<View
				style={{
					width: width / 30,
					height: 2,
					backgroundColor: "#ffffff"
				}}
			/>
		</View>
	</TouchableOpacity>
);

export default RemoveFromFavoriteButton;
