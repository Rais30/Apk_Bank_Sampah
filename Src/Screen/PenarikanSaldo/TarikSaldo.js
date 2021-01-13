import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicatorBase,
  ScrollView,
} from 'react-native';
import styles from '../../Components/Tabungan/BoxTabungan';

export class TarikSaldo extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      loading: false,
      nama: '',
      rekening: '',
      nominal: '',
    };
  }

  render() {
    return (
      <View style={styles.Utama}>
        <View style={styles.headers}>
          <Text style={{fontSize: 30, color: 'white'}}> Penarikan Saldo </Text>
        </View>
      </View>
    );
  }
}

export default TarikSaldo;
