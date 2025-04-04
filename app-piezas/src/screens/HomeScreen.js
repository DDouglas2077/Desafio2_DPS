import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import PieceItem from '../components/PieceItem';
import AddPieceModal from '../components/AddPieceModal';
import PieceDetailsModal from '../components/PieceDetailsModal';
import { v4 as uuidv4 } from 'uuid';

export default function HomeScreen() {
  const [pieces, setPieces] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const addPiece = (newPiece) => {
    setPieces(prev => [...prev, { ...newPiece, id: uuidv4() }]);
    setAddModalVisible(false);
  };

  const deletePiece = (id) => {
    setPieces(prev => prev.filter(p => p.id !== id));
  };

  return (
    <View style={styles.container}>
      <Button title="Agregar Pieza" onPress={() => setAddModalVisible(true)} />
      <FlatList
        data={pieces.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PieceItem piece={item} onDelete={deletePiece} onView={() => setSelectedPiece(item)} />
        )}
      />
      <AddPieceModal visible={addModalVisible} onClose={() => setAddModalVisible(false)} onSave={addPiece} />
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
  container: { flex: 1, padding: 20 },
});
