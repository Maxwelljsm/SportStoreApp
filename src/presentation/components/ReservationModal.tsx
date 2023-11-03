import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, TextInput } from 'react-native';

const ReservationModal = ({ product, availableStock, visible, onClose, onReserve, reservationAmount, setReservationAmount }) => {
  const handleReserveProduct = () => {
    if (reservationAmount <= 0) {
      alert('La cantidad de reserva debe ser mayor que 0.');
    } else if (reservationAmount > availableStock) {
      alert('La cantidad de reserva no puede ser mayor que el stock disponible.');
    } else {
      onReserve(reservationAmount);
      onClose();
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

export default ReservationModal;
