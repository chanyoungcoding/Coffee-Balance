import React, { useEffect, useState } from 'react';
import { Dimensions, View, Text, Alert, Modal, Button, StyleSheet } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import styled from 'styled-components/native';
import { useRecoilState } from 'recoil';
import { AllCoffeeData, YesterDayCoffeeCaffeine, dataCoffee } from "../Data";

import { BasicColor, NomalColor } from '../colors';
import { CoffeeInfo } from '../Api/CoffeeInfo';

const screenWidth = Dimensions.get('window').width;

const ProgressChartBox = () => {

  const [coffeeData, setCoffeeData] = useRecoilState(dataCoffee)
  const [coffeeAllData, setCoffeeAllData] = useRecoilState(AllCoffeeData)
  const [CaffeineData, setCaffeineData] = useRecoilState(YesterDayCoffeeCaffeine)

  const [modalVisible, setModalVisible] = useState(false);

    // 어제 날짜 
    const yesterDayBring = () => {
      const today = new Date();
  
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
  
      const formattedYesterday = yesterday.toISOString().split('T')[0];
      return formattedYesterday
    }

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) {
      Alert.alert('로그인이 필요합니다.');
      return;
    }

    // Firestore에서 실시간으로 데이터 가져오기
    const unsubscribe = firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot((userDoc) => {
        if (userDoc.exists) {
          const userData = userDoc.data();

          setCoffeeAllData(userData.days)
          // days 데이터 가져오기
          const { days } = userData;
          const yesterday = yesterDayBring();

          // 오늘 날짜의 데이터를 가져오기 (날짜 형식에 맞게 수정 필요)
          const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
          const todayData = days?.find(day => day.day === today);
          const yesterData = days?.find(day => day.day === yesterday);

          if (todayData) {

            let totalCoffeeCount = 0;
            let totalCaffeine = 0;
            let totalCalory = 0;

            todayData.coffeeName.forEach(name => {
              const coffeeInfo = CoffeeInfo.find(coffee => coffee.name === name);

              if (coffeeInfo) {
                totalCoffeeCount += 1;
                totalCaffeine += coffeeInfo.caffeine;
                totalCalory += coffeeInfo.calory;
              }
            });

            // 위험 수치 초과 여부 확인
            let coffeeCountExceeds = totalCoffeeCount > 5;
            let caffeineExceeds = totalCaffeine > 600;

            // 상태 업데이트
            setCoffeeData({
              coffeeCount: coffeeCountExceeds ? 5 : totalCoffeeCount,
              caffeine: caffeineExceeds ? 600 : totalCaffeine,
              calory: totalCalory,
            });

            // 위험 수치 초과 시 모달 창 표시
            if (coffeeCountExceeds || caffeineExceeds) {
              setModalVisible(true);
            }
          }

          // 어제 카페인 데이터
          if(yesterData) {
            let yesterdayCaffeine = 0;

            yesterData.coffeeName.forEach(name => {
              const coffeeInfo = CoffeeInfo.find(coffee => coffee.name === name);

              if(coffeeInfo) {
                yesterdayCaffeine += coffeeInfo.caffeine;
              }
            })

            setCaffeineData({
              caffeine: yesterdayCaffeine
            })



          }
        }
      }, (error) => {
        console.error('Error fetching data:', error);
      });

    // 컴포넌트가 언마운트될 때 리스너 정리
    return () => unsubscribe();

  }, []);

  // ProgressChart에 전달할 데이터 설정
  const data = {
    labels: ["커피 개수", "카페인", "칼로리"],
    data: [
      coffeeData.coffeeCount / 5,   // 최대 5잔으로 정규화
      coffeeData.caffeine / 600,    // 최대 600mg으로 정규화
      coffeeData.calory / 2000      // 최대 2000kcal으로 정규화
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: `${NomalColor}`,
    backgroundGradientTo: `${BasicColor}`,
    color: (opacity = 1) => `rgba(86, 52, 21, ${opacity})`,
  };

  return (
    <View>
      <ProgressChart
        data={data}
        width={screenWidth}
        height={200}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={true}
      />

      <CoffeeTotalBox>
        <Text>커피 개수: {coffeeData.coffeeCount}잔</Text>
        <Text>카페인: {coffeeData.caffeine}mg</Text>
        <Text>칼로리: {coffeeData.calory}kcal</Text>
      </CoffeeTotalBox>

      {/* 경고 모달 창 */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>더이상 커피를 마시면 위험합니다.</Text>
            <Button title="확인" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CoffeeTotalBox = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 10px;
  padding: 10px;
  background-color: ${BasicColor};
  border-radius: 5px;
`;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ProgressChartBox;

