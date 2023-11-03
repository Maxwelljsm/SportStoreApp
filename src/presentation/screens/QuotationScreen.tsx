import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const QuotationScreen: React.FC<{ route: any }> = ({ route }) => {
  /* const { product } = route.params; */
  const [contactInfo, setContactInfo] = useState('');

  const sendQuotation = () => {
    // Lógica para enviar la cotización con la información del producto y contacto.
  };

  return (
    <View>
      <Text>Cotización para {/* {product.name} */}</Text>
      <TextInput
        placeholder="Nombre, correo, teléfono, etc."
        value={contactInfo}
        onChangeText={(text) => setContactInfo(text)}
      />
      <Button title="Enviar Cotización" onPress={sendQuotation} />
    </View>
  );
};

export default QuotationScreen;
