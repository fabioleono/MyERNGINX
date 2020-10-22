import React, { createRef } from 'react' 
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
const subMenu = createRef()

const log_Out = () => {
  if(localStorage.getItem("token")){
    localStorage.removeItem("token");
    localStorage.removeItem("persist:nIeTzScHe"); //id del token creado por persist-redux
    
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
                  menu.map((menu) => {
                    return (
                      <li key={menu.modulo}>
                        {menu.modulo}
                        <ul className="sub-level" key={menu.modId}>
                          {profile.map((submenu) => {
                            if (menu.modulo === submenu.modulo) {
                              return (
                                <li key={submenu.rol}>
                                  <NavLink
                                    to={{
                                      pathname: `/${submenu.family.substring(6)}${submenu.path}`,
                                      user: user,
                                      master: submenu.master,
                                      family: submenu.family.substring(6),
                                    }}
                                  >
                                    {submenu.rol}
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
                  <NavLink to="/historial">Historial</NavLink>
                </li>
                <li>
                  <NavLink to="/terminos">Terminos y Condiciones</NavLink>
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
