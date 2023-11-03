import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

const categories = [
  { id: 1, name: 'Fútbol' },
  { id: 2, name: 'Baloncesto' },
  { id: 3, name: 'Atletismo' },
];

const productsByCategory = {
  1: [
    {
      id: 1,
      name: 'Camiseta de fútbol',
      description: 'Camiseta oficial de la selección nacional.',
      price: 25.0,
    },
    // Agrega más productos de fútbol aquí
  ],
  2: [
    {
      id: 2,
      name: 'Balón de baloncesto',
      description: 'Balón profesional de cuero.',
      price: 20.0,
    },
    // Agrega más productos de baloncesto aquí
  ],
  3: [
    {
      id: 3,
      name: 'Zapatillas deportivas',
      description: 'Zapatillas para correr de alta calidad.',
      price: 45.0,
    },
    // Agrega más productos de atletismo aquí
  ],
};

const ProductListScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]); // Inicialmente selecciona la primera categoría

  return (
    <View style={styles.container}>
      <View style={styles.categoryButtons}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              category.id === selectedCategory.id ? styles.selectedCategory : null,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                category.id === selectedCategory.id ? styles.selectedCategoryText : null,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.categoryTitle}>{selectedCategory.name}</Text>
      <FlatList
        data={productsByCategory[selectedCategory.id]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            {/* <Image source={item.image} /> */}
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Precio: ${item.price}</Text>
            <TouchableOpacity
              style={styles.productButton}
              onPress={() => navigation.navigate('ProductDetails', { product: item })}
            >
              <Text style={styles.buttonText}>Ver detalles</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro
    padding: 20,
  },
  categoryButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'blue', // Color de fondo de los botones de categoría
  },
  selectedCategory: {
    backgroundColor: 'green', // Color de fondo cuando la categoría está seleccionada
  },
  categoryButtonText: {
    color: 'white',
  },
  selectedCategoryText: {
    color: 'black', // Color del texto cuando la categoría está seleccionada
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  productItem: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  productPrice: {
    fontSize: 16,
    color: 'white',
  },
  productButton: {
    backgroundColor: 'blue', // Color del botón
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default ProductListScreen;
