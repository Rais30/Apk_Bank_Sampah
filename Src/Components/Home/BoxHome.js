import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  utama: {
    flex: 1,
    // backgroundColor: '#00c853',
  },
  head: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#00c853',
  },
  gambar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  boxgambar: {
    width: 60,
    height: 60,
    backgroundColor: '#4c8c4a',
    borderRadius: 30,
    marginVertical: 10,
    marginLeft: 10,
  },
  dataKu: {
    marginVertical: 15,
    marginLeft: 15,
  },
  box: {
    width: '100%',
    // height: 200,
    backgroundColor: '#76d275',
    // justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
  },
  saldo: {
    width: '50%',
    paddingLeft: '7%',
    // alignSelf: 'center',
    // backgroundColor: 'white',
  },
  boxsaldo: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 2,
    // paddingLeft: 5,
  },
  boxFitur: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    margin: 10,
  },
});
