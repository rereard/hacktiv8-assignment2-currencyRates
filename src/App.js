import React, { useState, useEffect } from 'react';
import './App.css';

// Jika memungkinkan, tolong gunakan API key anda sendiri
function App() {
  const [currencyRates, setCurrencyRates] = useState({})
  const [loading, setLoading] = React.useState(true);
  let currencyKeys = Object.keys(currencyRates)
  const [multiplier, setMultiplier] = useState(1)
  const getCurrencyData = async () => {
    const request = await fetch('https://api.currencyfreaks.com/latest?apikey=918ed84f507547d59be466f6f89fc9a0&symbols=CAD,IDR,JPY,CHF,EUR,GBP') 
    const data = await request.json()
    setCurrencyRates(data.rates)
    setLoading(false)
  }
  useEffect(() => {
    getCurrencyData()
  }, [])
  const buyValue = (rates) => {
    rates += rates*0.05
    return rates
  }
  const sellValue = (rates) => {
    rates -= rates*0.05
    return rates
  }
  const multipliedRates = (rates) => {
    parseFloat(rates)
    rates *= multiplier
    return rates
  }
  return (
    <div className='flex justify-center flex-col w-full h-screen items-center bg-orange-400 text-white'>
      <div className="mb-5">
        <input type="number" placeholder='1' min='1' onChange={(event) => {
          if(event.target.value === ''){
            setMultiplier(1)
          } else{
            setMultiplier(event.target.value)
          }
        }} className='w-16 placeholder:text-orange-200 text-right border-b-2 border-orange-300 bg-orange-400'/>
        <span className='ml-2'>USD is equal to:</span>
      </div>
      {loading ? (<i>Loading Data...</i>) : (
        <table className='table-auto w-3/5 text-center overflow-x-auto'>
          <thead>
            <tr>
              <th>Currency</th>
              <th>We Buy</th>
              <th>Exchange Rate</th>
              <th>We Sell</th>
            </tr>
          </thead>
          <tbody>
            {currencyKeys.map((key) => (
              <tr>
                <td>{key}</td>
                <td>{buyValue(multipliedRates(currencyRates[key]))}</td>
                <td>{multipliedRates(currencyRates[key])}</td>
                <td>{sellValue(multipliedRates(currencyRates[key]))}</td>
              </tr>
            ))}
          </tbody>    
        </table>
      )}
      <div className='mt-5 text-center'>
        <div>Rates are based from USD</div>
        <div>This app uses API from https://currencyfreaks.com/</div>
      </div>
    </div>
  )
}
export default App;
