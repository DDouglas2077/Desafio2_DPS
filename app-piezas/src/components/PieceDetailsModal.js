import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

export default function PieceDetailsModal({ visible, piece, onClose }) {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <Text style={styles.title}>Detalle de la Pieza</Text>
        <Text>Pieza: {piece.tipo}</Text>
        <Text>Marca: {piece.marca}</Text>
        <Text>No. Serie: {piece.numSerie}</Text>
        <Text>Precio: ${piece.precio}</Text>
        <Text>Fecha de cambio: {piece.fecha}</Text>
        <Button title="Cerrar" onPress={onClose} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
