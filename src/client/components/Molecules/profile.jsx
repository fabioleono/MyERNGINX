import React, { createRef } from "react";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { outSession } from "../Atoms/functions/logSession";

const subMenu = createRef();

const Profile = ({ user, family, profile }) => {
  let history = useHistory()  
  let menu;
  const outLog = (statError) => {
    outSession(user);
    (!statError) ? history.push("/login") : history.push(`/error?error=${statError}`)
    
  };
  
  const show_profile = () => {
    // Si eliminaron el token por devtools o hubo un error!!
    if (!localStorage.getItem("token")) {
      outLog('403');
    }
    subMenu.current.classList.toggle("profile_hidden");
  };
  if (profile) {
    // despues que termina de cargar el perfil del usuario (dispatch en href = /familia)
    menu = profile.filter(function (e) {
      return profile[e.modulo] ? false : (profile[e.modulo] = true);
    });
  }

  return (
   <>
   {profile && // Si existe un Perfil de usuario, ARMA el menu
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
          <p>{user}</p>

          <div id="navigator">
            <ul className="top-level">
              {menu.map((menu) => {
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
                <NavLink to={{pathname:`/${family}/password`}} >Cambio de Contraseña</NavLink>
              </li>
              {/* <li>
                <span onClick={() => logOutSession()}>Cerrar Sesion</span>
              </li> */}
              <li>
                <span onClick={() => outLog()}>Cerrar Sesion</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  family: state.userReducer.family,
  profile: state.profileReducer.profile,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);




