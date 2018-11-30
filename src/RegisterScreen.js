import { Dimensions } from "react-native";
import {
	createBottomTabNavigator,
	createStackNavigator
} from "react-navigation";
import AllSymbolScreen from "./Containers/AllSymbolsScreen";
import FavoritesScreen from "./Containers/FavoritesScreen";
import First from "./Containers/First";
import New from "./Containers/New";
import Test from "./Containers/Test";

const { width, height } = Dimensions.get("window");

// export default AllSymbolScreen;

export default createStackNavigator(
	{
		Test: Test
		// New: New,
		// First: First,
		// All: AllSymbolScreen,
		// Favorites: FavoritesScreen
	},
	{
		headerMode: "none"
	}
	// {
	// 	tabBarOptions: {
	// 		tabStyle: {
	// 			borderWidth: 0,
	// 			backgroundColor: "#2c2f3f"
	// 		},
	// 		labelStyle: {
	// 			fontSize: height / 45
	// 		},
	// 		activeTintColor: "#ffffff",
	// 		inactiveTintColor: "#6c7687"
	// 	}
	// }
);
