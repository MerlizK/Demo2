import * as React from "react";
import { Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

import TabOrder from "./screens/home-screen/TabShopSelectOrder";
import TabInfo from "./screens/home-screen/TabShopInfo";
import TabTime from "./screens/home-screen/TabShopSettingTime";
import TabMenu from "./screens/home-screen/TabShopMenu";
import CreateMenu from "./screens/home-screen/ShopCreateMenu";
import EditMenu from "./screens/home-screen/ShopEditMenu";
import AddOption from "./screens/home-screen/ShopCreateOption";
import EditOption from "./screens/home-screen/ShopEditOption";
import EditInfo from "./screens/home-screen/ShopEditInfo";
import History from "./screens/home-screen/ShopOrderHistory";
import LoginScreen from "./screens/login-screen";

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();

function EmptyScreen() {
  return <View />;
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="TabOrder"
      activeColor="#009951"
      inactiveColor="#545454"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: "white", height: 70 }}
      theme={{ colors: { secondaryContainer: "transparent" } }}
    >
      <Tab.Screen
        name="TabOrder"
        component={TabOrder}
        options={{
          tabBarLabel: "Order",
          tabBarIcon: ({ color }) => (
            <AntDesign name="profile" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TabMenu"
        component={TabMenu}
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="food" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TabTime"
        component={TabTime}
        options={{
          tabBarLabel: "Time",
          tabBarIcon: ({ color }) => (
            <Feather name="clock" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TabShop"
        component={TabInfo}
        options={{
          tabBarLabel: "Shop",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-circle-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Index() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="CreateMenu" component={CreateMenu} />
        <Stack.Screen name="EditMenu" component={EditMenu} />
        <Stack.Screen name="AddOption" component={AddOption} />
        <Stack.Screen name="EditOption" component={EditOption} />
        <Stack.Screen name="EditInfo" component={EditInfo} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Index;
