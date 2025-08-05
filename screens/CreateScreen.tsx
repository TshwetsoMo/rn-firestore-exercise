import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { createNewBucketItem } from '../services/DbService';

const CreateScreen = () => {
  const navigation: any = useNavigation();

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(false);
  const [due, setDue] = useState('');
  const [description, setDescription] = useState('');

  const handleCreation = async () => {
    if (!title || !due || !description) {
      Alert.alert('Missing Fields', 'Please fill out all fields.');
      return;
    }

    const newItem = {
      title,
      due,
      description,
      priority,
    };

    try {
      await createNewBucketItem(newItem);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Could not create item. Try again.');
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          style={styles.inputField}
          placeholder="Bucket List Title"
          onChangeText={setTitle}
          value={title}
        />

        <TextInput
          style={styles.inputField}
          placeholder="When do you want it done?"
          onChangeText={setDue}
          value={due}
        />

        <TextInput
          multiline
          numberOfLines={4}
          style={styles.inputField}
          placeholder="Description of bucket list"
          onChangeText={setDescription}
          value={description}
        />

        <View style={styles.switch}>
          <Switch
            trackColor={{ false: 'black', true: 'green' }}
            thumbColor={priority ? 'yellow' : 'white'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(toggle) => setPriority(toggle)}
            value={priority}
          />
          <Text>Priority?</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCreation}>
          <Text style={styles.buttonText}>Create Bucket List Item</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputField: {
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 15,
    padding: 10,
  },
  button: {
    backgroundColor: 'green',
    textAlign: 'center',
    padding: 15,
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  switch: {
    marginTop: 15,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 10,
  },
});
