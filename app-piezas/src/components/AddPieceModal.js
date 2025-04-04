import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';

export default function AddPieceModal({ visible, onClose, onSave }) {
  const [tipo, setTipo] = useState('');
  const [marca, setMarca] = useState('');
  const [numSerie, setNumSerie] = useState('');
  const [precio, setPrecio] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSave = () => {
    onSave({ tipo, marca, numSerie, precio, fecha });
    setTipo(''); setMarca(''); setNumSerie(''); setPrecio(''); setFecha('');
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <TextInput placeholder="Tipo de Pieza" value={tipo} onChangeText={setTipo} style={styles.input} />
        <TextInput placeholder="Marca" value={marca} onChangeText={setMarca} style={styles.input} />
        <TextInput placeholder="No. Serie" value={numSerie} onChangeText={setNumSerie} style={styles.input} />
        <TextInput placeholder="Precio" keyboardType="numeric" value={precio} onChangeText={setPrecio} style={styles.input} />
        <TextInput placeholder="Fecha de cambio (YYYY-MM-DD)" value={fecha} onChangeText={setFecha} style={styles.input} />
        <View style={styles.btnContainer}>
          <Button title="Guardar" onPress={handleSave} />
          <Button title="Cancelar" color="red" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: { flex: 1, padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 },
  btnContainer: { flexDirection: 'row', justifyContent: 'space-around' },
});
