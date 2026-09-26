import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './src/navigators/DrawerNavigator';
import FormularioEntregaScreen from './src/screen/FormularioEntregaScreen';


//diccionario
export type RootStackParamList = {
  MainDrawer: undefined;
  //Detail: undefined;
  FormularioEntregaScreen: undefined//{ id?: string | undefined }
  ListaEntregaScreen:undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MainDrawer'>
        <Stack.Screen
          name='MainDrawer'
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='FormularioEntregaScreen'
          component={FormularioEntregaScreen}
          options={{ headerShown: true, title:'Formulario'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
