import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../utils/colors";

export default function AddPieceModal({ visible, onClose, onSave }) {
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");
  const [numSerie, setNumSerie] = useState("");
  const [precio, setPrecio] = useState("");
  const [fechaCambio, setFechaCambio] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    onSave({
      tipo,
      marca,
      numSerie,
      precio,
      fecha: fechaCambio.toISOString().split("T")[0],
    });

    // Limpiar
    setTipo("");
    setMarca("");
    setNumSerie("");
    setPrecio("");
    setFechaCambio(new Date());
  };

  return (
    <Modal visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Registro de piezas</Text>

          <Text style={styles.label}>Pieza</Text>
          <TextInput style={styles.input} value={tipo} onChangeText={setTipo} />

          <Text style={styles.label}>Marca</Text>
          <TextInput
            style={styles.input}
            value={marca}
            onChangeText={setMarca}
          />

          <Text style={styles.label}>No. Serie</Text>
          <TextInput
            style={styles.input}
            value={numSerie}
            onChangeText={setNumSerie}
          />

          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            value={precio}
            onChangeText={setPrecio}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Fecha de Cambio</Text>
          <Button
            title={`Seleccionar: ${fechaCambio.toISOString().split("T")[0]}`}
            color={colors.primary}
            onPress={() => setShowPicker(true)}
          />

          {showPicker && (
            <DateTimePicker
              value={fechaCambio}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || fechaCambio;
                setShowPicker(Platform.OS === "ios");
                setFechaCambio(currentDate);
              }}
            />
          )}

          <View style={styles.btnContainer}>
            <Button
              title="Guardar"
              onPress={handleSave}
              color={colors.primary}
            />
            <Button title="Cancelar" onPress={onClose} color={colors.danger} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: colors.text,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    borderRadius: 6,
    backgroundColor: colors.background,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
});
