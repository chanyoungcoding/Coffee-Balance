import React, { useEffect, useState } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

import { BasicColor, ChocolateColor } from '../colors';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: `${BasicColor}`,
  backgroundGradientFrom: `${ChocolateColor}`,
  backgroundGradientTo: `${BasicColor}`,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#ffa726"
  }
}

const LineChartBox = () => {
  const [monthlyCoffeeData, setMonthlyCoffeeData] = useState(Array(12).fill(0)); // 기본값 0으로 채운 12개월 데이터

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (!currentUser) {
          Alert.alert('로그인이 필요합니다.');
          return;
        }

        // Firestore에서 사용자 데이터 가져오기
        const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();

          // days 데이터 가져오기
          const { days } = userData;

          // 초기 월별 커피 소비량 계산
          const initialMonthlyCoffeeCounts = Array(12).fill(0);

          days.forEach(day => {
            const monthIndex = new Date(day.day).getMonth(); // 해당 날짜의 월 인덱스 구하기 (0부터 시작)
            day.coffeeName.forEach(name => {
              // 커피 종류에 따른 커피 소비량 추가 (여기서는 단순히 개수를 세는 것으로 가정)
              initialMonthlyCoffeeCounts[monthIndex] += 1;
            });
          });

          // 상태 업데이트
          setMonthlyCoffeeData(initialMonthlyCoffeeCounts);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    // 초기 데이터 가져오기
    fetchInitialData();

    // Firestore 스냅샷 설정
    const unsubscribe = firestore().collection('users').doc(auth().currentUser.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const { days } = userData;

          // 월별 커피 소비량 계산
          const updatedMonthlyCoffeeCounts = Array(12).fill(0);

          days.forEach(day => {
            const monthIndex = new Date(day.day).getMonth(); // 해당 날짜의 월 인덱스 구하기 (0부터 시작)
            day.coffeeName.forEach(name => {
              // 커피 종류에 따른 커피 소비량 추가 (여기서는 단순히 개수를 세는 것으로 가정)
              updatedMonthlyCoffeeCounts[monthIndex] += 1;
            });
          });

          // 상태 업데이트
          setMonthlyCoffeeData(updatedMonthlyCoffeeCounts);
        } else {
          console.log('No such document!');
        }
      });

    // Clean-up 함수 등록 (컴포넌트 언마운트 시 스냅샷 구독 해제)
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <LineChart
        data={{
          labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
          datasets: [
            {
              data: monthlyCoffeeData
            }
          ]
        }}
        width={screenWidth - 20} // from react-native
        height={220}
        yAxisLabel="☕"
        yAxisSuffix="잔"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 5,
        }}
      />
    </View>
  )
}

export default LineChartBox;

