import React from 'react' 
import { Redirect, Route } from 'react-router-dom'
const Declared = ({ component: Component , ...others}) => {
    
  if(localStorage.getItem("token")) return <Redirect to="/CertiGNV" />
  return (
    <Route {...others} render={Component}/>
  )
}
export default Declared
