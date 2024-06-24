import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useAssets } from 'expo-asset';
import {Ionicons} from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";

import Root from './navigation/Root';
import IsLogin from './navigation/IsLogin';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [assets] = useAssets([require('./assets/coffee/coffee-cart.png')]);
  const [fonts] = Font.useFonts(Ionicons.font);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if(user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    })
  }, [])

  const onLayoutRootView = useCallback(async() => {
    if(assets || fonts) await SplashScreen.hideAsync();
  }, [assets, fonts])

  if(!assets || !fonts) {
    null
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      {isLoggedIn ? <Root/> : <IsLogin/>}
    </NavigationContainer>
  );
}

