import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  useRoute,
  useNavigation,
  RouteProp,
} from '@react-navigation/native';
import {
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { RootStackParamList } from '../App';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;
const { width: screenWidth } = Dimensions.get('window');

type BucketItem = {
  id: string;
  title: string;
  description: string;
  due: string;
  priority: boolean;
  completed: boolean;
};

const DetailsScreen = () => {
  const route = useRoute<DetailsRouteProp>();
  const navigation = useNavigation();
  const { itemId } = route.params;

  const [item, setItem] = useState<BucketItem | null>(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const docRef = doc(db, 'bucketItems', itemId);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data() as Omit<BucketItem, 'id'>;
        setItem({ id: snap.id, ...data });
        setCompleted(data.completed);
      }
    });
    return unsubscribe;
  }, [itemId]);

  if (!item) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  const handleMarkCompleted = async () => {
    try {
      const ref = doc(db, 'bucketItems', item.id);
      await updateDoc(ref, { completed: true });
      setCompleted(true);
    } catch (e) {
      console.error('Error updating document', e);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const ref = doc(db, 'bucketItems', item.id);
              await deleteDoc(ref);
              navigation.goBack();
            } catch (e) {
              console.error('Error deleting document', e);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.description}</Text>
      <Text style={styles.text}>Due: {item.due}</Text>
      <Text style={styles.text}>
        Priority: {item.priority ? 'Yes' : 'No'}
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.pressed,
          completed && styles.disabledButton,
        ]}
        onPress={handleMarkCompleted}
        disabled={completed}
        android_ripple={{ color: '#e0f2f1' }}
      >
        <Text style={styles.buttonText}>
          {completed ? 'Already Done' : 'Mark Completed'}
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
        onPress={handleDelete}
        android_ripple={{ color: '#ffebee' }}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </Pressable>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    width: screenWidth * 0.9,
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: 'green',
    paddingVertical: 14,
    borderRadius: 8,
    width: screenWidth * 0.9,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 14,
    borderRadius: 8,
    width: screenWidth * 0.9,
    alignItems: 'center',
    marginTop: 12,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
