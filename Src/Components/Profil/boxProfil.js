import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  utama: {
    flex: 1,
  },
  loading: {
    alignItems: 'center',
  },
  gambar: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 49,
  },
  dataDiri: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 160,
    width: '90%',
    marginTop: 30,
    padding: 20,
    borderRadius: 15,
  },
  bioKu: {
    padding: 15,
  },
  teks: {
    fontSize: 20,
  },
  keluar: {
    backgroundColor: 'red',
    alignItems: 'center',
    width: 150,
    height: 40,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  styleProfil: {
    margin: 25,
    borderBottomWidth: 1,
    justifyContent: 'center',
    padding: 5,
    // alignItems: 'center',
  },
});
