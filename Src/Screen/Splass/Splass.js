import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, ActivityIndicator, Image} from 'react-native';
import styles from '../../Components/Splass/boxSplass';

export class Splass extends Component {
  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem('token').then((token) => {
        if (token != null) {
          AsyncStorage.getItem('role').then((role) => {
            if (role == '1') {
              console.log(' nasamah ');
              this.props.navigation.replace('Rumah', {screen: 'HomeOne'});
            } else if (role == '2') {
              console.log(' pengurus 1 ');
              this.props.navigation.replace('Rumah', {screen: 'Home1'});
            } else {
              console.log(' pengurus 2 ');
              this.props.navigation.replace('Rumah', {screen: 'Home2'});
            }
          });
        } else {
          console.log('no token');
          this.props.navigation.replace('Splash');
        }
      });
    }, 5000);
  }

  render() {
    return (
      <View style={styles.utama}>
        <View>
          <Image
            source={require('../../Assets/fotoLogo/recycle-icon-5.jpg')}
            style={styles.gambarLogo}
          />
        </View>
        <View>
          <Text style={styles.teksView}> sammpaH </Text>
        </View>
      </View>
    );
  }
}

export default Splass;
