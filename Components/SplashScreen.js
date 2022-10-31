import React, { useEffect} from 'react';
import  { Animated, Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import Logo from '../assets/LogoCryptoDownText.png';
const BGColor = "#000000"

export default function SplashScreen(props) {

        const edges = useSafeAreaInsets();

    return (
        
        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: BGColor,
        }}>
            <StatusBar style='light'/>
            <Animated.View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Image source={Logo}></Image>
            </Animated.View>
        </View>
        
    )
}