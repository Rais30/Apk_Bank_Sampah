import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, ScrollView, I} from 'react-native';
import styles from '../../Components/BoxSetor/boxSetor';

class SetorP1 extends Component {
  constructor() {
    super();
    this.state = {
      jenis_sampah: '',
      berat: '',
      token: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token != null) {
          this.setState({token: token});
        } else {
          console.log('ridak ada token');
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <View>
        <Text> Setor Sampah </Text>
      </View>
    );
  }
}

export default SetorP1;
