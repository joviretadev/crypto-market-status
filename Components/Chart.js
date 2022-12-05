import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import {ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';

export const {width: SIZE} = Dimensions.get('window');

const Chart = ({name, symbol,image,current_price,price_change_percentage_24h,sparkline}) => {

  const priceChangeColor = price_change_percentage_24h > 0 ? '#53c736' : '#d40d0d';
  //console.log(image);
  //console.log(symbol);

// get price when use the chart pointer dot
  const formatUSD = value => {
    'worklet';
    if(value === '') {
      return `$${current_price.toLocaleString('en-US', {currency: 'USD'})}`;
    }
    //format price 
    const formattedValue = `$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    return formattedValue;
  };

  return (
    <ChartPathProvider data = {{ points: sparkline, smoothingsStrategy: 'bezier'}}>
      <View style={styles.chartWrapper}>
        <View style={styles.container}>
              <Image style={styles.image}source={{uri: image}}/>
              <Text>{name}</Text>
              <Text style={styles.symbol}>{symbol}</Text>
              <Text style={styles.hours}>24h</Text>
            <View>
              {/*<Text style={styles.priceText}>{current_price.toLocaleString('en-US', {currency: 'USD'})} US$</Text>*/}
              <ChartYLabel
                format={formatUSD}
                style={styles.priceText}
              />
              <Text style={[styles.coinsPrice24,
                    {color: priceChangeColor}]}>
                    {price_change_percentage_24h.toFixed(2)}%
              </Text>
            </View>
      </View>
          
          <View style={styles.chart}>
            <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
            <ChartDot style={{ backgroundColor: 'black' }} />
          </View>
        </View>
    </ChartPathProvider>
    
  )
}

const styles = StyleSheet.create({
  chartWrapper:{
    marginVertical: 16,
  },
  container:{
    marginHorizontal: 16,
  },
  image:{
    width: 40,
    height: 40,
  },
  symbol:{
    textTransform: 'uppercase',
  },
  hours:{
    textAlign: 'right',
    color: '#bfbfbf',
  },
  priceText:{
    fontWeight: 'bold',
  },
  coinsPrice24:{
    textAlign: 'right'
  },
  chart:{
    marginTop: 7,
  },

});

export default Chart