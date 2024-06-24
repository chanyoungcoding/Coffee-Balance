import React from 'react'
import { Alert, Text } from 'react-native'
import auth from "@react-native-firebase/auth";
import styled from 'styled-components/native';
import { BasicColor, NomalColor } from '../colors';

import BackgroundUrl from "../assets/coffee/coffeeBackground.png";

const MyPage = () => {

  const Logout = async () => {
    try {
      await auth().signOut();
      Alert.alert("로그아웃 되었습니다.")
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <BackgroundContainer source={BackgroundUrl}>
      <Container>
        <IntroBox>
          <Text>박찬영님, 안녕하세요.</Text>
          <UserImg/>
        </IntroBox>
        <LogoutButton onPress={Logout}>
          <LogoutText>로그아웃</LogoutText>
        </LogoutButton>
      </Container>
    </BackgroundContainer>
  )
}

const BackgroundContainer = styled.ImageBackground`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-size: cover;
`

const IntroBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 40px 0px;
`

const UserImg = styled.Image`
  width: 70px;
  height: 70px;
  background-color: gray;
  border-radius: 100px;
`

const LogoutButton = styled.TouchableOpacity`
  align-items: center;
  width: 125px;
  margin: 30px auto;
  padding: 10px;
  background-color: ${BasicColor};
  border-radius: 5px;
`

const LogoutText = styled.Text`
  color: ${NomalColor};
  font-weight: bold;
`

export default MyPage