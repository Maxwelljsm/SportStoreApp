import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ReservationModal from '../components/ReservationModal';

const ProductDetailsScreen: React.FC<{ route: any }> = ({ route }) => {
  const { product } = route.params;
  const [stock, setStock] = useState(0);

  // Estados para el modal
  const [modalVisible, setModalVisible] = useState(false);
  const [reservationAmount, setReservationAmount] = useState(1);

  // Función para abrir el modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Función para manejar la reserva del producto
  const handleReserveProduct = () => {
    // Validar que la cantidad de reserva no sea mayor que el stock disponible
    if (reservationAmount > stock) {
      alert('La cantidad de reserva no puede ser mayor que el stock disponible.');
      return;
    }

    // Simulación: Restar la cantidad reservada al stock actual
    const updatedStock = stock - reservationAmount;
    setStock(updatedStock);

    // Cerrar el modal y reiniciar la cantidad de reserva
    closeModal();
  };

  // UseEffect para cargar el stock del producto
  useEffect(() => {
    // Realizar una solicitud para obtener el stock del producto según su ID
    fetch(`https://my-json-server.typicode.com/Maxwelljsm/SportStoreApp/productDetails?productId=${product.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data[0].stock) {
          setStock(data[0].stock);
        }
      })
      .catch((error) => console.error('Error al cargar el stock del producto:', error));
  }, [product.id]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Producto</Text>
      <Text style={styles.detail}>Nombre del Producto: {product.name}</Text>
      <Text style={styles.detail}>Precio: ${product.price}</Text>
      <Text style={styles.detail}>Stock Disponible: {stock} unidades</Text>
      <Button title="Reservar Producto" onPress={openModal} />
      <ReservationModal
        product={product}
        availableStock={stock}
        visible={modalVisible}
        onClose={closeModal}
        onReserve={handleReserveProduct}
        reservationAmount={reservationAmount}
        setReservationAmount={setReservationAmount}
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
