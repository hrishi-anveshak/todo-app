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
  handlePresentModalPress: (val: string) => void;
  bottomSheetModalRef: RefObject<BottomSheetModal | null>;
  addTodo: (data: TodoItem) => void;
  todo: TodoItem[];
  editTodo: (updatedItem: TodoItem, key: number) => void;
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
  const [edit, setEdit] = useState<TodoItem | null>({});
  const [sheet, setSheet] = useState<boolean>(false);

  const modalView = () => {
    setModalVisible(!modalVisible);
    if (modalVisible) {
      setEdit({});
    }
  };
  const editModalView = () => setEditModalVisible(!editModalVisible);

  const addTodo = (data: TodoItem) => setTodo(prev => [data, ...prev]);
  const editTodo = (updatedItem: TodoItem) => {
    console.log('updatedItem', updatedItem);

    const index = todo.findIndex(d => d.id === updatedItem.id);
    console.log('todo', todo);
    if (index > -1) {
      const updatedList = [...todo];
      updatedList[index] = updatedItem;
      setTodo(updatedList);
      console.log('updatedList', updatedList);
      setEdit({});
    }
  };

  const editData = (key: keyof TodoItem, data: any) => {
    setEdit({});
    setEdit({key: key, ...data});
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();

    setSheet(!sheet);
  }, [sheet]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);

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
      }}>
      {children}
    </CounterContext.Provider>
  );
};
