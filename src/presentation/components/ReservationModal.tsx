import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, TextInput } from 'react-native';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

const ReservationModal = ({ product, availableStock, visible, onClose, onReserve, reservationAmount, setReservationAmount }) => {
  const [userLocation, setUserLocation] = useState(null);
  const navigation = useNavigation(); // Obtiene el objeto de navegación

  useEffect(() => {
    const checkLocationPermission = async () => {
      const locationPermissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (locationPermissionStatus === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            setUserLocation(position.coords);
          },
          (error) => {
            console.error('Error al obtener la ubicación:', error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else if (locationPermissionStatus === RESULTS.DENIED) {
        const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

        if (result === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              setUserLocation(position.coords);
            },
            (error) => {
              console.error('Error al obtener la ubicación:', error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        } else {
          console.log('Permisos de ubicación no concedidos');
        }
      }
    };

    checkLocationPermission();
  }, []);

  const handleReserveProduct = () => {
    if (reservationAmount <= 0) {
      alert('La cantidad de reserva debe ser mayor que 0.');
    } else if (reservationAmount > availableStock) {
      alert('La cantidad de reserva no puede ser mayor que el stock disponible.');
    } else if (!userLocation) {
      alert('No se pudo obtener la ubicación del dispositivo.');
    } else {
      const newReservation = {
        productId: product.id,
        quantity: reservationAmount,
        userName: 'Nombre de usuario',
        userLocation,
      };

      fetch('https://my-json-server.typicode.com/Maxwelljsm/SportStoreApp/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReservation),
      })
        .then((response) => response.json())
        .then((data) => {
          onReserve(data);
          onClose();
          // Navega a la pantalla de reservaciones
          navigation.navigate('Reservations'); // Asegúrate de que la clave coincida con tu configuración de navegación
        })
        .catch((error) => console.error('Error al guardar la reserva:', error));
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Reservar Producto</Text>
          <Text style={styles.detail}>Nombre del Producto: {product.name}</Text>
          <Text style={styles.detail}>Stock Disponible: {availableStock} unidades</Text>
          <Text style={styles.detail}>Cantidad a Reservar:</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad a reservar"
            value={reservationAmount.toString()}
            onChangeText={(text) => setReservationAmount(parseInt(text, 10))}
            keyboardType="numeric"
          />
          <View style={styles.buttonContainer}>
            <Button title="Reservar" onPress={handleReserveProduct} />
            <Button title="Cancelar" onPress={onClose} />
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
  detail: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
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
});

export default ReservationModal;
