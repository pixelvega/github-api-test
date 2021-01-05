import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.scss';
import useGetRepositories from 'services/useGetRepositories';
import { IGetRepositoriesResponse } from 'services/dto';

export default function App() {
  const { register, handleSubmit, errors, watch, reset } = useForm();
  const { getRepositories,
    loading,
    error } = useGetRepositories();
  const [apiResults, setApiResults] = useState<IGetRepositoriesResponse | null>(null);

  const onSubmit = async (values: any) => {
    const querySearch = values.querySearch;
    if (querySearch.length > 0 && querySearch.length <= 256) {
      const apiResults = await getRepositories(querySearch);
      setApiResults(apiResults);
    }
  }

  return (
    <div className="App">
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="querySearch">
            <span className="label-text">Buscar repositorio por lenguaje...</span>
            <input
              type="text"
              id="querySearch"
              name="querySearch"
              placeholder="React"
              ref={register}
            />
          </label>
        </form>
      </div>
      <div>

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

      </div>
    </div>
  );
}
