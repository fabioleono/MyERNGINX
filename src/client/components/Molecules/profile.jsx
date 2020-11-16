import React, { createRef } from 'react' 
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOutSession } from './logOut';

const subMenu = createRef()

const log_OutPublic = () => {
  
    localStorage.removeItem("tokenPublic");
    window.location.href = "/loginPublic";
  
    
  }
  const show_profile = () => {
    // Si eliminaron algun token o hubo un error!!
    if((!localStorage.getItem("token"))&&(!localStorage.getItem("tokenPublic"))){
      window.location.href = "/";
    }
    subMenu.current.classList.toggle('profile_hidden')
  }  

  //onMouseOut={() => show_profile()}

const Profile = ({ user, family, consumer, profile }) => {
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
          
          {localStorage.getItem("token") ? (
            <div id="navigator">
              <ul className="top-level">
                {profile && // si existe el usuario
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
                                      pathname: `/${family}${submenu.path}`,
                                      user: user,
                                      master: submenu.master,
                                      family: family,
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
                  })
                  }
                  <li>
                  <span onClick={() => logOutSession(user)}>Cerrar Sesion</span>
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
  user: state.userReducer.user,
  family: state.userReducer.family,
  profile: state.profileReducer.profile,
  // consumer: state.publicReducer.consumer
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Profile); 
