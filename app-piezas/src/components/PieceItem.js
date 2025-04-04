import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

export default function PieceItem({ piece, onDelete, onView }) {
  return (
    <TouchableOpacity onPress={onView} style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>Pieza: {piece.tipo}</Text>
        <Text style={styles.text}>Fecha de cambio: {piece.fecha}</Text>
      </View>
      <Button title="Eliminar" onPress={() => onDelete(piece.id)} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
  },
});
