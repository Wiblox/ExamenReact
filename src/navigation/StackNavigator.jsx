import React from "react";
import Restaurant from "../components/Restaurant";
import Search from "../components/Search";
import { createStackNavigator } from "@react-navigation/stack";

const StackNavigator = createStackNavigator();

const RootStack = () => {
  return (
    <StackNavigator.Navigator initialRouteName="Search">
        <StackNavigator.Screen name="Rechercher" component={Search}/>
        <StackNavigator.Screen name="Restaurant" component={Restaurant}/>
    </StackNavigator.Navigator>
  );
}

export default RootStack;