import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { NomalColor } from '../colors'

const Home = ({navigation: {navigate}}) => {
  return (
    <View style={{flex: 1, backgroundColor: NomalColor}}>
      <TouchableOpacity onPress={() => navigate("Stack", {screen: "One"})}>
        <Text>One</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home