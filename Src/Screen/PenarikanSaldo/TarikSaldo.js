import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableNativeFeedback,
  ToastAndroid,
  Modal,
} from 'react-native';
import styles from '../../Components/Tabungan/BoxTabungan';

export class TarikSaldo extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      loading: false,
      nominal: '',
      rekening: '',
      nominal: '',
      modal: false,
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
      } else {
        console.log(' token tidak ada ');
      }
    });
  }

  penarikan() {
    const {nama, rekening, nominal} = this.state;
    const data = {
      nama: nama,
      rekening: rekening,
      nominal: nominal,
    };
    this.setState({loading: true});
    const url = 'https://sammpah.herokuapp.com/api/tarikSaldo';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        const {status, message} = resJson;
        if (status == 'Success') {
          ToastAndroid.show(
            ' Berhasil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            console.log(resJson),
            this.props.navigation.replace('Rumah', {screen: 'Profil'}),
          );
          this.setState({loading: false});
          // this.props.navigation.navigate('Home');
        } else if (message == 'Saldo Anda Tidak Cukup') {
          this.setState({loading: false});
          this.setState({modal: true});
          return (
            <Modal
              style={styles.modal}
              transparent={true}
              animationType="slide"
              visible={this.state.modal}
              onRequestClose={() => this.setState({modal: false})}>
              <Text style={{fontSize: 20}}>
                Mohon aaf Periksa Kembali Saldo Anda
              </Text>
            </Modal>
          );
        } else {
          this.setState({loading: false});
          console.log('error');
          alert('error');
        }
      })
      .catch((error) => {
        this.setState({loading: false});
        console.log('error nya adalah ' + error);
      });
  }

  render() {
    return (
      <View style={styles.Utama}>
        <View style={styles.headers}>
          <Text style={{fontSize: 30, color: 'white'}}> Penarikan Saldo </Text>
        </View>
        <ScrollView>
          <View style={styles.BoxInput}>
            <View style={styles.Input}>
              <TextInput
                placeholder="Nama"
                onChangeText={(teks) => this.setState({nama: teks})}
              />
            </View>
            <View style={styles.Input}>
              <TextInput
                placeholder="Rekening"
                onChangeText={(teks) => this.setState({rekening: teks})}
              />
            </View>
            <View style={styles.Input}>
              <TextInput
                placeholder="Nominal"
                keyboardType="number-pad"
                onChangeText={(teks) => this.setState({nominal: teks})}
              />
            </View>
          </View>
          <TouchableNativeFeedback onPress={() => this.penarikan()}>
            <View style={styles.tombol}>
              {this.state.loading ? (
                <ActivityIndicator size={25} color="red" />
              ) : (
                <Text style={{fontSize: 30, color: 'white'}}> Tarik </Text>
              )}
            </View>
          </TouchableNativeFeedback>
        </ScrollView>
      </View>
    );
  }
}

export default TarikSaldo;
