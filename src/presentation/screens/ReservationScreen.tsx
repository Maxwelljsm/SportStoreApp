import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const ReservationScreen: React.FC<{ route: any }> = ({ route }) => {
  const { product } = route.params;
  const [contactInfo, setContactInfo] = useState('');

  const makeReservation = () => {
    // Lógica para realizar una reserva con la información del producto y contacto.
  };

  return (
    <View>
      <Text>Reservar {product.name}</Text>
      <TextInput
        placeholder="Nombre, correo, teléfono, etc."
        value={contactInfo}
        onChangeText={(text) => setContactInfo(text)}
      />
      <Button title="Hacer Reserva" onPress={makeReservation} />
    </View>
  );
};

export default ReservationScreen;
