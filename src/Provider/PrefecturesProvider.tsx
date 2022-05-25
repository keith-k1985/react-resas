import { createContext, ReactNode, useState, FC } from 'react';
import { prefectures } from '../types/index';

type Props = {
  children: ReactNode;
};

export const PrefecturesContext = createContext(
  {} as {
    prefectures: Array<prefectures>;
    setPrefectures: any;
  }
);

export const PrefecturesProvider: FC<Props> = ({ children }) => {
  const [prefectures, setPrefectures] = useState<Array<prefectures>>([]);
  return (
    <PrefecturesContext.Provider value={{ prefectures, setPrefectures }}>
      {children}
    </PrefecturesContext.Provider>
  );
};
