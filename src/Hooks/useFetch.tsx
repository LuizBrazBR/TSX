import React, { useEffect } from 'react'


interface FetchState<T> {
   data: T | null;
   loading: boolean;
   error: string | null;
 }




const useFetch = (url: string, t: unknown) => {


  return (
    useEffect(() => {
    async function invocarFetch(url: string): Promise<FetchState<typeof t>> {
    const data = await fetch(url)
    const formattedData = await data.json()
    return formattedData
  }
      console.log(invocarFetch(url))
    }, [url])
  )

  
}

export default useFetch