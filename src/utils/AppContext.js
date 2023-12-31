import React, { createContext, useState,useEffect, useMemo } from "react";
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;
    const [isLogin, setIsLogin] = useState(true)
    const [infoUser, setInfoUser] = useState({})
    const [idUser, setIdUser] = useState("")
    const [appState, setAppState] = useState(0)
    const [showWebView, setShowWebView] = React.useState(3);

    useEffect(() => {
        getInfoUser()

        return () => {

        }
    }, [isLogin])

    const getInfoUser = async () => {
        try {
            const userInfoString = await AsyncStorage.getItem('userInfo');
            if (userInfoString !== null) {
                const userInfo = JSON.parse(userInfoString);
                // Sử dụng thông tin đã lưu ở đây
                setInfoUser(userInfo)
                setIdUser(userInfo._id)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const currentDay = moment().format('YYYY-MM-DD');

    const contextValue = useMemo(() => {
        return {
            isLogin, setIsLogin, infoUser, setInfoUser, idUser, setIdUser,
            currentDay, appState, setAppState, showWebView, setShowWebView
        };
    }, [isLogin, setIsLogin, infoUser, setInfoUser, idUser, setIdUser,
        currentDay, appState, setAppState, showWebView, setShowWebView]);
    return (
        <AppContext.Provider
            value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}