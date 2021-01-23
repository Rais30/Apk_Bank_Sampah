import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Pusher from 'pusher-js/react-native';

export class Chat extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      input: '',
      token: '',
      id: '',
      token: '',
      loading: false,
      user: '',
    };
  }

  message = () => {
    console.log('kirim pesan');
    const {input} = this.state;
    const url = `https://sammpah.herokuapp.com/api/chat/${this.props.route.params.user_id}`;
    this.setState({loading: true});
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({message: input}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((resjson) => {
        console.log('ini respon', resjson);
        const {status} = resjson;
        if (status == 'Success') {
          this.setState({loading: false});
          console.log('pesan berasil di kirim');
          this.add();
        } else {
          console.log('ada errpr di sini');
          this.setState({loading: false});
          console.log('pesan gagal dikirm');
        }
      })
      .catch((err) => console.log('Terjadi kesalahan. ' + err));
  };

  add = (token) => {
    console.log('add pesan');
    const url = `https://sammpah.herokuapp.com/api/chat/${this.props.route.params.user_id}`;
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
        this.setState({
          data: resJson.data,

          loading: false,
        });
        console.log('ini pesan ', resJson);
      })
      .catch((error) => {
        console.log('error is ' + error);
        this.setState({loading: false});
      });
  };
  componentDidMount() {
    AsyncStorage.getItem('user').then((user) => {
      if (user != null) {
        this.setState({user: user});
        console.log('ini id user member', this.state.user);
        AsyncStorage.getItem('token').then((token) => {
          if (token != null) {
            this.setState({token: token});
            console.log('token ada');
            this.add(token);
          } else {
            console.log('token tidak ada');
          }
        });
      } else {
        console.log('user ID tidak ada');
      }
    });
    Pusher.logToConsole = true;

    var pusher = new Pusher('7c4e768837de4f546c9b', {
      cluster: 'ap1',
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function (data) {
      console.log(JSON.stringify(data));
    });
  }

  render() {
    // console.log('ini id user', this.props.route.params.user_id);

    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Text style={styles.Tittel}> Pesan </Text>
        </View>

        <View style={{flex: 1}}>
          <ScrollView>
            <View>
              {this.state.data == null ? (
                <View>
                  <ActivityIndicator color="red" size={30} />
                </View>
              ) : (
                <>
                  {this.state.data.map((value, key) => {
                    return (
                      <View key={key}>
                        {value.from == this.props.route.params.user_id ? (
                          <View style={styles.getText}>
                            <Text>{value.message}</Text>
                          </View>
                        ) : (
                          <View style={styles.textSend}>
                            <Text>{value.message}</Text>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </>
              )}
            </View>
          </ScrollView>
          <View style={styles.boxSend}>
            <View style={styles.textMasuk}>
              <TextInput
                style={{width: '75%'}}
                placeholder=" Pesan "
                value={this.state.input}
                onChangeText={(text) => this.setState({input: text})}
              />
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="send" size={35} onPress={() => this.message()} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Box: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#1589FF',
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Tittel: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  textSend: {
    backgroundColor: '#4CC417',
    padding: 5,
    borderRadius: 10,
    marginTop: 5,
    margin: 5,
    alignSelf: 'flex-end',
    maxWidth: '85%',
  },
  boxSend: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: '#82CAFA',
    justifyContent: 'center',
  },
  textMasuk: {
    width: '85%',
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  getText: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    margin: 5,
    alignSelf: 'flex-start',
    maxWidth: '85%',
  },
  right: {
    alignSelf: 'flex-end',
  },
  left: {
    alignSelf: 'flex-start',
  },
  loginRegister: {
    width: '90%',
    height: 190,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 90,
    marginLeft: 18,
    elevation: 10,
  },
  BoxImage: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    top: 50,
    borderWidth: 7,
    borderColor: '#3462f9',
    marginTop: -95,
    borderWidth: 7,
    margin: 5,
  },
  posisenLogin: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  boxLoginRegister: {
    width: '40%',
    height: 50,
    margin: 5,
    borderRadius: 20,
  },
});

export default Chat;
