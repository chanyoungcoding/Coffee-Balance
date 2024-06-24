import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Home = ({navigation: {navigate}}) => {
  return (
    <TouchableOpacity onPress={() => navigate("Stack", {screen: "One"})}>
      <Text>One</Text>
    </TouchableOpacity>
  )
}

export default Home