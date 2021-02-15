import React, { createRef } from 'react' 
//import { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


const subMenu = createRef()

const log_OutPublic = () => {
  
    localStorage.removeItem("tokenPublic");
    window.location.href = "/loginPublic";
  
    
  }
  const show_profile = () => {
    // Si eliminaron algun token o hubo un error!!
    if(!localStorage.getItem("tokenPublic")){
      window.location.href = "/";
    }
    subMenu.current.classList.toggle('profile_hidden')
  }  

  //onMouseOut={() => show_profile()}

const Profile = ({ consumer }) => {

 console.log('ENTRA AL PERFIL PUBLICO', consumer);
 
  

  // useEffect(() => {
     
  // console.log("Cambia el User ", user);
      
    
  // }, [user]);
  
  return (
    <div>
      {consumer ? (
        <div className="user_Profile">
          <img
            src="/images/profile.svg"
            alt=""
            height="50px"
            width="50px"
            onClick={() => show_profile()}
          />
        </div>
      ) : (
        <div className="user_Profile">
          <img
            src="/images/emptProfile.png"
            alt=""
            height="50px"
            width="50px"
            
          />
        </div>
      )}

      <div ref={subMenu} className="profile_hidden">
        <div className="profile_div">
          
          {localStorage.getItem("tokenPublic") && <p>{consumer}</p>}
          {consumer && (
            <div id="navigator">
              <ul className="top-level">
                <li>
                  <NavLink to="/descarga">Descargas</NavLink>
                </li>
                <li>
                  <NavLink to="/historial">Historial</NavLink>
                </li>
                <li>
                  <NavLink to="/terminos">Terminos y Condiciones</NavLink>
                </li>
                <li>
                  <span onClick={() => log_OutPublic()}>Cerrar Sesion</span>
                </li>
                {/* <li>
                  Menu
                  <ul className="sub-level">
                    <li>
                      <NavLink to="/descarga">Link de referencia</NavLink>
                    </li>
                    <li>

                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

}
const mapStateToProps = (state) => ({
  consumer: state.publicReducer.consumer
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Profile); 
