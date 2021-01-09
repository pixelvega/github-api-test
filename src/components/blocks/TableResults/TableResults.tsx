import { useEffect, useState, useContext } from 'react';
import { SearcherContext } from 'context/SearcherContext';
import useGetRepositories from 'services/useGetRepositories';
import { IGetRepositoriesResponse } from 'services/dto';

export default function TableResults() {
  const { searcherQuery } = useContext(SearcherContext);
  const { getRepositories,
    loading,
    error } = useGetRepositories();
  const [apiResults, setApiResults] = useState<IGetRepositoriesResponse | null>(null);

  useEffect(() => {
    const querySearch = searcherQuery;
    if (querySearch.length > 0 && querySearch.length <= 256) {
      handleGetRepositories(querySearch);
    }
  }, [searcherQuery])

  const handleGetRepositories = async (querySearch: string) => {
    const apiResults = await getRepositories(querySearch);
    setApiResults(apiResults);
  }

  return (
    <>
      <p>RESULTADOS DE BÚSQUEDA PARA: {searcherQuery}</p>
      {loading && "loading"}
      {(error && !loading) &&
        <div>{error?.message}</div>
      }
      {!loading && !error && apiResults?.items &&

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {apiResults.items.length >= 1 ?
              <>
                {apiResults.items.map((item: any) => {
                  const { name, html_url, id } = item;
                  return (
                    <tr key={id}>
                      <td>{name}</td>
                      <td><a href={html_url}>{html_url}</a></td>
                    </tr>
                  )
                })}
              </>
              :
              <tr>
                <td colSpan={2}>No hay resultados para tu búsqueda.</td>
              </tr>
            }
          </tbody>
        </table>
      }
    </>
  )
}