import React, { createContext, useContext, useCallback } from 'react';
import leoProfanity from 'leo-profanity';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const filter = useCallback((text) => leoProfanity.clean(text), []);

  return (
    <FilterContext.Provider value={filter}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
