import React, { createContext, useContext, useState } from 'react';
import { isEmpty as _isEmpty } from 'lodash';
import { get as _get } from 'lodash';

export type AppContextType = {
  version: string;
  setVersion: (version: string) => void;
};

const defaultContext: AppContextType = {
  version: '1.0',
  setVersion: () => {},
};

export const AppContext = createContext(defaultContext);
export const useAppContext = () => useContext(AppContext) as AppContextType;

export function useAppContextStore(): AppContextType {
  const [version, setVersion] = useState(defaultContext.version);
  return {
    version,
    setVersion,
  };
}

interface AuxProps {
  children: React.ReactNode;
}

export function AppContextContainer({ children }: AuxProps) {
  const context = useContext(AppContext);
  const data = useAppContextStore();

  return (
    <AppContext.Provider {...context} value={data}>
      {children}
    </AppContext.Provider>
  );
}
