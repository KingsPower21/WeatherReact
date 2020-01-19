import React, {Component} from 'react';
import { FlatList } from 'react-native';
import Forecast from '../modules/Forecast';

export default class ForecastScreen extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      error:''
    };
  }

  componentDidMount(){
    this.getLocation();
  }

  getLocation(){

    navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState(
              (prevState) => ({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }), () => { this.getForecast(); }
          );
        },
        (error) => this.setState({ forecast: error.message }),
        { enableHighAccuracy: true}
    );
  }

  getForecast(){

    let url = 'https://api.openweathermap.org/data/2.5/forecast?lat='
        + this.state.latitude + '&lon=' + this.state.longitude +
        '&APPID=c16561a4273e94948971b4fde7dc892c';

    fetch(url)
        .then(response => response.json())
        .then(data => {
          this.setState((prevState, props) => ({
            forecast: data
          }));
        })
  }

  render() {
    return (
        <FlatList data={this.state.forecast.list} style={{marginTop:20}}
                  keyExtractor={item => item.dt_txt}
                  renderItem={({item}) => <Forecast detail={item} location={this.state.forecast.city.name} />} />
    );
  }
}

ForecastScreen.navigationOptions = {
    title: 'Forecast',
};
