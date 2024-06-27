import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components/native';
import { ActivityIndicator, Alert, Button, StyleSheet, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

import { CoffeeInformation } from '../Api/CoffeeName';
import { BasicColor, ChocolateColor, NomalColor } from '../colors';
import { CoffeeCount } from '../Api/CoffeeCount';

import CoffeeBackground from "../assets/coffee/CoffeeCupBackground.jpg";

const AddCoffeeCup = ({navigation: {goBack}}) => {

  const currentUser = auth().currentUser;

  const [coffeeName, setCoffeeName] = useState("");
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [loading , setLoading] = useState(false);

  const onClickCoffee = (name) => {
    setCoffeeName(name);
  };

  const onClickCoffeeCount = (count) => {
    setCoffeeCount(count);
  };

  const handleSaveData = async () => {
    if (!currentUser) {
      Alert.alert('로그인이 필요합니다.');
      return;
    }

    if (coffeeName === "" || coffeeCount === 0) return;

    const today = new Date();
    const day = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; // 오늘 날짜 형식 YYYY-MM-DD

    try {

      setLoading(true);

      const userDocRef = firestore().collection('users').doc(currentUser.uid);
      const userDoc = await userDocRef.get();

      if (userDoc.exists) {
        // 문서가 존재하면 업데이트
        const userData = userDoc.data();
        let updatedDays = userData.days || [];

        // 오늘 날짜의 기록이 있는지 확인
        const dayIndex = updatedDays.findIndex(record => record.day === day);

        if (dayIndex !== -1) {
          // 오늘 날짜의 기록이 이미 있으면 업데이트
          const coffeeNamesToAdd = Array(coffeeCount).fill(coffeeName); // coffeeCount 수 만큼 coffeeName 배열 생성
          updatedDays[dayIndex].coffeeName.push(...coffeeNamesToAdd); // coffeeName 배열에 추가
          updatedDays[dayIndex].coffeeCount += coffeeCount; // 커피 수량 업데이트
        } else {
          // 오늘 날짜의 기록이 없으면 새로 추가
          updatedDays.push({
            day: day,
            coffeeName: Array(coffeeCount).fill(coffeeName), // coffeeCount 수 만큼 coffeeName 배열 생성
            coffeeCount: coffeeCount,
          });
        }

        // 문서 업데이트
        await userDocRef.update({
          days: updatedDays,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      } else {
        // 문서가 없으면 새로 추가
        await userDocRef.set({
          userId: currentUser.uid,
          days: [{
            day: day,
            coffeeName: Array(coffeeCount).fill(coffeeName), // coffeeCount 수 만큼 coffeeName 배열 생성
            coffeeCount: coffeeCount,
          }],
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }

      setLoading(false);

      Alert.alert('성공적으로 저장되었습니다.');
      goBack();
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('데이터 저장 중 오류가 발생했습니다.');
    }
  };

  console.log(coffeeName);

  return (
    <Container>
      <BackgroundContainer source={CoffeeBackground}>
        <IntroBox>
          <IntroText>커피는</IntroText>
          <IntroText>삶의 활력소</IntroText>
        </IntroBox>
      </BackgroundContainer>

      <QuestionBox>
        <QuestionCoffee>어떤 종류의 커피를 드셨나요??</QuestionCoffee>
      </QuestionBox>

      <CoffeeImageSelectBox style={styles.CoffeeBoxShadow}>
        {CoffeeInformation.map((item, index) => (
          <CoffeeImageSelect key={index} onPress={() => onClickCoffee(item.name)}>
            <CoffeeImage source={item.image} />
            <Text>{item.name}</Text>
            {coffeeName === item.name ? <SelectCoffeeLine /> : null}
          </CoffeeImageSelect>
        ))}
      </CoffeeImageSelectBox>

      <QuestionBox>
        <QuestionCoffee>몇잔 드셨나요?</QuestionCoffee>
      </QuestionBox>

      <CoffeeCountBox style={styles.CoffeeBoxShadow}>
        {CoffeeCount.map((item, index) => (
          <CoffeeCountSelect key={index} onPress={() => onClickCoffeeCount(item.count)}>
            <CoffeeImage source={item.image} />
            <Text>{item.count}잔</Text>
            {coffeeCount === item.count ? <SelectCoffeeLine /> : null}
          </CoffeeCountSelect>
        ))}
      </CoffeeCountBox>

      <SelectButton onPress={handleSaveData}>
        <SelectButtonText>{loading ? <ActivityIndicator/> : "저장"}</SelectButtonText>
      </SelectButton>
    </Container>
  );
};


const Container = styled.View`
  background-color: white;
`;

const BackgroundContainer = styled.ImageBackground``

const IntroBox = styled.View`
  background-color: rgba(0,0,0,0.5);
  padding: 50px 0px;
`

const IntroText = styled.Text`
  margin-left: 20px;
  color: white;
  font-size: 16px;
  font-weight: bold;
`

const QuestionBox = styled.View`
  margin: 10px 10px 20px;
  padding: 10px;
  background-color: white;
  border-radius: 15px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px;
`

const QuestionCoffee = styled.Text`
  text-align: center;
  font-size: 20px;
`;

const CoffeeImageSelectBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 10px;
  padding: 20px 15px;
  border-radius: 10px;
  background-color: ${BasicColor};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px;
`;

const CoffeeCountBox = styled(CoffeeImageSelectBox)`
  justify-content: space-around;
`;

const CoffeeImageSelect = styled.TouchableOpacity`
  align-items: center;
`;

const CoffeeCountSelect = styled(CoffeeImageSelect)``;

const CoffeeImage = styled.Image`
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
`;

const SelectCoffeeLine = styled.View`
  width: 35px;
  height: 2px;
  margin-top: 4px;
  background-color: ${ChocolateColor};
`;

const SelectButton = styled.TouchableOpacity`
  width: 100px;
  margin: 30px auto 50px;
  padding: 10px;
  align-items: center;
  border-radius: 5px;
  background-color: ${BasicColor};
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`

const SelectButtonText = styled.Text`
  color: white;
  font-weight: bold;
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

export default AddCoffeeCup;
