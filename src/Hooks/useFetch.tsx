import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

//CONTRATO DE OPTIONS
interface options {
  method?: string | undefined;
  headers?: HeadersInit | undefined;
  body?: BodyInit | undefined | null;
}

//OPTIONS É OPCIONAL
const useFetch = <T,>(URL: string, OPTIONS?: options) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  //Como o TypeScript não consegue adivinhar que depois você pretende colocar uma string, você precisa dizer explicitamente:
  const [error, setError] = useState<string | null>(null);

  const dataInterface: FetchState<T> = {
    data: data,
    loading: loading,
    error: error,
  };

  useEffect(() => {
    const controller = new AbortController();
    const request = new Request(URL, OPTIONS);

    async function invocarFetch() {
      try {
        const data = await fetch(request);
        const formattedData = await data.json();
        setData(formattedData);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else setError(null);
      } finally {
        setLoading(false);
      }
    }
    invocarFetch();

    return () => {
      controller.abort();
    };
  }, [URL, OPTIONS]);

  return dataInterface;
};

export default useFetch;
