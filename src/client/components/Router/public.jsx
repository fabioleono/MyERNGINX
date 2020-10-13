import React from 'react' 
import { Redirect, Route } from 'react-router-dom'
const Public = ({ component: Component , ...others}) => {
  
  // console.log('componente ' , Component);
  // console.log("otros ", others);

//  const path=`/certignv/${Component.match.params.user}`
//  console.log('path ', path);
 
  if(localStorage.getItem("token")) return <Redirect to="/" />
  return (
    <Route {...others} component={Component}/>
  )
}
export default Public
