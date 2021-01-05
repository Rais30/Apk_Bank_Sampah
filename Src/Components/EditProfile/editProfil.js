import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  utama: {
    flex: 1,
  },
  Avatar: {
    width: 200,
    height: 200,
    backgroundColor: '#C0C0C0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
    alignSelf: 'center',
  },
  boxInpur: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
    margin: 5,
    // borderBottomWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  teksInput: {
    paddingTop: 5,
  },
  tombol: {
    backgroundColor: '#1589FF',
    alignItems: 'center',
    width: 150,
    height: 40,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 50,
  },
  head: {
    width: '100%',
    height: 50,
    backgroundColor: '#41A317',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
