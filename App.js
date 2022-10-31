import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './Components/SplashScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Components/Home';

 const Stack = createStackNavigator();
 function NavStack() {
  return(
      <Stack.Navigator>
        <Stack.Screen
        name='Splash'
        component={SplashScreen}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
  );
 }

 const Tab = createBottomTabNavigator();
 function BottomTab() {
  return(
      <Tab.Navigator>
        <Tab.Screen
        name='Home'
        component={Home}
        options={{headerShown: false}}
        />
      </Tab.Navigator>
  );
 }
export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function inicia(){
      try{
        await new Promise((resolve )=> {
          setTimeout(resolve, 5000);
        });
      }catch(e){
        console.log(e);
      }
      finally{
        setAppIsReady(true);
      }
    }
    inicia();
  })
  return (
    <NavigationContainer>
      {
        appIsReady?
        <BottomTab></BottomTab>
        :
      <SafeAreaProvider>
        <NavStack/>
      </SafeAreaProvider>
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
