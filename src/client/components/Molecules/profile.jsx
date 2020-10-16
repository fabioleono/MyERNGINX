import React, { createRef } from 'react' 
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
const subMenu = createRef()

const log_Out = () => {
  if(localStorage.getItem("token")){
    localStorage.removeItem("token");
    window.location = "/login";
  }else{
    localStorage.removeItem("tokenPublic");
    window.location = "/loginPublic";
  }
    
  }
  const show_profile = () => {
    // Si eliminaron algun token o hubo un error!!
    if((!localStorage.getItem("token"))&&(!localStorage.getItem("tokenPublic"))){
      window.location = "/";
    }
    subMenu.current.classList.toggle('profile_hidden')
  }  

  //onMouseOut={() => show_profile()}

const Profile = ({ user, consumer, profile }) => {
  let menu;

  if (profile) {
    menu = profile.filter(function (e) {
      return profile[e.modulo] ? false : (profile[e.modulo] = true);
    });
  }

  
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
        <div className="profile_div">
          <p>{localStorage.getItem("token") ? user : consumer}</p>
          {/* <p>
            { localStorage.getItem("token") ?
            <NavLink to="/ConfigUser">
              <span>Configuración</span>
            </NavLink>
            :
            <NavLink to="/ConfigPublic">
              <span>Configuración</span>
            </NavLink>
          }
          </p> */}
          {localStorage.getItem("token") ? (
            <div id="navigator">
              <ul className="top-level">
                {profile &&
                  menu.map((e) => {
                    return (
                      <li key={e.modulo}>
                        {e.modulo}
                        <ul className="sub-level" key={e.modId}>
                          {profile.map((se) => {
                            if (e.modulo === se.modulo) {
                              return (
                                <li key={se.link}>
                                  <NavLink to={"/" + se.modulo + "/" + se.rol.replace(/ /g, "").toLowerCase()}>
                                    {se.rol}
                                  </NavLink>
                                </li>
                              );
                            }
                            return false;
                          })}
                        </ul>
                      </li>
                    );
                  })}
                <li>
                  <span onClick={() => log_Out()}>Cerrar Sesion</span>
                </li>
              </ul>
            </div>
          ) : (
            <div id="navigator">
              <ul className="top-level">
                <li>
                  <NavLink to="/descarga">Descargas</NavLink>
                </li>
                <li>
                  <NavLink to="/descarga">Historial</NavLink>
                </li>
                <li>
                  <NavLink to="/descarga">Terminos y Condiciones</NavLink>
                </li>
                <li>
                  <span onClick={() => log_Out()}>Cerrar Sesion</span>
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
  user: state.profileReducer.user,
  profile: state.profileReducer.profile,
  consumer: state.publicReducer.consumer
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Profile); 
