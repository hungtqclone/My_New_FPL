import { StyleSheet, Image, SafeAreaView, Text, View, ActivityIndicator, Modal, Animated, PanResponder, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useContext } from 'react'
import { WebView } from 'react-native-webview';
import { AppStyle } from '../constants/AppStyle';
import { COLOR } from '../constants/Theme';
import { useNavigation } from '@react-navigation/native';
import {AppContext} from '../utils/AppContext'
const ChatAI = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(true);
    const navigation = useNavigation();
    const { infoUser, idUser, showWebView, setShowWebView } = useContext(AppContext);

    const handleWebViewLoad = () => {
        setIsLoading(false);
        setShowModal(false);
    };
    return (
        <SafeAreaView style={[AppStyle.container,{backgroundColor:'#343541'}]}>
            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.textLoading}>Vui lòng đợi trong giây lát ...</Text>
                        <Image
                            source={require('../assets/gif/loading_bar.gif')}
                            style={{ width: 150, height: 100, alignSelf: 'center' }}
                        />

                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={[AppStyle.row, { alignItems: 'center' ,paddingHorizontal:8,paddingVertical:12}]} onPress={() => { setShowWebView(3) }}>
                <Image style={[AppStyle.icon,{tintColor:'white'}]} source={require('../assets/icons/ic_back_black.png',)} />
                <Text style={[AppStyle.titleMedium, { backgroundColor: 'white', color: 'white',backgroundColor:'#343541' }]}> Quay lại </Text>
            </TouchableOpacity>
            <WebView
                source={{ uri: 'https://chatgpt.org/chat' }}
                onLoad={handleWebViewLoad}
            />
        </SafeAreaView>
    )
}

export default ChatAI

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    textLoading: {
        fontSize: 18,
        fontWeight: '600',
        fontStyle: 'italic',
        letterSpacing: -0.41,
        color: COLOR.Tcolor,

    }
})