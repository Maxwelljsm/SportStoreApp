import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>¡Bienvenido a Nuestra Tienda Deportiva!</Text>
        <Text style={styles.introText}>Descubre nuestra amplia gama de productos deportivos.</Text>
        <Button
          title="Explorar Productos"
          onPress={() => navigation.navigate('ProductList')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto en color blanco
    marginBottom: 16,
  },
  introText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#CCCCCC', // Texto en color gris claro
    marginBottom: 32,
  },
});

export default HomeScreen;
