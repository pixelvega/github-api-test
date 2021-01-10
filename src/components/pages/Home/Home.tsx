import { useContext, useEffect } from 'react';
import { SearcherContext } from 'context/SearcherContext';
import './Home.scss';

export default function Home() {
  const { resetSearcherQuery } = useContext(SearcherContext);

  useEffect(() => {
    // reset input value if value !== ''
    resetSearcherQuery()
  }, [])

  return (
    <div className="Home">
      <div className="bg-img"></div>
      <h1>GitHub API Test</h1>
      <p>Search repositories by language</p>
    </div>
  )
}