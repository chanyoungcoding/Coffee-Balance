import React from 'react'

import styled from 'styled-components/native';
import { BasicColor } from '../colors';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';

const SelectCoffeeImage = ({image, name, koreaName}) => {
  const navigation = useNavigation();

  const onSearchCoffee = () => {
    navigation.navigate("Stack", {screen: "Detail", params: { coffeeName: name }})
  }

  return (
    <View>
      <CoffeeImgBox onPress={onSearchCoffee} style={styles.CoffeeBoxShadow}>
        <CoffeeImg source={image}/>
      </CoffeeImgBox>
      <CoffeeText>{koreaName}</CoffeeText>
    </View>
  )
}

const CoffeeImgBox = styled.TouchableOpacity`
  border-radius: 10px;
  background-color: ${BasicColor};
`

const CoffeeImg = styled.Image`
  width: 60px;
  height: 60px;
`

const CoffeeText = styled.Text`
  margin-top: 5px;
  text-align: center;
  font-size: 13px;
`

const styles = StyleSheet.create({
  CoffeeBoxShadow: {
    borderColor: "#F7E9D6",
    borderRadius: 10, 
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: .5, height: .7 },
    shadowOpacity: .3, 
    shadowRadius: .7, 
  },
});

export default SelectCoffeeImage