import { useEffect, useState, useContext } from 'react';
import { SearcherContext } from 'context/SearcherContext';
import useGetRepositories from 'services/useGetRepositories';
import { IGetRepositoriesResponse } from 'services/dto';
import Spinner from '../Spinner/Spinner';

export default function TableResults(props: any) {
  const paramsQuery = props.match.params.querySearch;
  const { searcherQuery, setSearcherQuery } = useContext(SearcherContext);
  const { getRepositories,
    loading,
    error } = useGetRepositories();
  const [apiResults, setApiResults] = useState<IGetRepositoriesResponse | null>(null);

  useEffect(() => {
    const querySearch = searcherQuery;
    if (querySearch.length > 0 && querySearch.length <= 256) {
      // when searcherQuery  has value get results
      handleGetRepositories(querySearch);
    } else if (paramsQuery) {
      // when refresh page set value in input
      setSearcherQuery(paramsQuery);
    }
  }, [searcherQuery])

  const handleGetRepositories = async (querySearch: string) => {
    const apiResults = await getRepositories(querySearch);
    setApiResults(apiResults);
  }

  return (
    <section>
      {loading &&
        <>
          <h2>Buscando resultados para la búsqueda <em>"{searcherQuery}"</em></h2>
          <Spinner />
        </>
      }
      {(error && !loading) &&
        <div>{error?.message}</div>
      }
      {!loading && !error && apiResults?.items &&

        <table>
          <caption>
            Resultados de búsqueda para <em>"{searcherQuery}"</em>
          </caption>
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
    </section>
  )
}