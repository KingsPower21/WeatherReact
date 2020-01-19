import React from 'react';
import {Platform, ScrollView, StyleSheet, Text, View,} from 'react-native';
import {Ionicons} from '@expo/vector-icons';



export default function HomeScreen() {
  return (
    <View style={styles.container}>
        <Ionicons style={{color: 'rgba(233, 127, 21, 1)', textAlign: 'center', fontSize: 200,}} size={24}
                  name={((Platform.OS === 'ios') ? 'ios-thunderstorm' : 'md-thunderstorm')}/>
                  <Text style={{textAlign: 'center', fontSize: 50, fontFamily: 'monospace',}}>React Weather</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },


});
