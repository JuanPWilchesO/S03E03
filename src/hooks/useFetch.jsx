import axios from "axios";
import { useState } from "react";

function useFetch() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function fetchData(url) {
    setLoading(true)
    axios.get(url)
    .then((res) => {
      setData(res)
    }).catch((err) => {
      setError(err.message)
    }).finally(() => {
      setLoading(false)
    })
  }

  return {
    data,
    fetchData,
    loading,
    error
  }
}

export default useFetch