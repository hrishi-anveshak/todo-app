import React, {
  createContext,
  useState,
  useCallback,
  useRef,
  RefObject,
} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

interface CounterContextType {
  modalVisible: boolean;
  sheet: boolean;
  modalView: () => void;
  handlePresentModalPress: () => void;
  handleSheetChanges: (index: number) => void;
  bottomSheetModalRef: RefObject<BottomSheetModal | null>;
  addTodo: (data: TodoItem) => void;
  todo: TodoItem[];
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
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [todo, setTodo] = useState<TodoItem[]>([]);
  const [sheet, setSheet] = useState<boolean>(false);
  const modalView = () => setModalVisible(!modalVisible);
  const addTodo = (data: any) => setTodo(prev => [data, ...prev]);

  const handlePresentModalPress = useCallback(() => {
    console.log('Modal press called!');
    bottomSheetModalRef.current?.present();
    setSheet(!sheet);
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      setSheet(false);
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
      }}>
      {children}
    </CounterContext.Provider>
  );
};
