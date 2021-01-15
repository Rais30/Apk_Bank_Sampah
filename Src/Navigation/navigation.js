import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialIcons';
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

// const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Rumah() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeOne"
      drawerContent={(props) => <Profil {...props} />}>
      <Drawer.Screen name="HomeOne" component={Home} />
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Navigation;
