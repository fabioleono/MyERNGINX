
import React from 'react' 
import { Redirect, Route } from 'react-router-dom'
const DeclaredPublic = ({ component: Component , ...others}) => {
  const consumer = false
  if(consumer) return <Redirect to="/Info" />
  return (
    <Route {...others} render={Component}/>
  )
}
export default DeclaredPublic
