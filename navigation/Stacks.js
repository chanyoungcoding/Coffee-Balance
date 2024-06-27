import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Detail from "../screens/Detail";
import Test from "../screens/Test";
import AddCoffeeCup from "../screens/AddCoffeeCup";

const NativeStack = createNativeStackNavigator();

const LogoImg = () => (
  <Image
    source={require('../assets/coffee/removebgCoffee.png')}
    style={{ width: 60, height: 60 }}
  />
);

const Stacks = ({ navigation: { goBack } }) => (
  <NativeStack.Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerTitle: () => LogoImg(),
      headerStyle: {
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => goBack()} style={{ paddingLeft: 15 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ),
    }}
  >
    <NativeStack.Screen name="Detail" component={Detail} />
    <NativeStack.Screen name="Test" component={Test} />
    <NativeStack.Screen name="AddCoffeeCup" component={AddCoffeeCup} />
  </NativeStack.Navigator>
);

export default Stacks;
