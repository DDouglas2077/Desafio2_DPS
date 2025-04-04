import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import PieceItem from '../components/PieceItem';
import AddPieceModal from '../components/AddPieceModal';
import PieceDetailsModal from '../components/PieceDetailsModal';
import uuid from 'react-native-uuid';

export default function HomeScreen() {
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const addPiece = (newPiece) => {
    setPieces(prev => [...prev, { ...newPiece, id: uuid.v4() }]);
    setAddModalVisible(false);
  };

  const deletePiece = (id) => {
    setPieces(prev => prev.filter(p => p.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Piezas</Text>
        <Button title="Agregar Pieza" onPress={() => setAddModalVisible(true)} />
      </View>
      <FlatList
        data={pieces.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PieceItem
            piece={item}
            onDelete={deletePiece}
            onView={() => setSelectedPiece(item)}
          />
        )}
      />
      <AddPieceModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSave={addPiece}
      />
      {selectedPiece && (
        <PieceDetailsModal
          visible={!!selectedPiece}
          piece={selectedPiece}
          onClose={() => setSelectedPiece(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
