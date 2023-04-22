import { createContext, useState } from 'react';
import type { ITodosContext, IProviderProps, TodosDTO } from './types';

export const TodosContext = createContext<ITodosContext>({
  contextState: [],
  setContextState: () => {},
});

export const TodosProvider = ({ children }: IProviderProps) => {
  const [contextState, setContextState] = useState<TodosDTO>([]);

  return (
    <TodosContext.Provider value={{ contextState, setContextState }}>
      {children}
    </TodosContext.Provider>
  );
};
