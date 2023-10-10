import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { decode } from 'jsqr';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

const Test = () => {
  const [qrData, setQrData] = useState(null);

  const takePicture = async function(camera) {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);

      const qrCodeData = await scanQRCode(data.uri);
      setQrData(qrCodeData);
    }
  };

  const scanQRCode = async function(imageUri) {
    const response = await fetch(imageUri);
    const imageData = await response.arrayBuffer();
    const { data, width, height } = await createImageBitmap(imageData);

    const code = decode(data, width, height);
    if (code) {
      return code.data;
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
      <View style={styles.qrDataContainer}>
        {qrData && <Text style={styles.qrDataText}>{qrData}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  qrDataContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  qrDataText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Test;
