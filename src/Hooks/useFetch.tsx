import { useEffect, useState } from 'react';

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

    const request = new Request(URL, {
      signal: controller.signal,
      //Com ... → as propriedades do objeto são copiadas para dentro do novo objeto.
      //Sem ... → o objeto entra como uma propriedade.
      ...OPTIONS,
    });

    async function invocarFetch() {
      try {
        const data = await fetch(request);
        const formattedData = await data.json();
        setData(formattedData);
      } catch (error) {
        //Se você usar AbortController, trate o AbortError. É o comportamento esperado.
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
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
