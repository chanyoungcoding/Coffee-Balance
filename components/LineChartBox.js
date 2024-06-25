import React from 'react'
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";

import { BasicColor, ChocolateColor } from '../colors'

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
  return (
    <View>
      <LineChart
        data={{
          labels: ["1월", "2월", "3월", "4월", "5월", "6월","7월", "8월", "9월", "10월", "11월", "12월"],
          datasets: [
            {
              data: [
                40,
                90,
                30,
                21,
                64,
                31,
                16,
                77,
                57,
                43,
                35,
                66,
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width - 20} // from react-native
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

export default LineChartBox