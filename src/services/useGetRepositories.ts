import { useState } from 'react';

const useGetRepositories = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const getRepositories = async (querySearch: string) => {

    try {
      setLoading(true);
      const response = await fetch(`https://api.github.com/search/repositories?q=${querySearch}&page=1&per_page=10&sort=forks&order=asc`);
      if (!response.ok) throw await response.json();
      setError(null);
      setLoading(false);
      return response.json();

    } catch (e) {
      setLoading(false);
      setError(e);
      console.log('catch e ', e);
    }

  }

  return {
    getRepositories,
    loading,
    error
  }
}

export default useGetRepositories;