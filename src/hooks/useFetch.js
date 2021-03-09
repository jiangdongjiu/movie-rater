import { useState, useEffect } from "react";
import { API } from '../api-service';
import { useCookies } from "react-cookie";

function useFetch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [token] = useCookies(['mr-token']);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError();
      const data = await API.getMovie(token['mr-token'])
        .catch( error => setError(error))
      setData(data);
      setLoading(false);
    } // async will help to wait the function resolved first. so we can call it later.

    fetchData();
  }, [token]);

  return [data, loading, error]
}

export {useFetch};