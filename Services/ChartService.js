import axios from 'axios';
import moment from 'moment';

const formatSparkline = (numbers) => {
    const sevenDays = moment().subtract(7, 'days').unix();
    let formattedSparkline = numbers.map((item, index) => {
        return {
            x: sevenDays + (index + 1) * 3600,
            y: item,
        }
    })

    return formattedSparkline;
}

const formatCoinsdata = (data) => {
    let formattedData = [];

    data.forEach(item => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)
        const formattedItem = {
            ...item,
            sparkline_in_7d: {
                price: formattedSparkline
            }
        }

        formattedData.push(formattedItem);
    });

    return formattedData;
}

export const getCoinsData = async () => {
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d");
        const data = response.data;
        const formatResponse = formatCoinsdata(data);
        return formatResponse;
    } catch (e) {
        console.log(e.message);
    }
}