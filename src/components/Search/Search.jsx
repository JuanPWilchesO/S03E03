import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import './Search.css'

function Search({ setLocationApp }) {

  const [arrLocations, setArrLocations] = useState([])
  const [arrNames, setArrNames] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    axios.get('https://rickandmortyapi.com/api/location')
    .then((res) => {
      setArrLocations(res.data.results)
      const planetNames = res.data.results.map(loc => loc.name)  
      setArrNames(planetNames)
    }).catch((err) =>{
      setError(err.message)
    }).finally(() => {
      setLoading(false)
    })
  }, [])


  const handleChange = (e) => {
    const name = e.target.value
    setInputValue(name)
    if(name) {
      const filteredSuggestions = arrNames.filter((loc) => 
        loc.toLowerCase().startsWith(name.toLowerCase())
      );
      setSuggestions(filteredSuggestions)
      setShowSuggestions(true)
    }else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
    setTimeout(()=> {
      setSuggestions([])
      setShowSuggestions(false)
    },0)
  } 

  const setLocation = () => {
    let found = false
    for (const loc of arrLocations){
      if(inputValue === loc.name){
        setLocationApp(loc.id)
        found = true
        break;
      }
    }
    if (!found){
      setError("Planeta no encontrado")
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  return (
    <div className='row text-center container-search'>
      { loading ? (
        <h2 className='title'>Loading...</h2>
      ) : (
        <h2 className='title'>Search for a planet:</h2>
      )}
      <div className='col-sm-6 mx-auto'>
        <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setShowSuggestions(true)}
        className='col-sm-8 input-search'
        />
        <button onClick={setLocation} className="col-sm-4 input-button">Buscar</button>
        {showSuggestions && suggestions.length > 0 && (
          <ul className='col-sm-4 planet-list'>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{cursor: 'pointer', padding: '8px'}}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error ? (
        <div className='alert alert-danger text-bg-danger' role='alert'>
          {error}
        </div>
      ) : <></>}
    </div>
  )
}

export default Search