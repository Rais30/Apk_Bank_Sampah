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
    width: 100,
    height: 100,
    backgroundColor: '#00701a',
    borderRadius: 49,
  },
  dataDiri: {
    flexDirection: 'row',
    backgroundColor: '#80e27e',
    // height: 160,
    width: '95%',
    marginTop: 30,
    padding: 17,
    borderRadius: 15,
  },
  bioKu: {
    padding: 10,
  },
  teks: {
    fontSize: 17,
  },
  keluar: {
    backgroundColor: '#76d275',
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
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#4caf50',
    height: 50,
    // alignItems: 'center',
    paddingLeft: 20,
  },
  boxSetting: {
    marginTop: 25,
    width: '97%',
    alignSelf: 'center',
  },
});
