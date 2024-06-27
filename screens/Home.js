import React from 'react'
import auth from "@react-native-firebase/auth";
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import LineChartBox from '../components/LineChartBox';
import ProgressChartBox from '../components/ProgressChartBox';

import CoffeeCup from "../assets/coffee/Americano.png";
import { Image, StyleSheet } from 'react-native';

const Home = ({navigation: {navigate}}) => {
  
  const user = auth().currentUser;
  const useremail = user.email
  const useruid = user.uid

  console.log(`userEmail : ${useremail}, useruid: ${useruid}`)
  return (
    <BackgroundContainer style={{backgroundColor: "white"}}>
      <Container style={{flex: 1 }}>

        <PieContainer>
          <PieTextBox>
            <Image source={CoffeeCup} style={{width: 40, height: 40}}/>
            <PieText>오늘 커피 섭취량</PieText>
          </PieTextBox>
          <ProgressChartBox/>
        </PieContainer>

        <LineContainer>
          <LineTextBox style={styles.CoffeeBoxShadow}>
            <LineText>Total coffee Cup</LineText>
          </LineTextBox>
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
  margin-top: 10px;
`

const PieTextBox = styled.View`
  flex-direction: row;
  align-items: center;
`

const PieText = styled.Text`
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
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

const LineTextBox = styled.View`
  margin-top: 20px;
  border-radius: 10px;
  background-color: white;
`

const LineText = styled(PieText)`
  margin-top: 0;
  padding: 10px;
`

const styles = StyleSheet.create({
  CoffeeBoxShadow: {
    marginHorizontal: 20,
    borderColor: "#F7E9D6",
    borderRadius: 10, 
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: .5, height: .7 },
    shadowOpacity: .3, 
    shadowRadius: .7, 
  },
});


export default Home