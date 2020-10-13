
import React from 'react' 
import { Redirect, Route } from 'react-router-dom'
const DeclaredPublic = ({ component: Component , ...others}) => {
  // console.log("otros info", others);
  // const path = `/info/${Component.match.params.consumer}`;
  // console.log("path info", path);
  if(localStorage.getItem('tokenPublic')) return <Redirect to="/" />
  return (
    <Route {...others} component={Component}/>
  )
}
export default DeclaredPublic
