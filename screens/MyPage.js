import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Platform, StyleSheet, Text } from 'react-native';
import auth from "@react-native-firebase/auth";
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BasicColor, ChocolateColor, NomalColor } from '../colors';

import BackgroundUrl from "../assets/coffee/coffeeBackground.png";

const MyPage = () => {

  const [imageUri, setImageUri] = useState(null);
  const [userImageUrl, setUserImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = auth().currentUser;

  useEffect(() => {
    if (user) {
      const userImageRef = storage().ref(`avatar/${user.uid}`);
      userImageRef.getDownloadURL()
        .then(url => {setUserImageUrl(url);})
        .catch(error => {console.log("No existing image found for user: ", error)});
    }
  }, [user]);

  const selectImageFromGallery = async () => {

    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Image selection cancelled');
      } else if (response.errorMessage) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        const asset = response.assets[0];
        setImageUri(asset.uri);
      }
    }).catch(error => {
      console.error('Failed to open image picker: ', error);
    });
  };

  const uploadImageToFirebase = async () => {
    if (!imageUri) {
      console.log('No image selected');
      return;
    }

    if (!user) {
      console.log('User not logged in');
      return;
    }

    const fileName = `avatar/${user.uid}`;
    const storageRef = storage().ref(fileName);

    try {
      setLoading(true);
      // Delete the old image if it exists
      await storageRef.delete().catch((error) => {
        if (error.code !== 'storage/object-not-found') {
          throw error;
        }
      });

      const uploadTask = storageRef.putFile(imageUri);
      await uploadTask;

      // Get the download URL of the uploaded image
      const downloadUrl = await storageRef.getDownloadURL();
      setUserImageUrl(downloadUrl);
      setImageUri(null); 
      console.log('Image uploaded successfully: ', downloadUrl);
    } catch (error) {
      console.error('Image upload failed: ', error);
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃
  const Logout = async () => {
    try {
      await auth().signOut();
      Alert.alert("로그아웃 되었습니다.")
    } catch (e) {
      console.log(e)
    }
  }

  // 이미지 선택 삭제
  const DeleteUploadImage = () => {
    setImageUri(null)
  }

  return (
    <BackgroundContainer source={BackgroundUrl}>
      <Container>

        <IntroBox>
          <WelcomeBox>
            <Text>{user ? `${user.email} 님 ` : null}</Text>
            <Text>안녕하세요.</Text>
          </WelcomeBox>
          <UserImg source={userImageUrl ? { uri: userImageUrl } : null} />

          <SelectImageButton style={styles.textInput} onPress={selectImageFromGallery}>
            <MaterialCommunityIcons name="image-size-select-actual" size={24} color="black" />
          </SelectImageButton>

        </IntroBox>

        {imageUri && (
          <ImageSelectBox style={styles.textInput}>
            <ImagePreview source={{ uri: imageUri }} />
            <ButtonTextBox>
              <UploadButton onPress={uploadImageToFirebase}>
                {loading ? <ActivityIndicator color="white"/> : <UploadButtonText>등록</UploadButtonText>}
              </UploadButton>
              <DeleteButton onPress={DeleteUploadImage}>
                <DeleteButtonText>취소</DeleteButtonText>
              </DeleteButton>
            </ButtonTextBox>
          </ImageSelectBox>
        )}

        <LogoutButton onPress={Logout}>
          <LogoutText>로그아웃</LogoutText>
        </LogoutButton>

      </Container>
    </BackgroundContainer>
  )
}

const BackgroundContainer = styled.ImageBackground`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-size: cover;
`

const IntroBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 40px 0px;
  align-items: center;
`

const WelcomeBox = styled.View`
`

const UserImg = styled.Image`
  width: 70px;
  height: 70px;
  background-color: gray;
  border-radius: 100px;
`

const SelectImageButton = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: ${ChocolateColor};
  border-radius: 100px;
  padding: 5px;
  position: absolute;
  right: -15px;
  top: 30px;
`

const ButtonTextBox = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-left: 5px;
`

const UploadButton = styled.TouchableOpacity`
  background-color: ${BasicColor};
  padding: 10px;
  border-radius: 5px;
`

const DeleteButton = styled.TouchableOpacity`
  background-color: red;
  color: white;
  margin-left: 5px;
  padding: 10px;
  border-radius: 5px;
`

const DeleteButtonText = styled.Text`
  color: white;
  font-weight: bold;
`

const UploadButtonText = styled.Text`
  color: ${NomalColor};
  font-weight: bold;
`

const LogoutButton = styled.TouchableOpacity`
  align-items: center;
  width: 125px;
  margin: 30px auto;
  padding: 10px;
  background-color: ${BasicColor};
  border-radius: 5px;
`

const LogoutText = styled.Text`
  color: ${NomalColor};
  font-weight: bold;
`

const ImagePreview = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`

const ImageSelectBox = styled.View`
  position: absolute;
  left: 27%;
  top: 33%;
  padding: 20px 30px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
`

const styles = StyleSheet.create({
  textInput: {
    shadowColor: "#636363",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});


export default MyPage;
