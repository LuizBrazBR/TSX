import React, { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dataInterface: FetchState<T> = {
    data: data,
    loading: loading,
    error: error,
  };

  useEffect(() => {
    async function invocarFetch(url: string) {
      try {
        const data = await fetch(url);
        const formattedData = await data.json();
        setData(formattedData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
    invocarFetch(url);
  }, [url]);

  return dataInterface;
};

export default useFetch;
