import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  utama: {
    flex: 1,
    backgroundColor: '#00c853',
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
    width: 340,
    height: 50,
    alignSelf: 'center',

    // borderBottomWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
  },
  teksInput: {
    paddingTop: 5,
    width: 295,
  },
  tombol: {
    backgroundColor: '#76d275',
    alignItems: 'center',
    width: 150,
    height: 50,
    alignSelf: 'center',
    borderRadius: 15,
    justifyContent: 'center',
    marginVertical: 50,
  },
  head: {
    width: '100%',
    height: 50,
    backgroundColor: '#087f23',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  box: {
    width: 350,
    height: 170,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    // marginHorizontal: 15,
  },
  aikon: {
    borderLeftWidth: 1,
    alignSelf: 'center',
    padding: 5,
  },
});
