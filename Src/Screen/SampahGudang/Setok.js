import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, Image, ActivityIndicator, ScrollView} from 'react-native';
import styles from '../../Components/GudangSampah/Gudang';
export class StokP2 extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      loading: '',
      dataSampah: [],
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        this.sampah();
      } else {
        console.log('tidak ada token');
      }
    });
  }
  sampah() {
    const url = 'https://sammpah.herokuapp.com/api/getSampah';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({dataSampah: resJson.data, loading: false});
        console.log(resJson.data);
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  }
  jenisSampah(jenis_sampah) {
    if (jenis_sampah == 1) {
      render(
        <View>
          <Text> Sampah Plastik</Text>
        </View>,
      );
    } else if (jenis_sampah == 2) {
      render(
        <View>
          <Text> Sampah </Text>
        </View>,
      );
    }
  }
  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headers}>
          <Text style={{fontSize: 35, color: 'white'}}> Sampah Di Gudang </Text>
        </View>
        <View>
          <ScrollView>
            {this.state.dataSampah == '' ? (
              <View>
                <ActivityIndicator color="red" size={30} />
              </View>
            ) : (
              <View>
                <Txxt> Ada sampah di sini</Txxt>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default StokP2;
