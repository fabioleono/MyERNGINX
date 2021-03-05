import React  from 'react' 
import { logOutSession } from "../Molecules/logOut";

import { Redirect, Route,} from 'react-router-dom'
const Protected = ({ component: Component, ...others }) => { // recibo el alias de component
   //console.log('COMPONENTE protected.jsx ', Component);
   //console.log('OTROS  protected.jsx', others, 'PATH--> ', others.path );
   const user = others.location.user;
  
  if(localStorage.getItem("token")) return (
    <Route {...others} component={Component} />
  ); // render se utiliza igual que component
  if(user!==''){
    // Encuentra un usuario valido en componente protegido(Han eliminado el token desde devTools)
    logOutSession(user);
  }
  return <Redirect to="/login" />;
}

  
export default Protected
