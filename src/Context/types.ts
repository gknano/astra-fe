import { ReactNode } from 'react';

interface ITodosEntries {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type TodosDTO = ITodosEntries[] | [];

export interface ITodosContext {
  contextState: TodosDTO;
  setContextState: (todos: TodosDTO) => void;
}

export interface IProviderProps {
  children: ReactNode;
}
