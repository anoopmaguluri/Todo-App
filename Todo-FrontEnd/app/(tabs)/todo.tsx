import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../constants/todo'; // Import the utility functions

export default function TodoScreen() {
  const [todos, setTodos] = useState<{ _id: string; text: string; completed: boolean }[]>([]); // Store to-do list
  const [newTodo, setNewTodo] = useState(''); // Input for adding a new to-do
  const [editingTodo, setEditingTodo] = useState<string | null>(null); // Current todo being edited

  // Fetch all todos from the backend
  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
      Alert.alert('Error', 'Failed to fetch todos. Please try again.');
    }
  };

  // Add a new todo
  const handleAddTodo = async () => {
    if (!newTodo.trim()) {
      Alert.alert('Validation Error', 'Todo cannot be empty.');
      return;
    }

    try {
      const data = await createTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
      Alert.alert('Error', 'Failed to add todo. Please try again.');
    }
  };

  // Delete an existing todo
  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      Alert.alert('Error', 'Failed to delete todo. Please try again.');
    }
  };

  // Update an existing todo
  const handleUpdateTodo = async (id: string, updatedText: string) => {
    if (!updatedText.trim()) {
      Alert.alert('Validation Error', 'Todo cannot be empty.');
      return;
    }

    try {
      const updatedTodo = await updateTodo(id, updatedText, false);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
      setEditingTodo(null); // Clear editing state
    } catch (error) {
      console.error('Error updating todo:', error);
      Alert.alert('Error', 'Failed to update todo. Please try again.');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      {/* Add To-Do Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          value={newTodo}
          onChangeText={setNewTodo}
        />
        <Button title="Add" onPress={handleAddTodo} />
      </View>

      {/* To-Do List */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            {/* Editing Input */}
            {editingTodo === item._id ? (
              <TextInput
                style={styles.editInput}
                value={item.text}
                onChangeText={(text) =>
                  setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                      todo._id === item._id ? { ...todo, text } : todo
                    )
                  )
                }
              />
            ) : (
              <Text style={styles.todoText}>{item.text}</Text>
            )}

            {/* Actions */}
            <View style={styles.actions}>
              {editingTodo === item._id ? (
                <TouchableOpacity onPress={() => handleUpdateTodo(item._id, item.text)}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setEditingTodo(item._id)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => handleDeleteTodo(item._id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  todoText: { fontSize: 18 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  editText: { color: 'blue', marginRight: 10 },
  saveText: { color: 'green', marginRight: 10 },
  deleteText: { color: 'red' },
  editInput: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 5, borderRadius: 5 },
});
