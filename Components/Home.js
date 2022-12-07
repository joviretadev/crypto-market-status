import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import CoinItem from './CoinItem'
import BottomSheet from '@gorhom/bottom-sheet';
import Chart from './Chart.js'
import { getCoinsData } from '../Services/ChartService';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BGColor = "#000000"

export default function Home() {

    const [coins, setCoins] = useState([])

    const loadData = async() => {
      //https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc");
        const data = await response.json()
        setCoins(data)
        //console.log(data);
    }
    useEffect(() =>{
       loadData();
    }, [])

  //ref a BottomSheetModal
  const bottomSheetRef = useRef(null);
  //variables BottomSheetModal
  const snapPoints = useMemo(() => ['70%'], []);
  //function open modal selected coin
  const openModal = (item) => {
    setDataCoinSelected(item);
    bottomSheetRef.current.snapToIndex(0);
  }

  //data for Chart
  const [data, setData] = useState([]);
  const [dataCoinSelected, setDataCoinSelected] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getCoinsData();
      setData(marketData);
    }

    fetchMarketData();
  }, [])

    return (
        
            <SafeAreaView style={styles.container}>
              <GestureHandlerRootView style={{flex: 1}}>  
                <StatusBar style='light'/>

                <FlatList
                  data = {data}
                  renderItem={({item}) =>{
                      return <CoinItem
                      coin={item}
                      onPress={() => openModal(item)}/>
                  }}
                />
                
                <BottomSheet
                  ref={bottomSheetRef}
                  index={-1}
                  snapPoints={snapPoints}
                  enablePanDownToClose={true}
                >
                  
                  <View style={styles.contentContainer}>
                    { dataCoinSelected ? (
                      <Chart
                      name={dataCoinSelected.name}
                      symbol={dataCoinSelected.symbol}
                      image={dataCoinSelected.image}
                      current_price={dataCoinSelected.current_price}
                      price_change_percentage_24h={dataCoinSelected.price_change_percentage_24h}
                      sparkline={dataCoinSelected.sparkline_in_7d.price}
                      />
                      
                      )
                      : null
                    }
                  </View>
                  
                </BottomSheet>
              </GestureHandlerRootView>
            </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: BGColor,
    paddingTop: Platform.OS === 'android' ? 35 : 0
  },
  
});
