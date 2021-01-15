import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {Text, View, ActivityIndicator, ScrollView} from 'react-native';
import styles from '../../Components/Tabungan/BoxTabungan';

export class Tabungan extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      loading: false,
      data: [],
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        this.setState({token: token});
        console.log(this.state.token);
        this.TabunganKU();
      } else {
        console.log('token tidak ada');
      }
    });
  }
  TabunganKU() {
    const url = 'https://sammpah.herokuapp.com/api/getTabungan';
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
        this.setState({data: resJson.data, loading: false});
        console.log(resJson.data);
      })
      .catch((error) => {
        console.log('error is' + error);
        this.setState({loading: false});
      });
  }
  render() {
    return (
      <View style={styles.Utama}>
        <View style={styles.headers}>
          <Text style={{fontSize: 35, color: 'white'}}> Tabungan </Text>
        </View>
        <View style={styles.Tabungan}>
          {this.state.token == '' ? (
            <View>
              <ActivityIndicator size={50} color="red" />
            </View>
          ) : (
            <ScrollView>
              {this.state.data == null ? (
                <View>
                  <Text> anda tidak memiliki tabungan</Text>
                </View>
              ) : (
                <View>
                  {this.state.data.map((val, key) => {
                    return (
                      <View key={key} style={{}}>
                        <View>
                          <Text>{val.created_at}</Text>
                        </View>
                        <View>
                          <Text>{val.debit}</Text>
                        </View>
                        <View>
                          <Text>{val.keterangan}</Text>
                        </View>
                        <View>
                          <Text>{val.saldo}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
}

export default Tabungan;
