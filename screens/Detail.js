import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'
import { CoffeeInfo } from '../Api/CoffeeInfo'
import { CoffeeInformation } from '../Api/CoffeeName'
import { DarkCoffeeColor } from '../colors'
import CoffeeInfoBox from '../components/CoffeeInfoBox'

const Detail = ({ route, navigation: {goBack} }) => {

  const COFFEE_NAME = route.params.coffeeName
  const coffeeInformation = CoffeeInfo.filter(item => item.name.toLowerCase() === COFFEE_NAME.toLowerCase());
  const coffeeImage = CoffeeInformation.filter(item => item.name.toLowerCase() === COFFEE_NAME.toLowerCase());

  if (coffeeInformation.length === 0 || coffeeImage.length === 0) return (
    <View>
      <Text>정보가 없습니다.</Text>
    </View>
  );
  return (
    <View>
      <GoBackButton onPress={() => goBack()}>
        <Text>goBack</Text>
      </GoBackButton>

      <CoffeeImage source={coffeeImage[0].image}/>

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

const GoBackButton = styled.TouchableOpacity`

`

const CoffeeImage = styled.Image`
  width: 50px;
  height: 50px;
  margin: 25px auto;
`

export default Detail