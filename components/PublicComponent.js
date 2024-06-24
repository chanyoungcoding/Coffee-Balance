import styled from 'styled-components/native';
import { LightChocolateColor } from '../colors';

const UserInputText = styled.TextInput`
  width: 300px;
  margin: 10px;
  padding: 12px;
  border-radius: 5px;
  font-size: 16px;
  color: black;
  background-color: rgba(0,0,0,0.2);
`

const WelcomeText = styled.Text`
  margin: 25px 0px;
  font-size: 20px;
  color: ${LightChocolateColor};
`

const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 50px;
`

export {
  UserInputText,
  WelcomeText,
  Container
}