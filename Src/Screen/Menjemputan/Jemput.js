import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/Tabungan/BoxTabungan';

export class Jemput extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      data: [],
      loading: false,
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        this.Sampah(token);
      } else {
        console.log('tidak ada token');
      }
    });
  }
  Sampah(token) {
    console.log('ini sampah');
    const url = 'https://sammpah.herokuapp.com/api/penjemputan/daftar';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({data: resJson.data});
        console.log(this.state.data);
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  }
  statusBarang(status, id, user_id) {
    console.log(user_id);
    if (status == 0) {
      return (
        <View>
          <Text>Menunggu Penjemputan</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{...styles.tomKonfrim, backgroundColor: 'red'}}>
              <TouchableNativeFeedback onPress={() => this.Penolakan(id)}>
                <Text style={{fontSize: 30, color: 'white'}}> Tolak</Text>
              </TouchableNativeFeedback>
            </View>
            <View style={{...styles.tomKonfrim, backgroundColor: 'blue'}}>
              <TouchableNativeFeedback onPress={() => this.Konfir(id)}>
                <Text style={{fontSize: 27, color: 'white'}}> Terima </Text>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      );
    } else if (status == 1) {
      return (
        <View>
          <Text> Menunggu Penjemputan Anda </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{...styles.tomKonfrim, backgroundColor: 'blue'}}>
              <TouchableNativeFeedback
                onPress={() =>
                  this.props.navigation.navigate('Chat', {
                    user_id: user_id,
                    id: id,
                  })
                }>
                <Icon name="message" size={30} />
              </TouchableNativeFeedback>
            </View>
            <View style={{...styles.tomKonfrim, backgroundColor: 'blue'}}>
              <TouchableNativeFeedback
                onPress={() =>
                  this.props.navigation.navigate('SetorP1', {
                    user_id: user_id,
                    id: id,
                  })
                }>
                <Text style={{fontSize: 30, color: 'white'}}> Setor </Text>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      );
    } else if (status == 3) {
      return (
        <View>
          <Text style={{fontSize: 30, color: 'red'}}> Dibatalkan </Text>
        </View>
      );
    } else if (status == 2) {
      return (
        <View>
          <Text style={{fontSize: 30, color: 'blue'}}> Selesai </Text>
        </View>
      );
    }
  }
  Konfir = (id) => {
    const ID = id;
    const url = `https://sammpah.herokuapp.com/api/penjemputan/konfirmasi/${ID}`;
    this.setState({loading: true});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        console.log(this.state.data.status);
        this.Sampah();
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  };
  Penolakan = (id) => {
    const ID = id;
    const url = `https://sammpah.herokuapp.com/api/penjemputan/penolakan/${ID}`;
    this.setState({loading: true});
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        console.log(this.state.data.status);
        this.Sampah();
      })
      .catch((error) => {
        console.log('error Adalah ' + error);
        this.setState({loading: false});
      });
  };

  render() {
    return (
      <View style={styles.Utama}>
        <View style={styles.headers}>
          <Text style={{fontSize: 30, color: 'white'}}>
            Permintaan Penjemputan
          </Text>
        </View>
        <ScrollView>
          {this.state.data == null ? (
            <View>
              <ActivityIndicator size={30} color="red" />
              <View style={{alignSelf: 'center'}}>
                <Text> Periksa Jaringan Anda </Text>
              </View>
            </View>
          ) : (
            <View>
              {this.state.data.map((val, key) => {
                return (
                  <View key={key} style={styles.dataMap}>
                    <View>
                      <Text> Alamat Penjemputan = {val.address}</Text>
                    </View>
                    <View>
                      <Text> Keterangan = {val.description}</Text>
                    </View>
                    <View>
                      <Text> Permintaan = {val.created_at}</Text>
                    </View>
                    <View>
                      <Text> Nomer = {val.phone_number}</Text>
                    </View>
                    <View>
                      <Image
                        source={{uri: val.image}}
                        style={styles.imageSampah}
                      />
                    </View>
                    <View style={{margin: 10}}>
                      {this.statusBarang(val.status, val.id, val.user_id)}
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default Jemput;
