import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import auth from "@react-native-firebase/auth";

import { NomalColor } from '../colors'

const Home = ({navigation: {navigate}}) => {

  const user = auth().currentUser;
  const useremail = user.email
  const useruid = user.uid

  console.log(`userEmail : ${useremail}, useruid: ${useruid}`)
  return (
    <View style={{flex: 1, backgroundColor: NomalColor}}>
      <TouchableOpacity onPress={() => navigate("Stack", {screen: "Test"})}>
        <Text>One</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home