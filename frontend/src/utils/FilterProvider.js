import React, { createContext, useContext, useCallback } from 'react';
import leoProfanity from 'leo-profanity';

const FilterContext = createContext(null);

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const filterFunction = useCallback((input) => leoProfanity.clean(input), []);

  return <FilterContext.Provider value={filterFunction}>{children}</FilterContext.Provider>;
};
