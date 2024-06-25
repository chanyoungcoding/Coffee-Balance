import React from 'react'
import { Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit'
import { BasicColor, NomalColor } from '../colors';

const screenWidth = Dimensions.get('window').width;

const data = {
  labels: ["카페인", "하루섭취", "Run"],
  data: [0.4, 0.6, 0.8]
};

const chartConfig = {
  backgroundGradientFrom: `${NomalColor}`,
  backgroundGradientTo: `${BasicColor}`,
  color: (opacity = 1) => `rgba(86, 52, 21, ${opacity})`,
};

const ProgressChartBox = () => {
  return (
    <ProgressChart
      data={data}
      width={screenWidth}
      height={200}
      strokeWidth={16}
      radius={32}
      chartConfig={chartConfig}
      hideLegend={false}
    />
  )
}

export default ProgressChartBox