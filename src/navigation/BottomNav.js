import { StyleSheet, Text, View, Image, } from 'react-native'
import React, { useState, useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ICON, COLOR } from '../constants/Theme'
import * as Animatable from 'react-native-animatable';
import { AppContext } from "../utils/AppContext";
import Login from '../screens/Login';
import Home from '../screens/Home';
import News from '../screens/News';
import Profile from '../screens/Profile';
import Schedule from '../screens/Schedule';
import DetailsNew from '../screens/DetailsNew';
import ItemActivate from '../components/New/ItemActivate';
import Study from '../screens/Study';
import VideoCall from '../screens/VideoCall'
import ChatTest from '../test/ChatTest'
import Activate from '../screens/Activate';
import ItemNews from '../components/Home/ItemNews';
import ScanQrCode from '../screens/ScanQrCode';
import WebsiteFPL from '../screens/WebsiteFPL';
import GoFPT from '../screens/GoFPT/GoFPT';
import DetailFindDriver from '../screens/GoFPT/DetailFindDriver';
import FindDriver from '../screens/GoFPT/FindDriver';
import DetailFindGoWith from '../screens/GoFPT/DetailFindGoWith';
import FindGoWith from '../screens/GoFPT/FindGoWith';
import HistoryPosted from '../screens/GoFPT/HistoryPosted';
import ChatAI from '../screens/ChatAI'




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackBegin = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="BottomNav" component={BottomTabNav} />

        </Stack.Navigator>
    )
}
const StackHome = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DetailsNew" component={DetailsNew} />

        </Stack.Navigator>
    )
}
const StackProfile = () => {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ChatTest" component={ChatTest} />
            <Stack.Screen name="VideoCall" component={VideoCall} />
            <Stack.Screen name="ScanQRCode" component={ScanQrCode} />
            <Stack.Screen name="WebsiteFPL" component={WebsiteFPL} />
            <Stack.Screen name="ChatAI" component={ChatAI} />



        </Stack.Navigator>
    )
}
const StackNews = () => {
    return (
        <Stack.Navigator initialRouteName="News" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="News" component={News} />
            <Stack.Screen name="Activate" component={Activate} />
            <Stack.Screen name="DetailsNew" component={DetailsNew} />
            <Stack.Screen name="ItemActivate" component={ItemActivate} />
            <Stack.Screen name="ItemNews" component={ItemNews} />

        </Stack.Navigator>
    )
}
const StackSchedule = () => {
    return (
        <Stack.Navigator initialRouteName="Schedule" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Schedule" component={Schedule} />

        </Stack.Navigator>
    )
}
const StackGoFPT = () => {
    return (
        <Stack.Navigator initialRouteName="GoFPT" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="GoFPT" component={GoFPT} />
            <Stack.Screen name="DetailFindDriver" component={DetailFindDriver} />
            <Stack.Screen name="DetailFindGoWith" component={DetailFindGoWith} />
            <Stack.Screen name="FindDriver" component={FindDriver} />
            <Stack.Screen name="HistoryPosted" component={HistoryPosted} />
            <Stack.Screen name="FindGoWith" component={FindGoWith} />


        </Stack.Navigator>
    )
}
const Main = () => {
    const { infoUser, idUser, showWebView, setShowWebView } = useContext(AppContext);

    return (
        <>
            {
                showWebView == 0 ? (
                    <WebsiteFPL />
                ) :
                    showWebView == 1 ? (
                        <ChatAI />
                    ) : showWebView == 3 ?
                        (<Tab.Navigator
                            initialRouteName="StackHome"
                            screenOptions={
                                ({ route }) => ({
                                    tabBarIcon: ({ focused, label, size }) => {
                                        let iconName = focused
                                        if (route.name === 'StackHome') {
                                            iconName = focused ? ICON.HomeFocus : ICON.Home
                                            label = 'Trang chủ'
                                        } else if (route.name === 'StackSchedule') {
                                            iconName = focused ? ICON.ScheduleFocus : ICON.Schedule;
                                            label = 'Lịch'
                                        } else if (route.name === 'StackGoFPT') {
                                            iconName = focused ? ICON.Walk : ICON.Walk;
                                            label = 'Go FPT'
                                        } else if (route.name === 'StackNews') {
                                            iconName = focused ? ICON.NotificationFocus : ICON.Notification;
                                            label = 'Tin tức'
                                        }
                                        else if (route.name === 'StackProfile') {
                                            iconName = focused ? ICON.ProfileFocus : ICON.Profile;
                                            label = 'Hồ sơ'
                                        }
                                        // You can return any component that you like here!
                                        return <View style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 55,
                                        }}>

                                            <Animatable.View
                                                animation="zoomIn"
                                                duration={2000}>
                                                <Image source={iconName}
                                                    style={{
                                                        width: focused ? 24 : 20,
                                                        height: focused ? 24 : 20,

                                                        resizeMode: 'stretch',
                                                        tintColor: focused ? COLOR.focus : COLOR.notFocus,
                                                    }} />
                                            </Animatable.View>
                                            <Text style={{
                                                fontSize: focused ? 10 : 0,
                                                fontWeight: focused ? "600" : "100",
                                                marginTop: 4,
                                                color: focused ? COLOR.focus : COLOR.notFocus,

                                            }}>{label}</Text>
                                        </View>;
                                    },

                                    tabBarHideOnKeyboard: true,
                                    headerShown: false,
                                    tabBarShowLabel: false,
                                    tabBarStyle: {
                                        height: 60,
                                        position: 'absolute',
                                        backgroundColor: COLOR.background,


                                    },
                                })}
                        >
                            <Tab.Screen name="StackHome" component={StackHome} />
                            <Tab.Screen name="StackSchedule" component={StackSchedule} />
                            <Tab.Screen name="StackGoFPT" component={StackGoFPT} />
                            <Tab.Screen name="StackNews" component={StackNews} />
                            <Tab.Screen name="StackProfile" component={StackProfile} />
                        </Tab.Navigator>)
                        :
                        (<Tab.Navigator
                            initialRouteName="StackHome"
                            screenOptions={
                                ({ route }) => ({
                                    tabBarIcon: ({ focused, label, size }) => {
                                        let iconName = focused
                                        if (route.name === 'StackHome') {
                                            iconName = focused ? ICON.HomeFocus : ICON.Home
                                            label = 'Trang chủ'
                                        } else if (route.name === 'StackSchedule') {
                                            iconName = focused ? ICON.ScheduleFocus : ICON.Schedule;
                                            label = 'Lịch'
                                        } else if (route.name === 'StackGoFPT') {
                                            iconName = focused ? ICON.Walk : ICON.Walk;
                                            label = 'Go FPT'
                                        } else if (route.name === 'StackNews') {
                                            iconName = focused ? ICON.NotificationFocus : ICON.Notification;
                                            label = 'Tin tức'
                                        }
                                        else if (route.name === 'StackProfile') {
                                            iconName = focused ? ICON.ProfileFocus : ICON.Profile;
                                            label = 'Hồ sơ'
                                        }
                                        // You can return any component that you like here!
                                        return <View style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 60
                                        }}>

                                            <Animatable.View
                                                animation="zoomIn"
                                                duration={2000}>
                                                <Image source={iconName}
                                                    style={{
                                                        width: focused ? 28 : 24,
                                                        height: focused ? 28 : 24,

                                                        resizeMode: 'stretch',
                                                        tintColor: focused ? COLOR.focus : COLOR.notFocus,
                                                    }} />
                                            </Animatable.View>
                                            <Text style={{
                                                fontSize: focused ? 10 : 0,
                                                fontWeight: focused ? "600" : "100",
                                                marginTop: 4,
                                                color: focused ? COLOR.focus : COLOR.notFocus,

                                            }}>{label}</Text>
                                        </View>;
                                    },

                                    tabBarHideOnKeyboard: true,
                                    headerShown: false,
                                    tabBarShowLabel: false,
                                    tabBarStyle: {
                                        height: 70,
                                        position: 'absolute',
                                        backgroundColor: COLOR.background,


                                    },
                                })}
                        >
                            <Tab.Screen name="StackHome" component={StackHome} />
                            <Tab.Screen name="StackSchedule" component={StackSchedule} />
                            <Tab.Screen name="StackGoFPT" component={StackGoFPT} />
                            <Tab.Screen name="StackNews" component={StackNews} />
                            <Tab.Screen name="StackProfile" component={StackProfile} />
                        </Tab.Navigator>)
            }
        </>
    )
}
const BottomTabNav = () => {
    // const [isLogin, setfirst] = useState(true)
    const { isLogin, infoUser } = useContext(AppContext);
    // console.log("isLogin Bottom Tabs=================>", isLogin);
    // console.log("infoUser Bottom Tabs=========>", infoUser);
    return (
        <>
            {
                isLogin == false ? <StackBegin /> : <Main />
            }
        </>)
}
//ADMIN
export default BottomTabNav

const styles = StyleSheet.create({})