import React from "react";

import Search from "../components/Search";
import Favoris from "../components/Favoris";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../definition/Colors";
import Assets from "../definition/Assets";
const SearchNavigation = createStackNavigator();
const FavNavigation = createStackNavigator();
const TabNavigation = createBottomTabNavigator();
import { Image } from "react-native";

function searchStackScreens() {
  return (
    <SearchNavigation.Navigator initialRouteName="Search">
      <SearchNavigation.Screen
        name="Search"
        component={Search}
        options={{ title: "Recherche" }}
      />
    </SearchNavigation.Navigator>
  );
}

function favStackScreens() {
  return (
    <FavNavigation.Navigator initialRouteName="Favoris">
      <FavNavigation.Screen
        name="Favoris"
        component={Favoris}
        options={{ title: "Favoris" }}
      />
    </FavNavigation.Navigator>
  );
}

const RootStack = () => {
  return (
    <TabNavigation.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.mainGreen,
        headerShown: false,
      }}
    >
      <TabNavigation.Screen
        name="Recherche"
        component={searchStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return (
              <Image
                source={Assets.icons.search}
                style={{ tintColor: color }}
              />
            );
          },
        })}
      />
      <TabNavigation.Screen
        name="Favoris"
        component={favStackScreens}
        options={() => ({
          tabBarIcon: ({ color }) => {
            return (
              <Image
                source={Assets.icons.favFull}
                style={{ tintColor: color }}
              />
            );
          },
        })}
      />
    </TabNavigation.Navigator>
  );
};

export default RootStack;
