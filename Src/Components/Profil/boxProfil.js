import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  utama: {
    flex: 1,
    backgroundColor: '#00c853',
  },
  loading: {
    alignItems: 'center',
  },
  gambar: {
    width: 70,
    height: 70,
    backgroundColor: '#00701a',
    borderRadius: 35,
  },
  dataDiri: {
    // flexDirection: 'row',
    backgroundColor: 'white',
    // height: 160,
    width: '100%',
    // marginTop: 30,
    padding: 5,
    // borderRadius: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bioKu: {
    padding: 10,
  },
  teks: {
    fontSize: 17,
  },
  keluar: {
    backgroundColor: 'red',
    alignItems: 'center',
    width: 150,
    height: 40,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 50,
  },
  styleProfil: {
    margin: 5,
    borderRadius: 5,
    // justifyContent: 'center',
    padding: 5,
    backgroundColor: '#4caf50',
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxSetting: {
    marginTop: 25,
    width: '97%',
    alignSelf: 'center',
  },
  boxgambar: {
    marginTop: 15,
    marginLeft: 15,
  },
});
