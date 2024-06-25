// App.js
import React, { useState } from 'react';
import { View, Button, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const Test = () => {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUri, setUploadedUri] = useState('');

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

    const currentUser = auth().currentUser;
    if (!currentUser) {
      console.log('No user is logged in');
      return;
    }

    const uid = currentUser.uid;
    const fileName = `avatar/${uid}`;
    const storageRef = storage().ref(fileName);

    setUploading(true);

    try {
      const uploadTask = storageRef.putFile(imageUri);
      await uploadTask;

      const downloadUrl = await storageRef.getDownloadURL();
      setUploadedUri(downloadUrl);
      console.log('Image uploaded successfully: ', downloadUrl);
    } catch (error) {
      console.error('Image upload failed: ', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Image from Gallery" onPress={selectImageFromGallery} />
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}
      <Button title="Upload Image to Firebase" onPress={uploadImageToFirebase} disabled={!imageUri || uploading} />
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
      {uploadedUri && (
        <View style={styles.uploadedInfo}>
          <Text>Image uploaded to:</Text>
          <Text style={styles.link}>{uploadedUri}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 20,
    width: 200,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadedInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  link: {
    color: 'blue',
  },
});

export default Test;

