import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

// TODO: Add here the definition of an Apollo client

ReactDOM.render(
  // TODO: Replace `<>` by an Apollo provider with the Apollo client
  <React.StrictMode>
    <BrowserRouter>
      <>
        <App />
      </>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
