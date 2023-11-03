import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ReservationScreen: React.FC<{ route: any }> = ({ route }) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [productDetails, setProductDetails] = useState(null);


  const openDetailsModal = (reservation) => {
    setSelectedReservation(reservation);
    setModalVisible(true);

    // Consultar los detalles del producto reservado
    fetch(`https://my-json-server.typicode.com/Maxwelljsm/SportStoreApp/products/${reservation.productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProductDetails(data);
      })
      .catch((error) => console.error('Error al cargar los detalles del producto:', error));
  };

  useEffect(() => {
    // Cargar la lista de reservaciones desde la URL
    fetch('https://my-json-server.typicode.com/Maxwelljsm/SportStoreApp/reservations')
      .then((response) => response.json())
      .then((data) => {
        setReservations(data);
      })
      .catch((error) => console.error('Error al cargar las reservaciones:', error));
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.reservationListTitle}>Lista de Reservaciones</Text>
      <FlatList
        data={reservations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reservationItem}>
            <Text style={styles.reservationName}>Nombre: {item.userName}</Text>
            <Text style={styles.reservationQuantity}>Cantidad: {item.quantity}</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => openDetailsModal(item)}
            >
              <Text style={styles.detailsButtonText}>Ver detalles</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles de la Reservación</Text>
            {selectedReservation && (
              <View>
                <Text style={styles.detail}>Producto: {productDetails ? productDetails.name : 'Cargando...'}</Text>
                <Text style={styles.detail}>Descripción: {productDetails ? productDetails.description : 'Cargando...'}</Text>
                <Text style={styles.detail}>Precio: {productDetails ? `$${productDetails.price}` : 'Cargando...'}</Text>
                <Text style={styles.detail}>Usuario: {selectedReservation.userName}</Text>
                <Text style={styles.detail}>Cantidad: {selectedReservation.quantity}</Text>
                {/* Agrega más detalles de la reserva según tus necesidades */}
              </View>
            )}
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
            </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    color: 'white',
  },
  reservationListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  reservationItem: {
    padding: 10,
    backgroundColor: '#121212',
    marginBottom: 10,
    borderRadius: 5,
  },
  reservationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reservationQuantity: {
    fontSize: 16,
  },
  detailsButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  detailsButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo oscuro
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
  },
});

export default ReservationScreen;
