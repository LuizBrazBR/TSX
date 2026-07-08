import React, { useState } from "react";
import Input from "./Components/Input";

function App() {
  const [data, setData] = useState<Vendas[] | null>(null);
  const [dataIn, setDataIn] = useState("");
  const [dataFm, setDataFm] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    async function data() {
      if (!!dataIn !== false && !!dataFm !== false) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://data.origamid.dev/vendas/?inicio=${dataIn}&final=${dataFm}`,
          );
          const json = await response.json();
          setData(json);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    }

    data();
  }, [dataIn, dataFm]);

  interface Vendas {
    id: string;
    nome: string;
    preco: number;
    status: string;
    pagamento: string;
    parcelas: number | null;
    data: string;
  }

  return (
    <div>
      <div>
        <Input
          id="dataInicial"
          type="date"
          label="Início"
          change={setDataIn}
          value={dataIn}
        />
        <Input
          id="dataFinal"
          type="date"
          label="Final"
          change={setDataFm}
          value={dataFm}
        />
      </div>
      <div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul>
            {data?.map((v) => (
              <li key={v.id}>
                {v.nome}: {v.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
