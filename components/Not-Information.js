import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'

import Logo from "../assets/coffee/appLogo.png";

const NotInformation = () => {
  return (
    <Container>
      <LogoImage source={Logo}/>
      <NotFoundText>정보를 찾을 수 없습니다.</NotFoundText>
      <NotFoundIntro>재대로된 커피 이름을 입력하세요.</NotFoundIntro>
      <NotFoundIntro>영어로 입력하시길 바랍니다.</NotFoundIntro>
    </Container>
  )
}

const Container = styled.View`
  background-color: white;
  height: 100%;
  align-items: center;
  justify-content: center;
`

const LogoImage = styled.Image`
  width: 225px;
  height: 225px;
`

const NotFoundText = styled.Text`
  font-size: 20px;
  margin-bottom: 15px;
`

const NotFoundIntro = styled.Text`
  font-size: 16px;
  color: gray;
`

export default NotInformation