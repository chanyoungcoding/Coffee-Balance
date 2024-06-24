import React from 'react'
import { Image } from 'react-native'

import Logo from "../assets/coffee/removebgCoffee.png";
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const LogoImg = () => {

  const navigation = useNavigation();

  const GotoHome = () => {
    navigation.navigate("Home")
  }

  return (
    <Container onPress={GotoHome}>
      <Image source={Logo} style={{ width: 80, height: 80}} resizeMode='contain'/>
    </Container>
  )
}

const Container = styled.TouchableOpacity`

`

export default LogoImg