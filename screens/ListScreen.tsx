import React, { useEffect, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const { width: listWidth } = Dimensions.get('window');

const ListScreen = () => {
  const navigation: any = useNavigation();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'bucketItems'),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
          onPress={() => navigation.navigate('Add')}
          android_ripple={{ color: '#e0f2f1' }}
        >
          <Entypo
            name="bucket"
            size={18}
            color="green"
            style={styles.icon}
          />
          <Text style={styles.addButtonText}>Add Item</Text>
        </Pressable>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('Details', { itemId: item.id })
              }
            >
              <Text
                style={[
                  styles.cardText,
                  item.completed && styles.completedText,
                ]}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              {item.priority && (
                <AntDesign name="star" size={20} color="orange" />
              )}
            </TouchableOpacity>
          )}
          contentContainerStyle={
            items.length === 0 && styles.emptyContainer
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No items yet.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 20 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    width: listWidth * 0.9,
    alignSelf: 'center',
  },
  pressed: { opacity: 0.7 },
  icon: { marginRight: 8 },
  addButtonText: { color: 'green', fontWeight: 'bold', fontSize: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafafa',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  cardText: { flex: 1, fontSize: 16 },
  completedText: { textDecorationLine: 'line-through', color: '#888' },
  emptyContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, color: '#666' },
});
