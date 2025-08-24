import React, { createContext, useContext, useState } from 'react';

type Field = {
  id: string;
  name: string;
  crop: string;
  area: string;
};

type FieldContextType = {
  fields: Field[];
  addField: (field: Field) => void;
};

const FieldContext = createContext<FieldContextType | undefined>(undefined);

export const FieldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fields, setFields] = useState<Field[]>([]);

  const addField = (field: Field) => {
    setFields((prev) => [...prev, field]);
  };

  return (
    <FieldContext.Provider value={{ fields, addField }}>
      {children}
    </FieldContext.Provider>
  );
};

export const useFieldContext = () => {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error("useFieldContext must be used within a FieldProvider");
  }
  return context;
};
