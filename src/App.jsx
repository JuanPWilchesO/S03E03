import { useEffect, useState } from "react"
import useFetch from "./hooks/useFetch"
import 'bootstrap/dist/css/bootstrap.min.css'
import LocationCard from "./components/LocationCard/LocationCard.jsx"
import ResidentsSection from "./components/ResidentsSection/ResidentsSection.jsx"
import Search from "./components/Search/Search.jsx"
import './App.css'

function App() {

  const { data, fetchData, loading, error } = useFetch()

  const [location, setLocation] = useState(1)

  useEffect(() => {
    fetchData(`https://rickandmortyapi.com/api/location/${location}`)
  }, [location])

  const getValueSearch = (value) => {
    setLocation(value)
  }

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row container-title">
          <h2 className="col title-app">Rick and Morty - App</h2>
        </div>
        <div>
          <Search setLocationApp={getValueSearch}/>
        </div>
        {error ? (
          <h2>{error}</h2>
        ): (
        <br/>
        )}
        {loading ? (
          <h2>Loading Data...</h2>
        ) : (
          <br />
        )}
        <LocationCard data = {data.data}/>
        <ResidentsSection data = {data.data?.residents}/> 
      </div>
    </div>
  )
}

export default App
