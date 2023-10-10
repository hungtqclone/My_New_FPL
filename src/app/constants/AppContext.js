import React, { createContext, useState, useMemo } from "react";
export const AppContext = createContext();
import moment from 'moment';

export const AppProvider = (props) => {
    const { children } = props;
    const [isLogin, setIsLogin] = useState(false)
    const [infoUser, setInfoUser] = useState({})
    const [idUser, setIdUser] = useState("")
    const [showBottom, setShowBottom] = useState(true)
    const [appState, setAppState] = useState(0)
    const currentDay = moment().format('YYYY-MM-DD');

    const contextValue = useMemo(() => {
        return {
            isLogin, setIsLogin, infoUser, setInfoUser, idUser, setIdUser, showBottom, setShowBottom,
            currentDay, appState, setAppState
        };
    }, [isLogin, setIsLogin, infoUser, setInfoUser, idUser, setIdUser, showBottom, setShowBottom,
        currentDay, appState, setAppState]);
    return (
        <AppContext.Provider
            value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}