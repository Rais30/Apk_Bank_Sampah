import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  utama: {
    flex: 1,
    backgroundColor: 'white',
  },
  box: {
    width: '90%',
    // height: 150,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
    // backgroundColor: 'red',
  },
  inpuQu: {
    flexDirection: 'row',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  inputAja: {
    width: '75%',
  },
  iconQu: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tombolKlik: {
    width: '70%',
    height: 50,
    backgroundColor: '#388e3c',
    alignSelf: 'center',
    borderRadius: 25,
    marginTop: 100,
    elevation: 5,

    // position: 'absolute',
  },
  teksLogIn: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'center',
  },
  titel: {
    alignSelf: 'center',
    marginTop: 25,
  },
  teksTitel: {
    fontSize: 40,
  },
  imageQu: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  textAja: {
    flexDirection: 'row',
  },
  textSaya: {
    fontSize: 18,
    marginLeft: 15,
    color: '#2B65EC',
  },
});
