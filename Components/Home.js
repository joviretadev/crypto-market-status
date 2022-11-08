import { Text, View, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import CoinItem from './CoinItem'

const BGColor = "#000000"

export default function Home() {

    const [coins, setCoins] = useState([])

    const loadData = async() => {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc");
        const data = await response.json()
        setCoins(data)
        console.log(data);
    }
    useEffect(() =>{
       loadData();
    }, [])
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
            
            <FlatList
            data = {coins}
            renderItem={({item}) =>{
                return <CoinItem coin={item}/>
            }}
            />
           
        </View>
    );
}