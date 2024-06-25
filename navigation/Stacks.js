import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import Test from "../screens/Test";

const NativeStack = createNativeStackNavigator();

const Stacks = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="Detail" component={Detail} />
    <NativeStack.Screen name="Test" component={Test} />
  </NativeStack.Navigator>
);

export default Stacks;