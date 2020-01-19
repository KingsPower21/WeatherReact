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
            <Card containerStyle={styles.card}>
                <Text style={styles.notes}>{this.props.location}</Text>

                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Image style={{width:100, height:100}} source={{uri:"https://openweathermap.org/img/w/" + this.props.detail.weather[0].icon + ".png"}} />
                    <Text style={styles.time}>{time}</Text>
                </View>

                <Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />

                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.notes}>{this.props.detail.weather[0].description}</Text>
                    <Text style={styles.notes}>Temperature: {Math.round( (this.props.detail.main.temp)* 9/5 ) -459 }&#8457;</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={styles.notes}>Low of: {Math.round( (this.props.detail.main.temp_min)* 9/5 ) -459 }&#8457;</Text>
                    <Text style={styles.notes}>High of: {Math.round( (this.props.detail.main.temp_max)* 9/5 ) -459 }&#8457;</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={styles.notes}>Wind Speeds: {this.props.detail.wind.speed} MPH</Text>
                </View>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:'rgba(233, 127, 21, 1)',
        borderWidth:0,
        borderRadius:20
    },
    time:{
        fontSize:30,
        color:'#fff'
    },
    notes: {
        fontSize: 18,
        color:'#fff',
        textTransform:'capitalize'
    }
});
