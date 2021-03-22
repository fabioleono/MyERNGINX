

import React from "react";
import { getProfile } from "../../Redux/actionCreators";
import { store } from "../../Redux/store";
import { connect } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";


const Certificador = ({ location, user, flag  }) => {
  //const user = match.params.user
  //console.log('INICIA CERTIFICADOR.JSX ');
  // const familyProfile = location.pathname.split("/")[1];
  // store.dispatch(getProfile(familyProfile));
  //console.log('history', history);
  
  useEffect(() => {
    const familyProfile = location.pathname
    // console.log("path PROFILE", location.pathname);
    store.dispatch(getProfile(familyProfile));
    
  }, [location]);

  return (
    <div>
      <div>
        {user && (
          <main id="contenedor">
            <h1>RENDER ACA CERTIFICADOR</h1>
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
export default connect(mapStateToProps, {})(Certificador);


// import React, { Component } from "react";



// class Certificador extends Component {
//   constructor(props) {
//     console.log("certificador.jsx ", props);
//     super(props);
//     this.state = {
//       path: props.location.pathname,
//     };
//   }
  
  
//   componentDidMount() {
//     console.log('ENTRA AL MONTAJE ', this.state.path);
    
//     const familyProfile = this.state.path.split("/")[1];
//     console.log('FAMILY ', familyProfile);
//     console.log('PASA VECES');
    
//     store.dispatch(getProfile(familyProfile));
//   }
  
//   render() {
//     return (
//     <div>
//       <div>
//         {/* {user && ( */}
//           <main id="contenedor">
//             <h1>RENDER ACA CERTIFICADOR</h1>
//           </main>
//         {/* )} */}
//       </div>
//     </div>
//   );
//   }
// }
// export default Certificador;
