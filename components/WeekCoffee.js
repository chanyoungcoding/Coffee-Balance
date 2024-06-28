import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRecoilValue } from 'recoil';
import { Fontisto } from '@expo/vector-icons';

import { AllCoffeeData } from '../Data';
import styled from 'styled-components/native';
import { BasicColor, NomalColor } from '../colors';

const WeekCoffee = () => {
  const coffeeData = useRecoilValue(AllCoffeeData);

  const today = new Date();

  const coffeeCounts = Array(7).fill(0);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

    // 1주 전 날짜 계산
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

  // 최근 7일의 날짜 리스트 생성
  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(today.getDate() - index);
    return date;
  }).reverse();

  // coffeeData에서 최근 7일 동안의 커피 카운트 합산
  coffeeData.forEach(({ day, coffeeCount }) => {
    const coffeeDate = new Date(day);
    last7Days.forEach((date, index) => {
      if (formatDate(coffeeDate) === formatDate(date)) {
        coffeeCounts[index] += coffeeCount;
      }
    });
  });


  return (
    <View>
      <CoffeeWeekText>주간 커피 마신 날</CoffeeWeekText>
      <Container style={styles.CoffeeBoxShadow}>
        {coffeeCounts.map((count, index) => (
          <CoffeeCupBox key={index} style={ count > 0 ? { backgroundColor: BasicColor } : {backgroundColor: "#EFEFEF"}}>
            <Fontisto name="coffeescript" size={12} color={count > 0 ? "black" : "#797979"} />
          </CoffeeCupBox>
        ))}
      </Container>
      <WeekTextBox>
      <WeekText>{`${formatDate(oneWeekAgo).substring(5,10)}`}</WeekText>
      <WeekText>{`${formatDate(today).substring(5,10)}`}</WeekText>
      </WeekTextBox>
    </View>
  );
};

const Container = styled.View`
  width: 90%;
  margin: 0 auto;
  padding: 10px 15px;
  background-color: white;
  flex-direction: row;
  justify-content: space-around;
`

const CoffeeWeekText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 15px;
`

const CoffeeCupBox = styled.View`
  width: 40px;
  height: 40px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`

const WeekTextBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 25px;
`

const WeekText = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: gray;
`

const styles = StyleSheet.create({
  CoffeeBoxShadow: {
    borderColor: "#F7E9D6",
    borderRadius: 5, 
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: .5, height: .7 },
    shadowOpacity: .3, 
    shadowRadius: .7, 
  },
});

export default WeekCoffee;
