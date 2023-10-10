import { StyleSheet, Text, View, Image, } from 'react-native'
import React, { useState, useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLOR } from '../theme/color'
import { ICON } from '../theme/appIcon'
import * as Animatable from 'react-native-animatable';
import { AppContext } from "../constants/AppContext";
import Begin from '../screens/Begin'
import Cart from '../screens/Cart'
import Guide from '../screens/Guide'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Profile from '../screens/Profile'
import Register from '../screens/Register'
import Save from '../screens/Save'
import Detail from '../screens/Detail'



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackBegin = () => {
    return (
        <Stack.Navigator initialRouteName="Guide" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Begin" component={Begin} />
            <Stack.Screen name="Guide" component={Guide} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="BottomTabNav" component={BottomTabNav} />

        </Stack.Navigator>
    )
}
const StackHome = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Detail" component={Detail} />

        </Stack.Navigator>
    )
}
const StackProfile = () => {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={Profile} />

        </Stack.Navigator>
    )
}

const StackSave = () => {
    return (
        <Stack.Navigator initialRouteName="Save" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Save" component={Save} />

        </Stack.Navigator>
    )
}
const StackCart = () => {
    return (
        <Stack.Navigator initialRouteName="Cart" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Cart" component={Cart} />

        </Stack.Navigator>
    )
}
const Main = () => {
    const { showBottom, setShowBottom } = useContext(AppContext)
    return (
        <>
            {
                showBottom ? (<Tab.Navigator
                    initialRouteName="StackHome"
                    screenOptions={
                        ({ route }) => ({
                            tabBarIcon: ({ focused, label, size }) => {
                                let iconName = focused
                                if (route.name === 'StackHome') {
                                    iconName = focused ? ICON.HomeFocus : ICON.Home
                                    label = 'Home'
                                } else if (route.name === 'StackSave') {
                                    iconName = focused ? ICON.SaveFocus : ICON.Save;
                                    label = 'Save'
                                } else if (route.name === 'StackCart') {
                                    iconName = focused ? ICON.CartFocus : ICON.Cart;
                                    label = 'Cart'
                                }
                                else if (route.name === 'StackProfile') {
                                    iconName = focused ? ICON.ProfileFocus : ICON.Profile;
                                    label = 'Profile'
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
                    <Tab.Screen name="StackSave" component={StackSave} />
                    <Tab.Screen name="StackCart" component={StackCart} />
                    <Tab.Screen name="StackProfile" component={StackProfile} />
                </Tab.Navigator>) : 
                (
                    <>
                    <Detail/>
                    </>
                )
            }

        </>
    )
}
const BottomTabNav = () => {
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

export default BottomTabNav

const styles = StyleSheet.create({})