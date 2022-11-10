import react from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native'

const CoinItem = ({coin, onPress}) => {
    return ( 
        <SafeAreaView>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.container}>
                    <View style={styles.coinsContainer}>
                        <View style={styles.nameContainer}>
                            <Image style={styles.coinsImage}source={{uri: coin.image}}/>
                            <Text style={styles.coinsName}>{coin.name}</Text>
                            <Text style={styles.coinsSymbol}>{coin.symbol}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.coinsPrice}>{coin.current_price.toLocaleString('en-US', {currency: 'USD'})} US$</Text>
                            <Text style={[styles.coinsPrice24,
                                coin.price_change_percentage_24h > 0
                                    ? styles.price24Positive
                                    : styles.price24Negative]}>
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        marginTop: 20,
    },
    coinsContainer:{
        paddinngTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameContainer:{
        flexDirection: 'row',
        marginRight: 5,
    },
    coinsImage:{
        width: 30,
        height: 30,
        marginRight: 10,
    },
    coinsName: {
        color: '#ffff',
        fontWeight: "bold",
        marginTop: 5,
        marginRight: 10,
    },
    coinsSymbol: {
        color: '#ffff',
        textTransform: 'uppercase',
        marginTop: 5,
    },
    coinsPrice: {
        color: '#ffff',
        textAlign: 'right'
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

export default CoinItem