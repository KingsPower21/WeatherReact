import React from 'react';
import {StyleSheet, View, ImageBackground, Text, KeyboardAvoidingView, Platform,
  ActivityIndicator, StatusBar,} from 'react-native';
import { fetchOpenWeatherCity, fetchOpenWeatherGPS } from '../Utilities/api';
import WeatherImages from "../Utilities/WeatherImages";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import SearchInput from '../modules/SearchInput';
import {Ionicons} from '@expo/vector-icons';

export default class WeatherScreen extends React.Component {
  static navigationOptions = {
    title: 'Weather',
    textAlign: 'center',
  };

  state = {
    loading: false,
    error: false,
    location: '',
    temperature: 0,
    weather: '',
  };

  componentDidMount() {
    this._isMounted = true;
    this.handleGetLocation();
  }

  handleGetLocation = async () => {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({error: true});
    }
    const {coords} = await Location.getCurrentPositionAsync({});
    this.handleUpdateGPS(coords);
  };


  handleUpdateLocation = async city => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      try {
        const { location, weather, temperature } = await fetchOpenWeatherCity(city);

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  handleUpdateGPS = async coords => {
    if (!coords) return;
    this.setState({ loading: true }, async () => {
      try {
        const { location, weather, temperature } = await fetchOpenWeatherGPS(coords);

        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };

  render() {
    const { loading, error, location, weather, temperature } = this.state;

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <StatusBar barStyle="light-content" />
          <ImageBackground
              source={WeatherImages(weather)}
              style={styles.imageContainer}
              imageStyle={styles.image}
          >
            <View style={styles.detailsContainer}>
              <ActivityIndicator animating={loading} color="white" size="large" />

              {!loading && (
                  <View>
                    {error && (
                        <Text style={[styles.smallText, styles.textStyle]}>
                          Could not load weather. Please try a different city.
                        </Text>
                    )}

                    {!error && (
                        <View>
                          <Text style={[styles.largeText, styles.textStyle]}>
                            {location}
                          </Text>
                          <Text style={[styles.smallText, styles.textStyle]}>
                            {weather}
                          </Text>
                          <Text style={[styles.largeText, styles.textStyle]}>
                            {`${Math.round(temperature)}`+ " \u2109"}
                          </Text>
                        </View>
                    )}

                    <SearchInput
                        placeholder= {"Enter a city name"}
                        onSubmit={this.handleUpdateLocation}
                    />
                  </View>
              )}
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
    );
  }
}

WeatherScreen.navigationOptions = {
  title: 'Weather',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: 'center',
    color: 'white',
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});
