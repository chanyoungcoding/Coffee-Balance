import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import Test from "../screens/Test";
import AddCoffeeCup from "../screens/AddCoffeeCup";

const NativeStack = createNativeStackNavigator();

const Stacks = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="Detail" component={Detail} />
    <NativeStack.Screen name="Test" component={Test} />
    <NativeStack.Screen name="AddCoffeeCup" component={AddCoffeeCup} />
  </NativeStack.Navigator>
);

export default Stacks;