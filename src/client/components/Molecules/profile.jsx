import React, { createRef } from 'react' 
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
const subMenu = createRef()

const log_Out = () => {
  if(localStorage.getItem("token")){
    localStorage.removeItem("token");
    window.location = "/Login";
  }else{
    localStorage.removeItem("tokenPublic");
    window.location = "/LoginPublic";
  }
    
  }
  const show_profile = () => {
    // Si eliminaron algun token o hubo un error!!
    if((!localStorage.getItem("token"))&&(!localStorage.getItem("tokenPublic"))){
      window.location = "/";
    }
    subMenu.current.classList.toggle('profile_hidden')
  }  

  
const Profile = ({ user, consumer }) => {
  
  return (
    <div>
      <div className="user_Profile">
        <img
          src="/images/profile.svg"
          alt=""
          height="50px"
          width="50px"
          onClick={() => show_profile()}
        />
      </div>
      <div ref={subMenu} className="profile_hidden">
        <div className="profile_div" onMouseOut={() => show_profile()}>
          <p>{ localStorage.getItem("token") ? user : consumer }</p>
          <p>
            { localStorage.getItem("token") ?
            <NavLink to="/ConfigUser">
              <span>Configuración</span>
            </NavLink>
            :
            <NavLink to="/ConfigPublic">
              <span>Configuración</span>
            </NavLink>
          }
          </p>
          <p>
            <span onClick={() => log_Out()}>Cerrar Sesion</span>
          </p>
        </div>
      </div>
    </div>
  );

}
const mapStateToProps = (state) => ({
  user: state.profileReducer.user,
  consumer : state.publicReducer.consumer
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Profile); 
