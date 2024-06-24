import React from 'react'
import { Alert, Text } from 'react-native'
import auth from "@react-native-firebase/auth";
import styled from 'styled-components/native';

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
    <Container>
      <LogoutButton onPress={Logout}>
        <LogoutText>로그아웃</LogoutText>
      </LogoutButton>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const LogoutButton = styled.TouchableOpacity`

`

const LogoutText = styled.Text`

`

export default MyPage