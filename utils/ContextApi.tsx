import React, {
  createContext,
  useState,
  useCallback,
  useRef,
  RefObject,
  ReactNode,
} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

interface TodoItem {
  id?: number;
  title?: string;
  description?: string;
  date?: string;
  status?: string;
  key?: number;
  editData?: any;
  filter?: string;
}

interface CounterContextType {
  modalVisible: boolean;
  editModalVisible: boolean;
  sheet: boolean;
  modalView: () => void;
  editModalView: () => void;
  edit: TodoItem | null;
  editData: (key: keyof TodoItem, data: any) => void;
  handleSheetChanges: (index: number) => void;
  handlePresentModalPress: () => void;
  bottomSheetModalRef: RefObject<BottomSheetModal | null>;
  addTodo: (data: TodoItem) => void;
  todo: TodoItem[];
  editTodo: (updatedItem: TodoItem) => void;
  statusFilter: (filter: TodoItem[]) => void;
  status: TodoItem[];
}

export const CounterContext = createContext<CounterContextType | undefined>(
  undefined,
);

export const CounterProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [todo, setTodo] = useState<TodoItem[]>([]);
  const [status, setStatus] = useState<TodoItem[]>([]);
  const [edit, setEdit] = useState<TodoItem | null>(null);
  const [sheet, setSheet] = useState<boolean>(false);

  const modalView = () => {
    setModalVisible(prev => !prev);
    if (modalVisible) {
      setEdit(null);
    }
  };

  const editModalView = () => setEditModalVisible(prev => !prev);

  const statusFilter = (filteredList: TodoItem[]) => setStatus(filteredList);

  const addTodo = (data: TodoItem) => setTodo(prev => [data, ...prev]);

  const editTodo = (updatedItem: TodoItem) => {
    const index = todo.findIndex(d => d.id === updatedItem.id);
    if (index > -1) {
      const updatedList = [...todo];
      updatedList[index] = updatedItem;
      setTodo(updatedList);
      setEdit(null);
    }
  };

  const editData = (key: keyof TodoItem, data: any) => {
    setEdit(data);
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setSheet(true);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setSheet(false);
      bottomSheetModalRef.current?.close();
    } else {
      setSheet(true);
    }
  }, []);

  return (
    <CounterContext.Provider
      value={{
        modalVisible,
        modalView,
        todo,
        addTodo,
        handlePresentModalPress,
        handleSheetChanges,
        bottomSheetModalRef,
        sheet,
        edit,
        editData,
        editModalView,
        editModalVisible,
        editTodo,
        statusFilter,
        status,
      }}>
      {children}
    </CounterContext.Provider>
  );
};
