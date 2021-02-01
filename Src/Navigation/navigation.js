import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../Screen/Home/home';
import Login from '../Screen/LogIn/login';
import Profil from '../Screen/Profil/profil';
import Register from '../Screen/Register/register';
import Splass from '../Screen/Splass/Splass';
import Splash from '../Screen/Splass/Splash';
import EditProfile from '../Screen/EditProfil/Edit';
import History from '../Screen/History/History';
import EditPass from '../Screen/EditPassword/EditPass';
import SetorP1 from '../Screen/SetorSampah/Setor';
import Penjemputan from '../Screen/Penjemputan/Penjemputan';
import Tabungan from '../Screen/BukuTabungan/Tabungan';
import TarikSaldo from '../Screen/PenarikanSaldo/TarikSaldo';
import StokP2 from '../Screen/SampahGudang/Setok';
import HistorySaldo from '../Screen/HistoryPenarikan/HistorySaldo';
import Chat from '../Screen/Chattting/Chat';
import Home1 from '../Screen/Home/home1';
import Home2 from '../Screen/Home/home2';
import Jemput from '../Screen/Menjemputan/Jemput';
import Kontak from '../Screen/Kontak/Kontak';
import SetorSampah from '../Screen/SetorSampah/Demo';
import HistoryPenjual from '../Screen/HistoryPenjual/HistoryPenjual';
import JualSampah from '../Screen/Penjualan/jualSampah';
import LupaPass from '../Screen/lupaPassword/LupaPass';
import Lokasi from '../Screen/LokasiPenjemputan/Lokasi';

// const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Rumah() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeOne"
      drawerContent={(props) => <Profil {...props} />}>
      <Drawer.Screen name="HomeOne" component={Home} />
      <Drawer.Screen name="Home1" component={Home1} />
      <Drawer.Screen name="Home2" component={Home2} />
    </Drawer.Navigator>
  );
}

class Navigation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splas"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splas" component={Splass} />
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Rumah" component={Rumah} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Edit" component={EditProfile} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="EditPass" component={EditPass} />
          <Stack.Screen name="SetorP1" component={SetorP1} />
          <Stack.Screen name="Penjemputan" component={Penjemputan} />
          <Stack.Screen name="Tabungan" component={Tabungan} />
          <Stack.Screen name="TarikSaldo" component={TarikSaldo} />
          <Stack.Screen name="SetokSampah" component={StokP2} />
          <Stack.Screen name="HistorySaldo" component={HistorySaldo} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profil" component={Profil} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Home1" component={Home1} />
          <Stack.Screen name="Home2" component={Home2} />
          <Stack.Screen name="Jemput" component={Jemput} />
          <Stack.Screen name="Kontak" component={Kontak} />
          <Stack.Screen name="SetorSampah" component={SetorSampah} />
          <Stack.Screen name="HistoriPenjual" component={HistoryPenjual} />
          <Stack.Screen name="JualSampah" component={JualSampah} />
          <Stack.Screen name="LupPass" component={LupaPass} />
          <Stack.Screen name="Lokasi" component={Lokasi} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Navigation;
