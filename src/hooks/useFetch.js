import { useEffect, useState } from "react";

export default function useFetch(url) {

    const [isLoading, setLoading] = useState(false);
    const [responseJSON, setJSON] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        let cancel = false;
        async function fetchData() {
           
            setLoading(true);
            try {
              
              let request = await fetch(url);
              let resp = await request.json();
              if(cancel) return true
              setJSON(resp);
              
            } catch (error) {
               
                setError(error);
            }
            
            setLoading(false);
        }
       
        fetchData();

        return () => (cancel = true);


    }, [url]);

    return { responseJSON, isLoading, error }
}  


