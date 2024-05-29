import React, { createContext, useContext } from 'react';
import leoProfanity from 'leo-profanity';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const filter = (text) => leoProfanity.clean(text);

  return (
    <FilterContext.Provider value={filter}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);

