import { Text, View, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState, useMemo, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import CoinItem from './CoinItem'
import BottomSheet from '@gorhom/bottom-sheet';
import Chart from './Chart.js'

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

  //ref a BottomSheetModal
  const bottomSheetRef = useRef(null);
  //variables BottomSheetModal
  const snapPoints = useMemo(() => ['50%'], []);
  //function open
  const openModal = () => {
    bottomSheetRef.current.present();
  }

    return (
        
      <View style={styles.container}>

            <StatusBar style='light'/>

            <FlatList
              data = {coins}
              renderItem={({item}) =>{
                  return <CoinItem coin={item}/>
              }}
              onPress={() => openModal()}
            />

            <BottomSheet
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
            >
            <View style={styles.contentContainer}>
              <Chart/>
            </View>
         </BottomSheet>
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BGColor,
  },
});
