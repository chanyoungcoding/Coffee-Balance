import React, { useRef, useState } from 'react'
import { View, Text, ActivityIndicator, Alert } from 'react-native'
import styled from 'styled-components/native';
import {Container, UserInputText, WelcomeText} from "../components/PublicComponent";
import auth from "@react-native-firebase/auth";

import CoffeeCup from "../assets/coffee/removebgCoffee.png";
import { ChocolateColor, WhiteCoffeeColor } from '../colors';

const Join = ({navigation: {navigate}}) => {

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
      await auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password);
    } catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert('Email address is already in use!');
          break;
        case 'auth/invalid-email':
          Alert.alert('Invalid email address format!');
          break;
        case 'auth/weak-password':
          Alert.alert('Password is too weak! Must be at least 6 characters.');
          break;
        default:
          Alert.alert('Failed to create user. Please try again later.');
          console.error(error.code, error.message);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <CoffeeImage source={CoffeeCup}/>
      <WelcomeText>Join the Coffee Balance</WelcomeText>

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

      <JoinButton onPress={handleSubmit}>
        <JoinText>
          {loading ? <ActivityIndicator/> : "회원가입"}
        </JoinText>
      </JoinButton>

    </Container>
  )
};

const CoffeeImage = styled.Image`
  width: 150px;
  height: 150px;
`

const JoinButton = styled.TouchableOpacity`
  margin-top: 15px;
  padding: 11px;
  width: 200px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${WhiteCoffeeColor};
`

const JoinText = styled.Text`
  font-size: 18px;
  color: ${ChocolateColor};
`


export default Join