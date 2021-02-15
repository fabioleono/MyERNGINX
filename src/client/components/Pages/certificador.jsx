

import React from "react";
import { getProfile } from "../../Redux/actionCreators";
import { store } from "../../Redux/store";
import { connect } from "react-redux";
import { useEffect } from "react";


const Certificador = ({ location, user }) => {
  //const user = match.params.user
  console.log('INICIA CERTIFICADOR.JSX ');
  // const familyProfile = location.pathname.split("/")[1];
  // store.dispatch(getProfile(familyProfile));
  
  useEffect(() => {
    const familyProfile = location.pathname.split("/")[1];
    store.dispatch(getProfile(familyProfile));
     console.log("TERMINA RENDERIZADO CERTIFICADOR ");
  }, [location]);

  return (
    <div>
      <div>
        {user && (
          <main id="contenedor">
            <h1>RENDER ACA CERTIFICADOR</h1>
          </main>
        )}
      </div>
    </div>
  );
  
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
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
