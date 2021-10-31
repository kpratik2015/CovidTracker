import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import CountriesScreen from '../screens/countries';

const Stack = createNativeStackNavigator();

const StackNavigator: React.FC = ({children}) => {
  const [screens] = useState([
    {
      name: 'Home',
      component: HomeScreen,
      options: {
        title: 'COVID-19 Tracker',
      },
    },
    {
      name: 'CountriesList',
      component: CountriesScreen,
      options: {
        title: 'Countries List Page',
      },
    },
  ]);
  return (
    <Stack.Navigator initialRouteName="Home">
      {children}
      {screens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export {StackNavigator as default};
