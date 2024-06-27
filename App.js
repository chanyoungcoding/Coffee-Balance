import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import {Ionicons} from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import { RecoilRoot } from "recoil";

import Root from './navigation/Root';
import IsLogin from './navigation/IsLogin';
import { Asset } from 'expo-asset';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [ready, setReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync(Ionicons.font);
        await Asset.loadAsync(require('./assets/coffee/coffee-cart.png'));
      } catch (error) {
        console.log(error)
      } finally {
        setReady(true);
      }
    }

    prepare();
  }, [])

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if(user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    })
  }, [])

  const onLayoutRootView = useCallback(async() => {
    if(!ready) await SplashScreen.hideAsync();
  }, [])


  return (
    <RecoilRoot>
      <NavigationContainer onReady={onLayoutRootView}>
        {isLoggedIn ? <Root/> : <IsLogin/>}
      </NavigationContainer>
    </RecoilRoot>
  );
}

