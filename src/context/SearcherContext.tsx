import React, { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode
}

const SearcherContext = createContext<any>({});

const SearcherContextProvider = ({ children }: Props) => {
  const [searcherQuery, setSearcherQuery] = useState('');

  const resetSearcherQuery = () => {
    if (searcherQuery !== '') {
      setSearcherQuery('');
    }
  }

  return (
    <SearcherContext.Provider value={{ searcherQuery, setSearcherQuery, resetSearcherQuery }}>
      {children}
    </SearcherContext.Provider>
  )
}

export { SearcherContext, SearcherContextProvider };