import React from 'react' 
import { Redirect, Route } from 'react-router-dom'
const ProtectedPublic = ({ component: Component, ...others }) => { // recibo el alias de component
  const consumer = false // valida localStorage
  if(consumer) return <Route {...others} render={Component}/> // render se utiliza igual que component
  return <Redirect to="/LoginPublic" />;
}
export default ProtectedPublic
