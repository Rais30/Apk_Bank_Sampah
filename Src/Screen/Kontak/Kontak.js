import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'

class Kontak extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      token: '',
      loading: false,
      user: '',
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('user').then((user) => {
      if (user != null) {
        this.setState({user: user});
        console.log(this.state.user);
        AsyncStorage.getItem('token').then((token) => {
          if (token != null) {
            this.setState({token: token});
            console.log('token ada');
            this.AddKontak();
          } else {
            console.log('token tidak ada');
          }
        });
      } else {
        console.log('user ID tidak ada');
      }
    });
  }
  AddKontak = () => {
    console.log('get kontak');
    const url = 'https://sammpah.herokuapp.com/api/allmessage';
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
        console.log(resJson);
        this.setState({data: resJson.data, loading: false});
        console.log('ini kontak', this.state.data);
      })
      .catch((error) => {
        console.log('error adalahw' + error);
        this.setState({loading: false});
      });
  };
  render() {
    return (
      <View style={styles.viewUtama}>
        <View style={styles.header}>
          <Text style={styles.Tittel}> Kontak </Text>
        </View>
        <ScrollView style={styles.viewUtama}>
          {this.state.data == null ? (
            <View style={{alignItems: 'center'}}>
              <ActivityIndicator size={40} color="red" />
              <Text style={{fontSize: 15}}>
                anda tidak meiliki kontak yang di dapat di hubungi
              </Text>
            </View>
          ) : (
            <>
              {this.state.data.map((val, key) => {
                return (
                  <View key={key}>
                    <TouchableOpacity
                      style={styles.boxPesan}
                      onPress={() =>
                        this.props.navigation.navigate('Chat', {
                          user_id: val.id,
                        })
                      }>
                      <>
                        {val.foto !== null ? (
                          <Image
                            source={{uri: val.avatar}}
                            style={styles.viewImage}
                          />
                        ) : (
                          <View
                            style={{
                              ...styles.viewImage,
                              backgroundColor: '#C0C0C0',
                            }}>
                            <Icon nama="user" size={25} />
                          </View>
                        )}
                      </>
                      <View style={styles.viewTeks}>
                        <Text style={{fontSize: 17}}>{val.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          )}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewUtama: {
    flex: 1,
  },
  header: {
    width: '100%',
    padding: 5,
    backgroundColor: '#388e3c',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Tittel: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'white',
  },

  viewImage: {
    width: 65,
    height: 65,
    borderRadius: 33,
    alignSelf: 'center',
    marginLeft: 5,
  },
  boxPesan: {
    width: '100%',
    height: 70,
    backgroundColor: 'white',
    elevation: 3,
    flexDirection: 'row',
    margin: 5,
  },
  viewTeks: {
    margin: 5,
  },
});
export default Kontak;
