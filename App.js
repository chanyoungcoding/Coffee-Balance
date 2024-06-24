import React, { useCallback } from 'react';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useAssets } from 'expo-asset';
import {Ionicons} from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';

import Root from './navigation/Root';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [assets] = useAssets([require('./assets/coffee/coffee-cart.png')]);
  const [fonts] = Font.useFonts(Ionicons.font);

  const onLayoutRootView = useCallback(async() => {
    if(assets || fonts) await SplashScreen.hideAsync();
  }, [assets, fonts])

  if(!assets || !fonts) {
    null
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Root/>
    </NavigationContainer>
  );
}

