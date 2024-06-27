import React, { useEffect, useRef } from 'react'
import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons';
import { NomalColor } from '../colors'
import { Animated, Text, View } from 'react-native';

const CoffeeSelectBox = ({image, name, onTouchCoffee, index}) => {

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: true,
      delay: index * 100,
    }).start();
  }, []);

  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  return (
    <CoffeeInformationBox onPress={() => onTouchCoffee(name)}>
      <Wrapper style={{ opacity, transform: [{ scale }] }}>
        <CoffeeImage source={image}/>
        <Text>{name}</Text>
        <MaterialIcons name="arrow-forward-ios" size={12} color="black" />
      </Wrapper>
    </CoffeeInformationBox>
  )
}

const CoffeeInformationBox = styled.TouchableOpacity``

const Wrapper = styled(Animated.createAnimatedComponent(View))`
  flex-direction: row;
  align-items:center;
  justify-content: space-between;
  padding: 5px;
  background-color: white;
  border-bottom-width: 1px;  
  border-bottom-color: ${NomalColor}; 
`

const CoffeeImage = styled.Image`
  width: 50px;
  height: 50px;
`

export default CoffeeSelectBox