import * as React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ContractScreen from "../screens/ContractScreen";
import DashboardScreen from "../screens/DashboardScreen";
import { Text, TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HeaderRight = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate("New")}>
            <Text style={{ fontSize: 13, marginHorizontal: 10 }}>
                Yeni Kayıt Oluştur
            </Text>
        </TouchableOpacity>
    );
};

const HomeStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Contract" component={ContractScreen} />
        </Stack.Navigator>
    );
};

const AppNavigationContainer = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Dashboard"
                screenOptions={{ headerTitleAlign: "center" }}>
                <Drawer.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{
                        headerRight: () => <HeaderRight />,
                    }}
                />
                <Drawer.Screen name="New" component={HomeStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
export default AppNavigationContainer;
