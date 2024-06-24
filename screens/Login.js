import React, { useRef, useState } from 'react'
import { Alert, Text } from 'react-native'
import styled from 'styled-components/native';
import auth from "@react-native-firebase/auth";

import CoffeeCart from "../assets/coffee/coffee-cart.png";
import { ChocolateColor } from '../colors';
import {Container, UserInputText, WelcomeText} from "../components/PublicComponent";

const Login = ({navigation: {navigate}}) => {

  const passwordInput = useRef();

  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })

  const ChangeUser = (name, value) => {
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  const SubmitEmailAndGoPassword = () => {
    passwordInput.current.focus();
  }

  const handleSubmit = async () => {
    if(userInfo.email === "" || userInfo.password === "") return Alert.alert("아이디 또는 패스워드를 입력하세요.");
    if (loading) return
    
    setLoading(true);

    try {
      const userCredential = await auth().signInWithEmailAndPassword(userInfo.email, userInfo.password);
      console.log('로그인 성공');
    } catch (error) {
      console.error('로그인 실패:', error.code, error.message);
      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('사용자를 찾을 수 없습니다.');
          break;
        case 'auth/wrong-password':
          Alert.alert('잘못된 비밀번호입니다.');
          break;
        default:
          Alert.alert('로그인에 실패했습니다.');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <CartImage source={CoffeeCart}/>
      <WelcomeText>Welcome to Coffee Balance</WelcomeText>

      <UserInputText
        placeholder='Email' 
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        keyboardType="email-address"
        value={userInfo.email} 
        onChangeText={text => ChangeUser('email', text)}
        onSubmitEditing={SubmitEmailAndGoPassword}
      />

      <UserInputText 
        placeholder='Password' 
        ref={passwordInput}
        value={userInfo.password} 
        returnKeyType="done"
        onChangeText={text => ChangeUser('password', text)} 
        onSubmitEditing={handleSubmit}
        secureTextEntry
      />

      <LoginButton onPress={handleSubmit}>
        <ButtonText>로그인</ButtonText>
      </LoginButton>

      <JoinButton onPress={() => navigate("Join")}>
        <Text>Don't have an account? </Text>
      </JoinButton>
    </Container>
  )
};

const CartImage = styled.Image`
  width: 250px;
  height: 250px;
`

const LoginButton = styled.TouchableOpacity`
  margin: 10px;
`

const ButtonText = styled.Text`
  font-size: 18px;
  color: ${ChocolateColor};
`

const JoinButton = styled.TouchableOpacity``

export default Login