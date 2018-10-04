import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import AllSymbolScreen from "./Containers/AllSymbolsScreen";
import FavoritesScreen from "./Containers/FavoritesScreen";

const { width, height } = Dimensions.get("window");

// export default AllSymbolScreen;

export default createBottomTabNavigator(
	{
		All: AllSymbolScreen,
		Favorites: FavoritesScreen
	},
	{
		tabBarOptions: {
			tabStyle: {
				borderWidth: 0,
				backgroundColor: "#2c2f3f"
			},
			labelStyle: {
				fontSize: height / 45
			},
			activeTintColor: "#ffffff",
			inactiveTintColor: "#6c7687"
		}
	}
);
