import React from 'react'
import auth from "@react-native-firebase/auth";
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import LineChartBox from '../components/LineChartBox';
import ProgressChartBox from '../components/ProgressChartBox';
import BackgroundUrl from "../assets/coffee/coffeeBackground.png";
import { ChocolateColor, NomalColor } from '../colors';

const Home = ({navigation: {navigate}}) => {
  
  const user = auth().currentUser;
  const useremail = user.email
  const useruid = user.uid

  console.log(`userEmail : ${useremail}, useruid: ${useruid}`)
  return (
    <BackgroundContainer source={BackgroundUrl}>
      <Container style={{flex: 1 }}>

        <PieContainer>
          <PieText>오늘 커피 섭취량</PieText>
          <ProgressChartBox/>
        </PieContainer>

        <LineContainer>
          <LineText>총 커피 섭취 개수</LineText>
          <LineChartBox/>
        </LineContainer>

      </Container>
      <AddCoffeeButton onPress={() => navigate("Stack", {screen: "AddCoffeeCup"})}>
        <MaterialCommunityIcons name="coffee" size={20} color="black" />
      </AddCoffeeButton>

    </BackgroundContainer>
  )
}

const BackgroundContainer = styled.ImageBackground`
  flex: 1;
`;

const Container = styled.ScrollView``

const PieContainer = styled.View`
  flex: 1;
  align-items: center;
`

const PieText = styled.Text`
  margin: 15px 0px;
`

const AddCoffeeButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  right: 20px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px;
`

const LineContainer = styled(PieContainer)``
const LineText = styled(PieText)``

export default Home