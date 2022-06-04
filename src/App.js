import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState(false)
  const [capital, setCapital] = useState('Paris')
  const [tmp, setTmp] = useState()

    useEffect(() => {
        console.log('effect')    
        axios
        .get('https://restcountries.com/v3.1/all')      
        .then(response => {
            console.log('promise fulfilled')        
            setCountries(response.data)
        })
    }, [])

    useEffect(() => {
      console.log('effect')    
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=b7b33d1e92f636655a46e4ccd739a6d1&units=metric`)   
      .then(response => {
          console.log('promise fulfilled')        
          setTmp(response.data)
      })
  }, [capital]) // when the state capital changes this useEffect will get rerun

    const handleInput = (event) => {
      const s = event.target.value
      if (s === '') {
          setFilter(false)
          setInputValue(s)
      }
      else {
          setFilter(true)
          setInputValue(s)
      }
  }

  const countriesToShow = filter
    ? countries.filter(country => country.name.common.toLowerCase().includes(inputValue.toLowerCase()))
    : countries


  const CountriesDisplayed = () => {
      if (countriesToShow.length > 10) {
        return (
          <div>Too many countries, be more precise!</div>
        )
      }

      else if (countriesToShow.length === 1) {
        var languages = countriesToShow[0].languages
        setCapital(countriesToShow[0].capital[0])
        return (
          <div>
              <h1>{countriesToShow[0].name.common}</h1>
              Capital is {countriesToShow[0].capital[0]}
              <br/>
              Area is {countriesToShow[0].area}
              <h4>Languages:</h4>
              {Object.keys(languages).map(function(keyName, keyIndex) {
                return (
                <li>
                {languages[keyName]}
                </li>
                )
              }
              )}
              <br/>
              <img src={countriesToShow[0].flags.png}/>

              <h2>Weather in {countriesToShow[0].name.common}</h2>
              <div> 
              Temperature {tmp.main.temp}
              <br/>
              {tmp.weather[0].description}
              </div>
              <img src={`http://openweathermap.org/img/wn/${tmp.weather[0].icon}@2x.png`}/>
              <div> 
              Wind {tmp.wind.speed}
              </div>
          </div>
        )
      }

      else {
        return (
          <div> 
            {countriesToShow.map(country => 
                <div>
                {country.name.common}
                <button onClick={() => setInputValue(country.name.common)}>Show</button>
                
                </div>
        )
      }
      </div>
    )  
  }
}
//alert(`hello${lat}`)

  return (
    <div> 
    <h1>Countries</h1>

      Find countries <input value={inputValue} onChange={handleInput}/>

      <CountriesDisplayed/>


  </div>

  )
}

export default App
