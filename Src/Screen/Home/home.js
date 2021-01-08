import React, {Component} from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../Components/Home/BoxHome';

export class Home extends Component {
  render() {
    return (
      <View style={styles.utama}>
        <ScrollView style={{backgroundColor: '#00c853'}}>
          <View style={styles.head}>
            <View style={styles.boxgambar}>
              <Image
                source={require('../../Assets/fotoLogo/recycle-icon-5.jpg')}
                style={styles.gambar}
              />
            </View>
            <View style={styles.dataKu}>
              <View>
                <Text style={{fontSize: 25}}>Rais Azaria Aryguna</Text>
              </View>
              <View>
                <Text style={{fontSize: 18}}>raisazaria30@gmail.com</Text>
              </View>
            </View>
          </View>
          <View style={styles.box}>
            <View style={styles.boxsaldo}>
              <View style={styles.saldo}>
                <View>
                  <Text
                    style={{fontSize: 12, color: 'white', fontWeight: 'bold'}}>
                    {' '}
                    Saldo{' '}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="payments" size={30} />
                  <View>
                    <Text style={{fontSize: 18}}> Rp. 350.000 </Text>
                  </View>
                </View>
              </View>
              <View style={{...styles.saldo, borderLeftWidth: 2}}>
                <View>
                  <Text
                    style={{fontSize: 12, color: 'white', fontWeight: 'bold'}}>
                    {' '}
                    Saldo{' '}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="payments" size={30} />
                  <View>
                    <Text style={{fontSize: 18}}> Rp. 350.000 </Text>
                  </View>
                </View>
              </View>
            </View>
            <ScrollView horizontal={true}>
              <View style={styles.boxFitur}>
                <Text>setor sampah</Text>
              </View>
              <View style={styles.boxFitur}>
                <Text>penjemputan sampah</Text>
              </View>
              <View style={styles.boxFitur}>
                <Text>buku tabungan</Text>
              </View>
              <View style={styles.boxFitur}>
                <Text>penaria saldo</Text>
              </View>
              <View style={styles.boxFitur}>
                <Text>penaria saldo</Text>
              </View>
              <View style={styles.boxFitur}>
                <Text>penaria saldo</Text>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home;
