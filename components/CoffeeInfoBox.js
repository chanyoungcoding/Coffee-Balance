import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import styled from 'styled-components/native'
import { ChocolateColor, DarkCoffeeColor } from '../colors'

import CaffeineImg from "../assets/coffeeInfo/caffeine.png";
import FatImg from "../assets/coffeeInfo/fat.png";
import KcalImg from "../assets/coffeeInfo/kcal.png";
import ProteinImg from "../assets/coffeeInfo/protein.png";
import SodiumImg from "../assets/coffeeInfo/sodium.png";
import SugarImg from "../assets/coffeeInfo/sugar.png";

const CoffeeInfoBox = ({name, calory, suga, protein, sodium, sat_fat, caffeine, description}) => {
  return (
    <Container >
      <CoffeeName>{name}</CoffeeName>
      <CoffeeDescription>{description}</CoffeeDescription>

      <InformationBox>
        <InfoImg source={CaffeineImg}/>
        <Text>카페인 함유량 : {caffeine}</Text>
      </InformationBox>

      <InformationBox>
        <InfoImg source={KcalImg}/>
        <Text>칼로리 함유량 : {calory}</Text>
      </InformationBox>

      <InformationBox>
        <InfoImg source={SugarImg}/>
        <Text>설탕 함유량 : {suga}</Text>
      </InformationBox>

      <InformationBox>
        <InfoImg source={SodiumImg}/>
        <Text>소금 함유량 : {sodium}</Text>
      </InformationBox>

      <InformationBox>
        <InfoImg source={FatImg}/>
        <Text>지방 함유량 : {sat_fat}</Text>
      </InformationBox>
      
      <InformationBox>
        <InfoImg source={ProteinImg}/>
        <Text>프로틴 함유량 : {protein}</Text>
      </InformationBox>

    </Container>
  )
}

const Container = styled.ScrollView`
  height: 450px;
`

const CoffeeName = styled.Text`
  font-size: 16px;
  color: ${ChocolateColor};
  margin: 0 auto;
`

const CoffeeDescription = styled.Text`
  padding: 15px 70px;
  line-height: 20px;
  font-size: 16px;
  color: ${DarkCoffeeColor};
`

const InformationBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
`

const InfoImg = styled.Image`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`

export default CoffeeInfoBox