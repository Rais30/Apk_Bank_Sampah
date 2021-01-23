import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableNativeFeedback,
  ToastAndroid,
} from 'react-native';
import styles from '../../Components/BoxSetor/boxSetor';

export default class SetorSampah extends Component {
  constructor() {
    super();
    this.state = {
      data: [],

      token: '',
      loading: false,
      berat: '',
      jenis_sampah: '',
      idSampah: '',
      hargaSampah: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token != null) {
          this.setState({token: token});
          this.JenisSampah(token);
        } else {
          console.log('ridak ada token');
        }
      })
      .catch((err) => console.log(err));
  }
  JenisSampah(token) {
    console.log('get jenis sampah');
    const url = 'https://sammpah.herokuapp.com/api/getJenis';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer${token}`,
      },
    })
      .then((res) => res.json())
      .then((resjson) => {
        this.setState({data: resjson.data, loading: false});
        console.log('ini jenis sampah', resjson.data);
      })
      .catch((error) => {
        console.log('ini ada error', error);
        this.setState({loading: false});
      });
  }
  DataSampah() {
    return (
      <View>
        {this.state.jenis_sampah == '' ? (
          <View></View>
        ) : (
          <View style={{alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'white',
                width: '90%',
                padding: 10,
                elevation: 5,
                borderRadius: 5,
                marginBottom: 5,
              }}>
              <Text style={{fontSize: 15}}>
                Jenis Sampah : {this.state.jenis_sampah}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                width: '90%',
                padding: 10,
                elevation: 5,
                borderRadius: 5,
                marginBottom: 5,
              }}>
              <Text style={{fontSize: 15}}>
                Harga Sampah /kg : {this.state.hargaSampah}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
  SetorPenjemputan() {
    const {idSampah, berat} = this.state;
    const data = {
      jenis_sampah: idSampah,
      berat: berat,
    };
    const url = `https://sammpah.herokuapp.com/api/setor`;
    this.setState({loading: true});
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log('ini penyetoran sampah ', resjson);
        const {message} = resjson;
        if (message == 'Sampah berhasil disetor') {
          ToastAndroid.show(
            ' Berhasil DiSetor',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
            // console.log(resJson),
            this.props.navigation.navigate('Home1'),
          );
          this.setState({loading: false});
        } else {
          console.log(error);
          this.setState({loading: false});
        }
      })
      .catch((err) => console.log(err), this.setState({loading: false}));
  }
  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headers}>
          <Text style={{fontSize: 30, color: 'white'}}> Setor Sampah </Text>
        </View>
        <View>
          <ScrollView>
            <View style={{flex: 1}}>
              <View
                style={{
                  width: '90%',
                  backgroundColor: 'white',
                  alignItems: 'center',
                  margin: 5,
                  alignSelf: 'center',
                }}>
                <Text style={{fontSize: 30}}> Jenis Sampah </Text>
              </View>
              {this.state.data == '' ? (
                <View>
                  <ActivityIndicator size={30} color="red" />
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    // alignItems: 'center',
                  }}>
                  {this.state.data.map((val, key) => {
                    return (
                      <TouchableNativeFeedback
                        onPress={() =>
                          this.setState({
                            jenis_sampah: val.jenis_sampah,
                            hargaSampah: val.harga,
                            idSampah: val.id,
                          })
                        }>
                        <View key={key}>
                          <View
                            style={{
                              margin: 5,
                              padding: 5,
                              backgroundColor: 'white',
                              elevation: 5,
                              borderRadius: 10,
                            }}>
                            <Image
                              source={{uri: val.image}}
                              style={{width: 76, height: 76}}
                            />
                          </View>
                        </View>
                      </TouchableNativeFeedback>
                    );
                  })}
                </View>
              )}
              <View>{this.DataSampah()}</View>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '90%',
                  padding: 4,
                  elevation: 5,
                  borderRadius: 5,
                  margin: 5,
                  alignSelf: 'center',
                }}>
                <TextInput
                  placeholder={'Berat Sampah'}
                  keyboardType="number-pad"
                  onChangeText={(text) => this.setState({berat: text})}
                />
              </View>
              <TouchableNativeFeedback onPress={() => this.SetorPenjemputan()}>
                <View
                  style={{
                    marginVertical: 50,
                    alignSelf: 'center',
                    padding: 5,
                    backgroundColor: '#00c853',
                    borderRadius: 7,
                  }}>
                  <Text style={{fontSize: 25, color: 'white'}}>
                    Setor Sampah
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}
