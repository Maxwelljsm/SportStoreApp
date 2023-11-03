import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ProductListScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Cargar las categorías
    fetch('https://my-json-server.typicode.com/Maxwelljsm/SportStoreApp/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) {
          // Establecer la primera categoría como seleccionada
          setSelectedCategory(data[0]);
        }
      })
      .catch((error) => console.error('Error al cargar categorías:', error));
  }, []);

  useEffect(() => {
    // Cargar todos los productos
    fetch('https://my-json-server.typicode.com/Maxwelljsm/SportStoreApp/products')
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((error) => console.error('Error al cargar productos:', error));
  }, []);

  useEffect(() => {
    // Filtrar los productos según la categoría seleccionada
    if (selectedCategory) {
      const filteredProducts = allProducts.filter(
        (product) => product.categoryId === selectedCategory.id
      );
      setProducts(filteredProducts);
    }
  }, [selectedCategory, allProducts]);

  return (
    <View style={styles.container}>
      <View style={styles.categoryButtons}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              category.id === selectedCategory?.id ? styles.selectedCategory : null,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                category.id === selectedCategory?.id ? styles.selectedCategoryText : null,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedCategory && (
        <>
          <Text style={styles.categoryTitle}>{selectedCategory.name}</Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
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
        </>
      )}
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
