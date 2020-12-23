import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../Screen/Home/home';
import Login from '../Screen/LogIn/login';
import Profil from '../Screen/Profil/profil';
import Register from '../Screen/Register/register';
import Splass from '../Screen/Splass/Splass';
import Splash from '../Screen/Splass/Splash';
import Edit from '../Screen/EditProfil/Edit';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function Rumah() {
  return (
    <Tab.Navigator
      initialRouteName="Belanja"
      shifting={true}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'account-box' : 'account-box';
          }
          return <Icon name={iconName} size={25} color={color} />;
        },
      })}>
      <Tab.Screen
        tabBarIcon={{
          activeTintColor: '#fcf8f8',
          inactiveTintColor: 'gray',
          showLabel: false,
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen name="Home1" component={Home} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
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
          <Stack.Screen name="Edit" component={Edit} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default Navigation;
