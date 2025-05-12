import React, {createContext, useState, ReactNode} from 'react';

interface CounterContextType {
  modalVisible: boolean;
  modalView: () => void;
}

export const CounterContext = createContext<CounterContextType | undefined>(
  undefined,
);

export const CounterProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const modalView = () => setModalVisible(!modalVisible);

  return (
    <CounterContext.Provider value={{modalVisible, modalView}}>
      {children}
    </CounterContext.Provider>
  );
};
