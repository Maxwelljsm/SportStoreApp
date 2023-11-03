import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StatusBar } from 'react-native';
import HomeScreen from '../src/presentation/screens/HomeScreen';
import ReservationScreen from '../src/presentation/screens/ReservationScreen';
import ProductDetailsScreen from '../src/presentation/screens/ProductDetailScreen';
import ProductListScreen from '../src/presentation/screens/ProductListScreen';
import QuotationScreen from '../src/presentation/screens/QuotationScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductList" component={ProductListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Quotation" component={QuotationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  StatusBar.setHidden(true);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen name="Inicio" component={HomeStack} />
        <Tab.Screen name="Productos" component={ProductListScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Reservaciones" component={ReservationScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Cotizaciones" component={QuotationScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
