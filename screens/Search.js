import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { CoffeeInformation }from "../Api/CoffeeName";
import BackgroundUrl from "../assets/coffee/coffeeBackground.png";
import { NomalColor } from '../colors';
import CoffeeSelectBox from '../components/CoffeeSelectBox';

const {width, height} = Dimensions.get("window");

const Search = ({navigation: {navigate}}) => {

  const [searchCoffe, setSearchCoffee] = useState("");

  const onSearchCoffee = () => {
    navigate("Stack", {screen: "Detail", params: { coffeeName: searchCoffe }})
  }

  const onTouchCoffee = (name) => {
    navigate("Stack", {screen: "Detail", params: { coffeeName: name }})
  }

  return (
    <BackgroundContainer source={BackgroundUrl}>

      <SearchBox>
        <SearchInputText
          returnKeyType="done"
          value={searchCoffe}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={text => setSearchCoffee(text)}
          placeholder="Please enter the coffee name"
          onSubmitEditing={onSearchCoffee}
        />
        <SearchIcon onPress={onSearchCoffee}>
          <FontAwesome name="search" size={24} color="black" />
        </SearchIcon>
      </SearchBox>

      <View style={{width: width, height: height, backgroundColor: "white"}}>
        <ScrollView>
          {CoffeeInformation.map((item,index) => (
            <CoffeeSelectBox 
              key={index}
              index={index} 
              image={item.image} 
              name={item.name} 
              onTouchCoffee={onTouchCoffee}
            />
          ))}
        </ScrollView>
      </View>
    </BackgroundContainer>
  )
}

const BackgroundContainer = styled.ImageBackground`
  flex: 1;
`;

const SearchBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px 0px;
`

const SearchInputText = styled.TextInput`
  width: 300px;
  margin: 10px;
  padding: 12px;
  border-radius: 10px;
  font-size: 16px;
  color: black;
  background-color: white;
`

const SearchIcon = styled.TouchableOpacity``

const CoffeeInformationBox = styled.TouchableOpacity`
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

export default Search