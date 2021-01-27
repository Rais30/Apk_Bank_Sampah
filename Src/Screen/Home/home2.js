import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import styles from '../../Components/Home/BoxHome';

export class Home2 extends Component {
  constructor() {
    super();
    this.state = {
      sampah: [],
      name: '',
      email: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('name');
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.Gudang(token);
      } else {
        console.log('token, name, eamil tidak ada');
      }
    });
  }
  Gudang(token) {
    console.log('get sampah');
    const url = 'https://sammpah.herokuapp.com/api/getSampah';
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        this.setState({sampah: resJson.data, loading: false});
        console.log(resJson.data);
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  }

  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headers}>
          <TouchableOpacity
            onPress={() => this.props.navigation.openDrawer()}
            style={{...styles.boxgambar, marginRight: '68%'}}>
            <Image
              source={require('../../Assets/fotoLogo/recycle-icon-5.jpg')}
              style={styles.gambar}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.head}>
            <View style={styles.dataKu}>
              <View>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                  Pengurus 2
                </Text>
              </View>
              <View>
                <Text style={{fontSize: 18}}>pengurus2@gmail.com</Text>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <ScrollView horizontal={true}>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('JualSampah')}
                  style={styles.boxFitur}>
                  <Image
                    source={require('../../Assets/fotoLogo/icons8-sell-100.png')}
                    style={{width: 65, height: 65}}
                  />
                </TouchableOpacity>
                <View style={{marginBottom: 5}}>
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Jual Sampah
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={styles.tittel}>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}>
              Gudang SampaH
            </Text>
          </View>
          <View>
            {this.state.sampah == null ? (
              <View style={{alignSelf: 'center'}}>
                <ActivityIndicator size={40} />
              </View>
            ) : (
              <View style={styles.mapku}>
                {this.state.sampah.map((val, key) => {
                  return (
                    <View>
                      <View key={key}>
                        <View>
                          <Image
                            source={{uri: val.jenis.image}}
                            style={{width: 150, height: 150}}
                          />
                        </View>
                        <View
                          style={{
                            padding: 5,
                            flexDirection: 'row',
                          }}>
                          <Image
                            source={require('../../Assets/fotoLogo/icons8-trash-100.png')}
                            style={{height: 40, width: 40}}
                          />
                          <View style={{justifyContent: 'center'}}>
                            <Text style={{fontSize: 15}}>
                              {val.jenis.jenis_sampah}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            padding: 5,
                            flexDirection: 'row',
                          }}>
                          <Image
                            source={require('../../Assets/fotoLogo/icons8-note-100.png')}
                            style={{height: 40, width: 40}}
                          />
                          <View style={{justifyContent: 'center'}}>
                            <Text style={{fontSize: 15}}>{val.berat} /Kg</Text>
                          </View>
                        </View>
                        <View
                          style={{
                            padding: 5,
                            flexDirection: 'row',
                          }}>
                          <Image
                            source={require('../../Assets/fotoLogo/icons8-note-100.png')}
                            style={{height: 40, width: 40}}
                          />
                          <View style={{justifyContent: 'center'}}>
                            <Text style={{fontSize: 15}}>
                              Rp.{val.jenis.harga} ,-
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home2;
