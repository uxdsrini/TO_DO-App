import React from 'react';
import { CheckCircle2, ListTodo, AlertTriangle } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const highPriorityTodos = todos.filter((todo) => !todo.completed && todo.priority === 'high').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between border border-gray-100">
        <div className="flex items-center space-x-2">
          <ListTodo className="w-5 h-5 text-violet-600" />
          <span className="text-sm font-medium">Total Tasks</span>
        </div>
        <span className="text-2xl font-bold text-gray-800">{todos.length}</span>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between border border-gray-100">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium">Completed</span>
        </div>
        <span className="text-2xl font-bold text-gray-800">{completedTodos}</span>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between border border-gray-100 sm:col-span-2 lg:col-span-1">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span className="text-sm font-medium">High Priority</span>
        </div>
        <span className="text-2xl font-bold text-gray-800">{highPriorityTodos}</span>
      </div>
    </div>
  );
}