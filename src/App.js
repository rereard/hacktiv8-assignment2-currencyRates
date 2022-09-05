import React, { useState, useEffect } from 'react';
import './App.css';

// Jika memungkinkan, tolong gunakan API key anda sendiri
function App() {
  const [currencyRates, setCurrencyRates] = useState({})
  const [multiplier, setMultiplier] = useState(1)
  const getCurrencyData = async () => {
    const request = await fetch('https://api.currencyfreaks.com/latest?apikey=918ed84f507547d59be466f6f89fc9a0&symbols=CAD,IDR,JPY,CHF,EUR,GBP') 
    const data = await request.json()
    setCurrencyRates(data.rates)
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
    <div className='flex justify-center flex-col w-screen h-screen items-center bg-orange-400 text-white'>
      <div className="mb-5">
        <input type="number" placeholder='1' min='1' onChange={(event) => {
          if(event.target.value === ''){
            setMultiplier(1)
          } else{
            setMultiplier(event.target.value)
          }
        }} className='placeholder:text-white w-16 text-right border-b-2 border-orange-300 bg-orange-400'/>
        <span className='ml-2'>USD is equal to:</span>
      </div>
      <table className='table-auto w-3/5 text-center'>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
          <tr>
            <td>CAD</td>
            <td>{buyValue(multipliedRates(currencyRates.CAD))}</td>
            <td>{multipliedRates(currencyRates.CAD)}</td>
            <td>{sellValue(multipliedRates(currencyRates.CAD))}</td>
          </tr>
          <tr>
            <td>EUR</td>
            <td>{buyValue(multipliedRates(currencyRates.EUR))}</td>
            <td>{multipliedRates(currencyRates.EUR)}</td>
            <td>{sellValue(multipliedRates(currencyRates.EUR))}</td>
          </tr>
          <tr>
            <td>IDR</td>
            <td>{buyValue(multipliedRates(currencyRates.IDR))}</td>
            <td>{multipliedRates(currencyRates.IDR)}</td>
            <td>{sellValue(multipliedRates(currencyRates.IDR))}</td>
          </tr>
          <tr>
            <td>JPY</td>
            <td>{buyValue(multipliedRates(currencyRates.JPY))}</td>
            <td>{multipliedRates(currencyRates.JPY)}</td>
            <td>{sellValue(multipliedRates(currencyRates.JPY))}</td>
          </tr>
          <tr>
            <td>CHF</td>
            <td>{buyValue(multipliedRates(currencyRates.CHF))}</td>
            <td>{multipliedRates(currencyRates.CHF)}</td>
            <td>{sellValue(multipliedRates(currencyRates.CHF))}</td>
          </tr>
          <tr>
            <td>GBP</td>
            <td>{buyValue(multipliedRates(currencyRates.GBP))}</td>
            <td>{multipliedRates(currencyRates.GBP)}</td>
            <td>{sellValue(multipliedRates(currencyRates.GBP))}</td>
          </tr>
        </thead>
      </table>
      <div className='mt-5 text-center'>
        <div>Rates are based from 1 USD</div>
        <div>This app uses API from https://currencyfreaks.com/</div>
      </div>
    </div>
  )
}

export default App;
