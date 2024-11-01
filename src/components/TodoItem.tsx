import React from 'react';
import { Check, Trash2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Todo } from '../types/todo';
import { PriorityBadge } from './PriorityBadge';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 gap-4">
      <div className="flex items-start space-x-4 flex-1 min-w-0">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-1 w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-green-500'
          }`}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>
        <div className="flex flex-col space-y-2 min-w-0 flex-1">
          <span
            className={`text-gray-800 break-words ${
              todo.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {todo.text}
          </span>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <PriorityBadge priority={todo.priority} />
            <div className="flex items-center text-gray-500">
              <Clock className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
              <span className="truncate">{formatDistanceToNow(todo.createdAt, { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="self-end sm:self-center ml-auto sm:ml-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}