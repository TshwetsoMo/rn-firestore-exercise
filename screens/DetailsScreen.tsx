import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Define the expected type of route params
type BucketItem = {
  id: string;
  title: string;
  description: string;
  due: string;
  priority: boolean;
  completed: boolean;
};

type RouteParams = {
  params: {
    item: BucketItem;
  };
};

const DetailsScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const navigation = useNavigation();
  const { item } = route.params;

  const [completed, setCompleted] = useState(item.completed);

  const handleMarkCompleted = async () => {
    try {
      const docRef = doc(db, 'bucketItems', item.id);
      await updateDoc(docRef, { completed: true });
      setCompleted(true);
    } catch (e) {
      console.log('Error updating document', e);
    }
  };

  const handleDelete = async () => {
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
              const docRef = doc(db, 'bucketItems', item.id);
              await deleteDoc(docRef);
              navigation.goBack();
            } catch (e) {
              console.log('Error deleting document', e);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>Description: {item.description}</Text>
      <Text style={styles.text}>Due date: {item.due}</Text>
      <Text style={styles.text}>Priority: {item.priority ? 'Yes' : 'No'}</Text>

      <View style={styles.buttonContainer}>
        <Button
          title={completed ? 'Already done' : 'Mark Completed'}
          color={completed ? 'gray' : 'green'}
          disabled={completed}
          onPress={handleMarkCompleted}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title='Delete' color='red' onPress={handleDelete} />
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
  },
});
