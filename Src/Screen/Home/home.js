import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Setor')}
                style={styles.boxFitur}>
                <Text>setor sampah</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Penjemputan')}
                style={styles.boxFitur}>
                <Text>penjemputan sampah</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Tabungan')}
                style={styles.boxFitur}>
                <Text>buku tabungan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('TarikSaldo')}
                style={styles.boxFitur}>
                <Text>penaria saldo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SetokSampah')}
                style={styles.boxFitur}>
                <Text>Sampah</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('HistorySaldo')}
                style={styles.boxFitur}>
                <Text>Riwanyat saldo</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home;
