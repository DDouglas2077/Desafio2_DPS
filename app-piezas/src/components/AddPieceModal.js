import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddPieceModal({ visible, onClose, onSave }) {
  const [tipo, setTipo] = useState('');
  const [marca, setMarca] = useState('');
  const [numSerie, setNumSerie] = useState('');
  const [precio, setPrecio] = useState('');
  const [fechaCambio, setFechaCambio] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    const fechaFormateada = fechaCambio.toISOString().split('T')[0];
    onSave({ tipo, marca, numSerie, precio, fecha: fechaFormateada });

    // Resetear campos
    setTipo('');
    setMarca('');
    setNumSerie('');
    setPrecio('');
    setFechaCambio(new Date());
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContent}>
        <TextInput placeholder="Tipo de Pieza" value={tipo} onChangeText={setTipo} style={styles.input} />
        <TextInput placeholder="Marca" value={marca} onChangeText={setMarca} style={styles.input} />
        <TextInput placeholder="No. Serie" value={numSerie} onChangeText={setNumSerie} style={styles.input} />
        <TextInput placeholder="Precio" keyboardType="numeric" value={precio} onChangeText={setPrecio} style={styles.input} />

        <View style={styles.dateContainer}>
          <Text style={styles.dateLabel}>Fecha de cambio:</Text>
          <Button
            title={fechaCambio.toISOString().split('T')[0]}
            onPress={() => setShowPicker(true)}
          />
        </View>

        {showPicker && (
          <DateTimePicker
            value={fechaCambio}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setFechaCambio(selectedDate);
              }
              setShowPicker(false);
            }}
          />
        )}

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
  btnContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  dateContainer: { marginBottom: 15 },
  dateLabel: { fontSize: 16, marginBottom: 6 },
});
