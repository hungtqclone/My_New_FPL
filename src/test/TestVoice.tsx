import Voice from '@react-native-voice/voice';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LANG_TAGS } from 'react-native-mlkit-translate-text';

const VoiceTranslate = () => {
  const [voice, setVoice] = useState('');

  useEffect(() => {
    Voice.isAvailable().then(res => {
      console.log('isAvailable', res);
    });

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = () => {
    Voice.start(LANG_TAGS.VIETNAMESE);
  };

  const endSpeechToText = () => {
    Voice.stop();
  };

  Voice.onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e.value);
  };

  Voice.onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e.isFinal);
  };

  Voice.onSpeechError = e => {
    console.log('onSpeechError: ', e.error?.message);
  };

  Voice.onSpeechResults = e => {
    console.log('onSpeechResults: ', e.value);
    setVoice(e.value[0]);
  };

  Voice.onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e.error);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPressIn={startSpeechToText}
        onPressOut={endSpeechToText}>
        <Text>Speech to Text</Text>
      </TouchableOpacity>

      <Text>{voice}</Text>
    </View>
  );
};

export default VoiceTranslate;

const styles = StyleSheet.create({});
