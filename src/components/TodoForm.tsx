import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { Priority } from '../types/todo';

interface TodoFormProps {
  onSubmit: (text: string, priority: Priority) => Promise<void>;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await onSubmit(text, priority);
    setText('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="w-full sm:w-40 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent bg-white/50 backdrop-blur-sm appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20fill%3D%22%236b7280%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:20px] bg-[center_right_1rem]"
        >
          <option value="low">🔵 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Add Task
      </button>
    </form>
  );
}