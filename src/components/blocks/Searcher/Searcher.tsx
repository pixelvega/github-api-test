import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SearcherContext } from 'context/SearcherContext';
import { useHistory } from 'react-router-dom';
import './Searcher.scss';

export default function Searcher() {
  const history = useHistory();
  const { searcherQuery, setSearcherQuery } = useContext(SearcherContext);
  const { register, handleSubmit, errors, setValue } = useForm();

  const onSubmit = async (values: any) => {
    const inputQuerySearcher = values.inputQuerySearcher;

    if (inputQuerySearcher.length > 0 && inputQuerySearcher.length <= 256) {
      setSearcherQuery(inputQuerySearcher);
      history.push('/search');
    }
  }

  useEffect(() => {
    if (searcherQuery !== undefined && searcherQuery === '') {
      setValue('inputQuerySearcher', '');
    }
  }, [searcherQuery])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="header-search"
    >
      <label htmlFor="inputQuerySearcher">
        {/* <span className="label-text">Buscar repositorio por lenguaje...</span> */}
        <input
          type="text"
          className="header-search__input"
          id="inputQuerySearcher"
          name="inputQuerySearcher"
          placeholder="Search repositories..."
          ref={register({ required: true })}
          defaultValue={""}
        />
      </label>
    </form>
  )
}