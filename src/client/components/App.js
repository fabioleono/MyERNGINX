import React from 'react' 
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Router/routes'

const App = () => {
  return (
    <div>
      STACK MyERN
      <Router>
        <Routes />
      </Router> 
    </div>
  )
}
export default App
