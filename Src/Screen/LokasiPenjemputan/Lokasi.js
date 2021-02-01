import React, {Component, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  TextInput,
  Linking,
} from 'react-native';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <View style={styles.tomabol}>
      <TouchableNativeFeedback onPress={handlePress}>
        <Text style={styles.teksTombol}>{children}</Text>
      </TouchableNativeFeedback>
    </View>
  );
};

export class Lokasi extends Component {
  constructor() {
    super();
    this.state = {
      url: 'https://maps.app.goo.gl/2ZcmzLGWmkuq7fPY6',
      email: '',
      data: 'LOKASI',
    };
  }

  render() {
    return (
      <View style={styles.utama}>
        <View style={styles.headers}>
          <Text style={styles.tittel}> Lokasi Tujuan </Text>
        </View>
        {this.state.email == '' ? (
          <View style={styles.boxInput}>
            <View style={styles.teksInput}>
              <Text style={{fontSize: 20}}>{this.state.data}</Text>
            </View>
            <View style={styles.tomabol}>
              <TouchableNativeFeedback
                onPress={() => this.setState({email: this.state.data})}>
                <Text style={styles.teksTombol}> Masuk </Text>
              </TouchableNativeFeedback>
            </View>
          </View>
        ) : (
          <View>
            <OpenURLButton url={this.state.url}>Google Map</OpenURLButton>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  utama: {
    flex: 1,
  },
  headers: {
    width: '100%',
    height: 50,
    backgroundColor: '#388e3c',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'center',
  },
  tittel: {
    fontSize: 30,
    color: 'white',
  },
  teksTombol: {
    fontSize: 30,
    color: 'white',
  },
  tomabol: {
    marginTop: 20,
    padding: 5,
    backgroundColor: '#6CC417',
    borderRadius: 5,
    alignSelf: 'center',
  },
  teksInput: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: '5%',
    marginTop: 30,
    elevation: 3,
  },
  boxInput: {
    justifyContent: 'center',
  },
});

export default Lokasi;
