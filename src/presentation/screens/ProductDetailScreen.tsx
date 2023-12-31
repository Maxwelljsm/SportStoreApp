import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
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

  const [reservations, setReservations] = useState([]);

  // Función para manejar la actualización de la lista de reservas
  const handleUpdateReservations = (newReservation) => {
    // Agrega la nueva reserva a la lista de reservas
    setReservations((prevReservations) => [...prevReservations, newReservation]);
  };

  // UseEffect para cargar el stock del producto
  useEffect(() => {
    // Realizar una solicitud para obtener el stock del producto según su ID
    fetch(`https://my-json-server.typicode.com/Maxwelljsm/SportStoreApp/productDetails?productId=${product.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.stock) {
          setStock(data.stock);
        }
      })
      .catch((error) => console.error('Error al cargar el stock del producto:', error));
  }, [product.id]);

  return (
    <View style={styles.container}>
      <Image style={styles.productImage} source={{ uri: product.image }} />
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
        onReserve={handleUpdateReservations}
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
  productImage: {
    width: 200, // Ajusta el ancho de la imagen según tus necesidades
    height: 200, // Ajusta la altura de la imagen según tus necesidades
    alignSelf: 'center', // Centra la imagen en el medio de la pantalla
    marginBottom: 10, // Agrega un margen inferior
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
