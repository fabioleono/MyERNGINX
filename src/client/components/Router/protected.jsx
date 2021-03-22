import axios from 'axios';
import React  from 'react' 
import { Redirect, Route, useHistory,} from 'react-router-dom'
import { logOutUser } from '../../Redux/actionCreators';
import { store } from '../../Redux/store';

const Protected = ({ component: Component, ...others }) => { // recibo el alias de component
   //console.log('COMPONENTE protected.jsx ', Component);
   //console.log('OTROS  protected.jsx', others, 'PATH--> ', others.path );
   const user = others.location.user;
   let history = useHistory()
   const logOutSession = () => {
     store.dispatch(logOutUser());
     axios
       .put(`${process.env.REACT_APP_API_URL}/logout/${user}`)
       .then((res) => {
         history.push("/");
       })
       .catch((error) => {
         const { status } = error.response;
         //console.log("ERROR LogoutSession->Profile.jsx", data);
         //return (window.location = `/error`);
         history.push(`/error?error=${status}`);
       });
   };
  
  if(localStorage.getItem("token")) return (
    <Route {...others} component={Component} />
  ); // render se utiliza igual que component
  if(user){
    // No renderiza el componente protegido y hay un usuario valido, (Han eliminado el token desde devTools)
    logOutSession(user);
  }
  return <Redirect to="/login" />;
}

  
export default Protected
