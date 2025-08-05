/* CreateScreen.tsx */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { createNewBucketItem } from '../services/DbService';

const { width } = Dimensions.get('window');
type Props = NativeStackScreenProps<RootStackParamList, 'Add'>;

const CreateScreen = ({ navigation }: Props) => {
  const [title, setTitle] = useState('');
  const [due, setDue] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(false);

  const handleCreation = async () => {
    if (!title.trim() || !due.trim() || !description.trim()) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    try {
      await createNewBucketItem({ title, due, description, priority });
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not create item. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.heading}>Add a New Bucket List Item</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Due Date"
        value={due}
        onChangeText={setDue}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.switchContainer}>
        <Text>Priority:</Text>
        <Switch value={priority} onValueChange={setPriority} />
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreation}
      >
        <Text style={styles.buttonText}>Create Item</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: width * 0.9,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: 'green',
    paddingVertical: 14,
    borderRadius: 8,
    width: width * 0.9,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});