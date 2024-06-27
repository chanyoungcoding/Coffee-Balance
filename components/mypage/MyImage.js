import React, { useEffect, useState } from 'react'

import auth from "@react-native-firebase/auth";
import storage from '@react-native-firebase/storage';
import styled from 'styled-components';

const MyImage = ({setUserImageUrl, userImageUrl}) => {
  const user = auth().currentUser;

  useEffect(() => {
    if (user) {
      const userImageRef = storage().ref(`avatar/${user.uid}`);
      userImageRef.getDownloadURL()
        .then(url => {setUserImageUrl(url);})
        .catch(error => {console.log("No existing image found for user: ", error)});
    }
  }, [user]);

  return (
    <UserImg source={userImageUrl ? { uri: userImageUrl } : null} />
  )
}

const UserImg = styled.Image`
  width: 70px;
  height: 70px;
  background-color: gray;
  border-radius: 100px;
`

export default MyImage