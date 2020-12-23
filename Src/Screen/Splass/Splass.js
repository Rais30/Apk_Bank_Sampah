import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, ActivityIndicator, Image} from 'react-native';
import styles from '../../Components/Splass/boxSplass';

export class Splass extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
    };
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
      } else {
        console.log('no token');
      }
    });
  }
  componentDidMount() {
    setTimeout(() => {
      if (this.state.token != '') {
        this.props.navigation.replace('Rumah');
      } else {
        this.props.navigation.replace('Splash');
      }
    }, 3000);
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
        <View>
          <ActivityIndicator color="#52D017" size={40} />
        </View>
      </View>
    );
  }
}

export default Splass;
