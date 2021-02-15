import React from 'react' 
//import { Redirect, Route } from 'react-router-dom'
import { Route } from "react-router-dom";
const Public = ({ component: Component , ...others}) => {
  
 console.log('componente file public.jsx' , Component);
//    console.log("otros file public.jsx", others);
 
  //if(localStorage.getItem("token")) return <Redirect to="/" />
  return (
    <Route {...others} component={Component}/>
  )
}

  
export default Public
