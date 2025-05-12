import React, {createContext, useState, ReactNode} from 'react';

interface CounterContextType {
  modalVisible: boolean;
  modalView: () => void;
  addTodo: (data: any) => void;
  todo?: any[];
}
interface TodoItem {
  id?: number;
  title?: string;
  description?: string;
  date?: string;
  status?: string;
}

export const CounterContext = createContext<CounterContextType | undefined>(
  undefined,
);

export const CounterProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [todo, setTodo] = useState<TodoItem[]>([]);
  const modalView = () => setModalVisible(!modalVisible);
  const addTodo = (data: any) => setTodo(prev => [data, ...prev]);
  return (
    <CounterContext.Provider value={{modalVisible, modalView, todo, addTodo}}>
      {children}
    </CounterContext.Provider>
  );
};
