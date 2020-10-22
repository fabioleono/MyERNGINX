import React from 'react' 
import { Redirect, Route } from 'react-router-dom'
const Protected = ({ component: Component, ...others }) => { // recibo el alias de component
   console.log('OTROS ', others);
  
  if(localStorage.getItem("token")) return <Route {...others} component={Component}/> // render se utiliza igual que component
  return <Redirect to="/login" />;
}
export default Protected
