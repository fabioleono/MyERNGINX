import React, { createRef } from "react";
//import { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logOutSession } from "./logOut";

const subMenu = createRef();

const show_profile = () => {
  // Si eliminaron el token por devtools o hubo un error!!
  // APLICA para para toggle menu
  if (!localStorage.getItem("token")) {
    window.location.href = "/";
  }
  subMenu.current.classList.toggle("profile_hidden");
};

//onMouseOut={() => show_profile()}

const Profile = ({ user, family, profile }) => {
  let menu;
  //console.log("ENTRA AL PROFILE ", profile);

  if (profile) {
    // despues que termina de cargar el perfil del usuario (dispatch en href = /familia)
    menu = profile.filter(function (e) {
      return profile[e.modulo] ? false : (profile[e.modulo] = true);
    });
  }

  // useEffect(() => {
  //   console.log("Cambia el Profile ", profile);
  // }, [profile]);
// console.log('MENU ', menu);

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
              })}
              <li>
                <span onClick={() => logOutSession(user)}>Cerrar Sesion</span>
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
