import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const AddProductModal = ({ visible, onClose,selectedCategory, onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');

  const handleAddProduct = () => {
    // Validar y agregar el nuevo producto a la base de datos
    const newProduct = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      categoryId: selectedCategory.id,
    };

    // Agregar la lógica para guardar el producto en la base de datos (db.json)
    fetch('https://my-json-server.typicode.com/Maxwelljsm/SportStoreApp/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del servidor (puedes mostrar un mensaje de éxito, etc.)
        // Si deseas actualizar la lista de productos, puedes hacerlo aquí
        onAddProduct(data);
      })
      .catch((error) => {
        console.error('Error al agregar el producto:', error);
      });

    // Reiniciar los campos del formulario
    setProductName('');
    setProductDescription('');
    setProductPrice('');

    // Cerrar el modal
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Agregar Producto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del Producto"
            value={productName}
            onChangeText={(text) => setProductName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripción del Producto"
            value={productDescription}
            onChangeText={(text) => setProductDescription(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio"
            value={productPrice}
            onChangeText={(text) => setProductPrice(text)}
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
              <Text style={styles.buttonText}>Agregar Producto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 16,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default AddProductModal;
