import React from 'react' 
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Router/routes'

const App = () => {
  return (
    <>
       <Router>
        <Routes />
      </Router> 
    </>
  )
}
export default App
