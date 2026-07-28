import React, { useEffect } from 'react'


interface FetchState<T> {
   data: T | null;
   loading: boolean;
   error: string | null;
 }




const useFetch =  <T,>(url: string, setData: React.Dispatch<React.SetStateAction<T[]>>) => {


  return (
    useEffect(() => {
    async function invocarFetch(url: string): Promise<FetchState<T>> {
    const data = await fetch(url)
    const formattedData = await data.json()
    setData(formattedData)
    return formattedData
  }
      invocarFetch(url)
    }, [url, setData])
  )

  
}

export default useFetch