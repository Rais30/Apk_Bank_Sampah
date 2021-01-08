import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from '../../Components/Profil/boxProfil';

export class Profil extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      dataKu: '',
      loading: false,
    };
  }
  Profil() {
    const url = 'https://sammpah.herokuapp.com/api/profile';
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
        this.setState({dataKu: resJson.data, loading: false});
        console.log(resJson.data);
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  }

  roleId(role) {
    if (role == '1') {
      return <Text> Nasabah </Text>;
    } else if (role == '2') {
      return <Text> Pengurus 1 </Text>;
    } else if (role == '3') {
      return <Text> Pengurus 2 </Text>;
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        console.log(this.state.token);
        this.Profil();
      } else {
        console.log('token tidak ada');
      }
    });
  }
  LogOut() {
    AsyncStorage.clear();
    this.props.navigation.replace('Splas');
  }

  render() {
    return (
      <ScrollView style={styles.utama}>
        {this.state.dataKu == null ? (
          <ActivityIndicator size={50} color="red" />
        ) : (
          <View>
            <View style={styles.loading}>
              <View style={styles.dataDiri}>
                <Image
                  source={{uri: this.state.dataKu.avatar}}
                  style={styles.gambar}
                />

                <View style={styles.bioKu}>
                  <View>
                    <Text style={styles.teks}> {this.state.dataKu.name} </Text>
                  </View>
                  <View>
                    <Text style={styles.teks}> {this.state.dataKu.email}</Text>
                  </View>
                  <View>
                    <Text style={styles.teks}>
                      {this.state.dataKu.phone_number}
                    </Text>
                  </View>
                  <View>{this.roleId(this.state.dataKu.role_id)}</View>
                </View>
              </View>
            </View>
            <View style={styles.boxSetting}>
              <TouchableOpacity
                style={styles.styleProfil}
                onPress={() => this.props.navigation.navigate('EditPass')}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Ubah Sandi
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.styleProfil}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  History Penjemputan
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Edit')}
                style={styles.styleProfil}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Edit Profil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.styleProfil}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Ubah Sandi
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.LogOut()}
                style={styles.keluar}>
                <Text style={{fontSize: 30}}> Log Out </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

export default Profil;
