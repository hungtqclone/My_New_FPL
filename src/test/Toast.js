import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useRef } from 'react'
import Button from '../components/Toast/Button'
import ToastMessage from '../components/Toast/ToastMessage'


const Toast = () => {
    const [toastType, setToastType] = useState("success");
    const toastRef = useRef(null);
  
    const handleShowToast = () => {
      if (toastRef.current) {
        toastRef.current.show();
      }
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  
        <ToastMessage
          type={toastType}
          text="Lorem Ipsum Text"
          description="Lorem Ipsum Description"
          ref={toastRef} />
  
        <Button type="success" text="Success" onPress={() => { setToastType("success"); handleShowToast(); }} />
        <Button type="danger" text="Danger" onPress={() => { setToastType("danger"); handleShowToast(); }} />
        <Button type="info" text="Info" onPress={() => { setToastType("info"); handleShowToast(); }} />
        <Button type="warning" text="Warning" onPress={() => { setToastType("warning"); handleShowToast(); }} />
  
      </View>
    );
}

export default Toast

const styles = StyleSheet.create({})