import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductDetailsScreen: React.FC<{ route: any }> = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Producto</Text>
      <Text style={styles.detail}>Nombre del Producto: {product.name}</Text>
      <Text style={styles.detail}>Precio: ${product.price}</Text>
      <Text style={styles.detail}>Stock Disponible: 10 unidades</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
});

export default ProductDetailsScreen;
