import React, {Component} from 'react';
import { StyleSheet, View, Image, } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';


export default class Forecast extends Component {

    render() {
        let time;
        const date = new Date(this.props.detail.dt * 1000);
        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        time = hours + ':' + minutes;

        return (
            <Card containerStyle={styles.box}>
                <Text style={styles.location}>{this.props.location}</Text>

                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Image style={{width:100, height:100}} source={{uri:"https://openweathermap.org/img/w/" + this.props.detail.weather[0].icon + ".png"}} />
                    <Text style={styles.time}>Hour - {time}</Text>
                </View>

                <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />

                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.weather}>{this.props.detail.weather[0].description}</Text>
                    <Text style={styles.weather}>Temperature: {Math.round( (this.props.detail.main.temp)* 9/5 ) -459 }&#8457;</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.weather}>Low of: {Math.round( (this.props.detail.main.temp_min)* 9/5 ) -459 }&#8457;</Text>
                    <Text style={styles.weather}>High of: {Math.round( (this.props.detail.main.temp_max)* 9/5 ) -459 }&#8457;</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={styles.weather}>Wind Speeds: {this.props.detail.wind.speed} MPH</Text>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    box:{
        backgroundColor:'rgba(233, 127, 21, 1)',
        borderWidth:0,
        borderRadius:20
    },
    time:{
        fontSize:30,
        color:'#fff'
    },
    weather: {
        fontSize: 18,
        color:'#fff',
        textTransform:'capitalize'
    },
    location: {
        fontSize: 30,
        color: '#fff',
        textTransform: 'capitalize',
    }
});
