import React, { useEffect } from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";

import TabOrder from "./TabShopSelectOrder";
import TabInfo from "./TabShopInfo";
import TabTime from "./TabShopSettingTime";
import MenuScreen from "./menu-screen/menu-screen";
import useShopStore from "../../ShopStore";

const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {
  const { fetchShopData } = useShopStore();

  useEffect(() => {
    fetchShopData();
  }, [fetchShopData]);

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
        component={MenuScreen}
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

export default HomeTabs;
