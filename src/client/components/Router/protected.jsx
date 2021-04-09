// import axios from 'axios';
import React  from 'react' 
import { Redirect, Route } from 'react-router-dom'



const Protected = ({ component: Component, ...others }) => { // recibo el alias de component
      
    if (localStorage.getItem("token")) {
      return <Route {...others} component={Component} />;
    } else {
      return <Redirect to="/error" />;
    }
    
}

  
export default Protected
