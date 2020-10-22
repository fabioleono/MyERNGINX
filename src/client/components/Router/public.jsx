import React from 'react' 
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
const Public = ({ component: Component , user, ...others}) => {
  
  // console.log('componente ' , Component);
  // console.log("otros ", others);

const path=`/certificador/${user}`
console.log('path ', path);
 
  if(localStorage.getItem("token")) return <Redirect to={path} />
  return (
    <Route {...others} component={Component}/>
  )
}
const mapStateToProps = (state) => ({
  user: state.profileReducer.user
}); 
const mapDispatchToProps = state => ({})
  
export default connect(mapStateToProps,mapDispatchToProps)(Public)
