
import React from 'react' 
import { Redirect, Route } from 'react-router-dom'
const DeclaredPublic = ({ component: Component , ...others}) => {
  
  if(localStorage.getItem('tokenPublic')) return <Redirect to="/Info" />
  return (
    <Route {...others} component={Component}/>
  )
}
export default DeclaredPublic
