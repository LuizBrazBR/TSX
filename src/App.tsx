// Crie um custom hook chamado useFetch.

import { useMemo } from "react";
import useFetch from "./Hooks/useFetch";

// 1 - Este hook deve retornar a interface:
// interface FetchState<T> {
//   data: T | null;
//   loading: boolean;
//   error: string | null;
// }

// Onde T é um valor genérico que deverá ser passado quando o Hook for utilizado.

// Estado reativo      → mudança atualiza a UI
// Estado não reativo  → mudança não atualiza a UI
// Estado derivado     → valor calculado de outro estado
// 2 - data, loading e error são estados reativos (useState).

// 3 - O hook deve receber a URL e OPTIONS como argumentos (interfaces de fetch).

// 4 - O fetch deve ocorrer em um useEffect, com dependência apenas da URL.

// 5 - Use AbortController para abortar o fetch caso o componente desmonte, antes do fetch ser concluído.

// 6 - Teste o Hook com a api: https://data.origamid.dev/produtos
interface Produto {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  descricao: string;
  internacional: boolean;
}

function App() {
  /*
  Dependências do useEffect:

  - Primitivos (string, number, boolean) → compara pelo valor.
  - Objetos, arrays e funções → compara pela referência.

  - useMemo → memoriza valores (objetos, arrays).
  - useCallback → memoriza funções.

  Objetos/arrays/funções usados como dependência podem precisar
  de memoização para manter a referência estável.
*/
  const options = useMemo(
    () => ({
      method: "GET",
    }),
    [],
  );

  // O tipo é informado na chamada do hook.
  // Cada requisição define o formato esperado da resposta.
  // Não faz sentido obrigar o hook a sempre retornar um array,
  // porque algumas APIs retornam um único objeto.
  const data = useFetch<Produto[]>(
    "https://data.origamid.dev/produtos",
    options,
  );
  console.log(data);

  return (
    <h1>Se não faz return, o main reclama que não pode chamar o App.tsx</h1>
  );
}

export default App;
