import React, { useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import styled from 'styled-components/native'
import { Alert, Button, Text } from 'react-native'
import auth from "@react-native-firebase/auth";

import { CoffeeInformation } from '../Api/CoffeeName'
import { ChocolateColor } from '../colors';
import { CoffeeCount } from '../Api/CoffeeCount'

const AddCoffeeCup = () => {

  const currentUser = auth().currentUser;

  const [coffeeName, setCoffeeName] = useState("");
  const [coffeeCount, setCoffeeCount] = useState(0);

  const onClickCoffee = (name) => {
    setCoffeeName(name)
  }

  const onClickCoffeeCount = (count) => {
    setCoffeeCount(count)
  }

  const handleSaveData = async () => {
    if (!currentUser) {
      Alert.alert('로그인이 필요합니다.');
      return;
    }

    if(coffeeName === "" || coffeeCount === 0) return;

    try {
      await firestore().collection('users').doc(currentUser.uid).set({
        coffeeName: coffeeName,
        coffeeCount: coffeeCount,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('데이터가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('데이터 저장 중 오류가 발생했습니다.');
    }
  };

  console.log(coffeeName)

  return (
    <Container>
      <QuestionCoffee>어떤 종류의 커피를 드셨나요??</QuestionCoffee>

      <CoffeeImageSelectBox>
        {CoffeeInformation.map((item,index) => (
          <CoffeeImageSelect key={index} onPress={() => onClickCoffee(item.name)}>
            <CoffeeImage source={item.image}/>
            <Text>{item.name}</Text>
            {coffeeName === item.name ? <SelectCoffeeLine/> : null}
          </CoffeeImageSelect>
        ))}
      </CoffeeImageSelectBox>

      <QuestionCoffee>몇잔 드셨나요?</QuestionCoffee>
      <CoffeeCountBox>
        {CoffeeCount.map((item, index) => (
          <CoffeeCountSelect key={index} onPress={() => onClickCoffeeCount(item.count)}>
            <CoffeeImage source={item.image}/>
            <Text>{item.count}잔</Text>
            {coffeeCount === item.count ? <SelectCoffeeLine/> : null}
          </CoffeeCountSelect>
        ))}
      </CoffeeCountBox>

      <Button
        title="데이터 저장"
        onPress={handleSaveData}
      />
    </Container>
  )
}

const Container = styled.View`

`

const QuestionCoffee = styled.Text`
  text-align: center;
  margin: 10px;
  font-size: 20px;
`

const CoffeeImageSelectBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 10px;
`

const CoffeeCountBox = styled(CoffeeImageSelectBox)`
  justify-content: space-around;
`

const CoffeeImageSelect = styled.TouchableOpacity`
  align-items: center;
`

const CoffeeCountSelect = styled(CoffeeImageSelect)``

const CoffeeImage = styled.Image`
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
`

const SelectCoffeeLine = styled.View`
  width: 35px;
  height: 2px;
  margin-top: 4px;
  background-color: ${ChocolateColor};
`

export default AddCoffeeCup