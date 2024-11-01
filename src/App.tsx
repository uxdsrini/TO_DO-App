import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './lib/firebase';
import { TodoItem } from './components/TodoItem';
import { TodoForm } from './components/TodoForm';
import { TodoStats } from './components/TodoStats';
import { Todo, Priority } from './types/todo';
import { ListTodo } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as Todo[];
      setTodos(todosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addTodo = async (text: string, priority: Priority) => {
    try {
      await addDoc(collection(db, 'todos'), {
        text,
        priority,
        completed: false,
        createdAt: new Date(),
      });
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      await updateDoc(doc(db, 'todos', id), {
        completed: !todo.completed,
      });
      toast.success(todo.completed ? 'Task unmarked' : 'Task completed!');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'todos', id));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <ListTodo className="w-10 h-10 text-violet-600" />
          <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
        </div>

        <TodoStats todos={todos} />
        
        <div className="bg-white/60 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8">
          <TodoForm onSubmit={addTodo} />
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading tasks...</div>
          ) : todos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No tasks yet. Add one above!</div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;