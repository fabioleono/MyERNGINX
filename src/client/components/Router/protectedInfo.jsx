import React from 'react' 
import { Redirect, Route } from 'react-router-dom'
const ProtectedPublic = ({ component: Component, ...others }) => { // recibo el alias de component
  
  if (localStorage.getItem("tokenPublic"))
    return <Route {...others} component={Component} />; // render se utiliza igual que component
  return <Redirect to="/LoginPublic" />;
}
export default ProtectedPublic
