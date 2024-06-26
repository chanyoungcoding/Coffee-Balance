import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import styled from 'styled-components/native';
import { Alert, Button, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

import { CoffeeInformation } from '../Api/CoffeeName';
import { ChocolateColor } from '../colors';
import { CoffeeCount } from '../Api/CoffeeCount';

const AddCoffeeCup = () => {

  const currentUser = auth().currentUser;

  const [coffeeName, setCoffeeName] = useState("");
  const [coffeeCount, setCoffeeCount] = useState(0);

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

      Alert.alert('데이터가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('데이터 저장 중 오류가 발생했습니다.');
    }
  };

  console.log(coffeeName);

  return (
    <Container>
      <QuestionCoffee>어떤 종류의 커피를 드셨나요??</QuestionCoffee>

      <CoffeeImageSelectBox>
        {CoffeeInformation.map((item, index) => (
          <CoffeeImageSelect key={index} onPress={() => onClickCoffee(item.name)}>
            <CoffeeImage source={item.image} />
            <Text>{item.name}</Text>
            {coffeeName === item.name ? <SelectCoffeeLine /> : null}
          </CoffeeImageSelect>
        ))}
      </CoffeeImageSelectBox>

      <QuestionCoffee>몇잔 드셨나요?</QuestionCoffee>
      <CoffeeCountBox>
        {CoffeeCount.map((item, index) => (
          <CoffeeCountSelect key={index} onPress={() => onClickCoffeeCount(item.count)}>
            <CoffeeImage source={item.image} />
            <Text>{item.count}잔</Text>
            {coffeeCount === item.count ? <SelectCoffeeLine /> : null}
          </CoffeeCountSelect>
        ))}
      </CoffeeCountBox>

      <Button
        title="데이터 저장"
        onPress={handleSaveData}
      />
    </Container>
  );
};

const Container = styled.View``;

const QuestionCoffee = styled.Text`
  text-align: center;
  margin: 10px;
  font-size: 20px;
`;

const CoffeeImageSelectBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 10px;
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

export default AddCoffeeCup;
