import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homeScreen";
import MovieDetailScreen from "../screens/movieScreen";
import PersonScreen from "../screens/personScreen";
import SearchScreen from "../screens/searchScreen";


const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Movie" component={MovieDetailScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Person" component={PersonScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );

}