import { useContext, useEffect } from 'react';
import { SearcherContext } from 'context/SearcherContext';

export default function Home() {
  const { resetSearcherQuery } = useContext(SearcherContext);

  useEffect(() => {
    resetSearcherQuery()
  }, [])

  return (
    <>
      HOME
    </>
  )
}