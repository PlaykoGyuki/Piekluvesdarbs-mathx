import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, Button } from 'react-native';
import SearchMenu from './SearchMenu/searchmenu';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
const Stack = createStackNavigator();
import { useFonts } from 'expo-font';
import Equation1Theory from './Quadratic/Equation1Theory';
import Equat1Task from './Quadratic/Equat1Task';



export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="LandingPage" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="SearchMenu" component={SearchMenu} />
        <Stack.Screen name="Equation1Theory" component={Equation1Theory} />
        <Stack.Screen name="Equat1Task" component={Equat1Task} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#363642',
    fontFamily: 'Poppins',
  },
  logo: {
    height: 300
  }
});
