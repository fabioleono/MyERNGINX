

import React, { useEffect } from "react";
import { getProfile } from "../../Redux/actionCreators";
import { store } from "../../Redux/store";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";


const Administrador = ({ location, user, flag }) => {
 
  // const userLog = match.params.user
  // console.log('userLog ', userLog);
  // console.log('userDispatch ', user);
  

  useEffect(() => {
   const familyProfile = location.pathname;
   //console.log("path PROFILE", location.pathname);
   store.dispatch(getProfile(familyProfile));
  }, [location]);

  return (
    <div>
      <div>
        {user && (
          <main id="contenedor">
            <h1>RENDER ACA ADMINISTRADOR</h1>
            {flag === 1 ? (
              <div>
                <p>Por su seguridad se recomienda renovar su contraseña.</p>
                <p>
                  <NavLink to={{ pathname: "/password", user }}>
                    Cambiar de Contraseña
                  </NavLink>
                  .
                </p>
              </div>
            ) : (
              <h2>EStadisticas de Usuario</h2>
            )}
          </main>
        )}
      </div>
    </div>
  );
  
};
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  flag: state.userReducer.flag,
});
export default connect(mapStateToProps, {})(Administrador);
