import React from 'react' 
import { Redirect, Route } from 'react-router-dom'

const Public = ({ component: Component , ...others}) => {
  
 //console.log('COMPONENTE  public.jsx ', Component, 'otras props ', others , 'PATH--> ', others.path );

if (!localStorage.getItem("token")) {
  // Si hay un Token existe un login Valido. Puede ocurrir despues de loguearse yendo ATRAS con el browser. Los browser antiguos se comportan diferente con la navegacion atras adelante
  return <Route {...others} component={Component} />;
} else {
  return <Redirect to="/" />;
}
  // return (
  //   <Route {...others} component={Component}/>
  // )
}

  
export default Public
