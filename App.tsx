import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListScreen from './screens/ListScreen';
import DetailsScreen from './screens/DetailsScreen';
import CreateScreen from './screens/CreateScreen';

// 1. Define the types for navigation
export type RootStackParamList = {
  Home: undefined;
  Details: { itemId: string }; // Adjust this as needed
  Add: undefined;
};

// 2. Pass RootStackParamList to createNativeStackNavigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={ListScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Add" component={CreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
