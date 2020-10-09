import React from 'react' 
import { Redirect, Route } from 'react-router-dom'
const Public = ({ component: Component , ...others}) => {
  
  // console.log('componente ' , Component);
  // console.log("otros ", others);
 // const path=`/CertiGNV/${match.params.user}`
  if(localStorage.getItem("token")) return <Redirect to="/" />
  return (
    <Route {...others} component={Component}/>
  )
}
export default Public
