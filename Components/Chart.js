import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const Chart = ({name, symbol,image,current_price,price_change_percentage_24h}) => {
  //console.log(image);
  //console.log(symbol);
  return (
    <View style={styles.container}>
      <Image style={styles.image}source={{uri: image}}/>
      <Text>{name}</Text>
      <Text style={styles.symbol}>{symbol}</Text>
      <Text style={styles.hours}>24h</Text>
      <View>
        <Text>{current_price.toLocaleString('en-US', {currency: 'USD'})} US$</Text>
        <Text style={[styles.coinsPrice24,
                price_change_percentage_24h > 0
                ? styles.price24Positive
                : styles.price24Negative]}>
                {price_change_percentage_24h.toFixed(2)}%
        </Text>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 20,
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
  coinsPrice24:{
    textAlign: 'right'
  },
  price24Positive:{
      color: '#53c736',
  },
  price24Negative:{
      color: '#d40d0d',
  },
});

export default Chart