import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'
import { CoffeeInfo } from '../Api/CoffeeInfo'
import { CoffeeInformation } from '../Api/CoffeeName'
import CoffeeInfoBox from '../components/CoffeeInfoBox'

import BackImg from "../assets/coffee/coffeeBackground.png";
import NotInformation from '../components/Not-Information'

const Detail = ({ route }) => {

  const COFFEE_NAME = route.params.coffeeName
  const coffeeInformation = CoffeeInfo.filter(item => item.name.toLowerCase() === COFFEE_NAME.toLowerCase());
  const coffeeImage = CoffeeInformation.filter(item => item.name.toLowerCase() === COFFEE_NAME.toLowerCase());

  if (coffeeInformation.length === 0 || coffeeImage.length === 0) return <NotInformation/>
  return (
    <View>

      <CoffeeImageBackground source={BackImg}>
        <CoffeeImage source={coffeeImage[0].image}/>
      </CoffeeImageBackground>

      {coffeeInformation.map((item,index) => (
        <CoffeeInfoBox 
          key={index}
          name={item.name} 
          calory={item.calory}
          suga={item.suga}
          protein={item.protein}
          sodium={item.sodium}
          sat_fat={item.sat_fat}
          caffeine={item.caffeine}
          description={item.description}/>
      ))}
    </View>
  )
}

const CoffeeImageBackground = styled.ImageBackground``

const CoffeeImage = styled.Image`
  width: 50px;
  height: 50px;
  margin: 25px auto;
`

export default Detail