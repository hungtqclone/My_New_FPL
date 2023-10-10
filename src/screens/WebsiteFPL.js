import { StyleSheet, Image, SafeAreaView, Text, View, ActivityIndicator, Modal, Animated, PanResponder, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useContext } from 'react'
import { WebView } from 'react-native-webview';
import { AppStyle } from '../constants/AppStyle';
import { COLOR } from '../constants/Theme';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../utils/AppContext'
const WebsiteFPL = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(true);
    const navigation = useNavigation();
    const { infoUser, idUser, showWebView, setShowWebView } = useContext(AppContext);

    const handleWebViewLoad = () => {
        setIsLoading(false);
        setShowModal(false);
    };

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([
                null,
                { dx: pan.x, dy: pan.y }
            ]),
            onPanResponderRelease: () => {
                Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
            }
        })
    ).current;

    return (
        <SafeAreaView style={[AppStyle.container]}>
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
            <TouchableOpacity style={[AppStyle.row, { alignItems: 'center', paddingHorizontal: 8, paddingVertical: 12 }]} onPress={() => { setShowWebView(3) }}>
                <Image style={AppStyle.icon} source={require('../assets/icons/ic_back_black.png')} />
                <Text style={[AppStyle.titleMedium, { backgroundColor: 'white', color: COLOR.title }]}> Quay lại </Text>
            </TouchableOpacity>

            <WebView
                source={{ uri: 'https://caodang.fpt.edu.vn' }}
                onLoad={handleWebViewLoad}
            />
            {/* <Animated.View
                style={{
                    transform: [{ translateX: pan.x }, { translateY: pan.y }]
                }}
                {...panResponder.panHandlers}
            >
                <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'red' ,zIndex:10}} />
            </Animated.View> */}

        </SafeAreaView>
    );

}

export default WebsiteFPL

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
});