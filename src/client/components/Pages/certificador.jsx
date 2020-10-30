

import React, { useEffect } from "react";
import { getProfile } from "../../Redux/actionCreators";
import { store } from "../../Redux/store";
import { connect } from "react-redux";


const Certificador = ({ location, user, family }) => {
  //const user = match.params.user
  console.log('RENDER CERTIFICADOR.JSX ');
  

  useEffect(() => {
    const familyProfile = location.pathname.split("/")[1];
    // console.log('FAMILY ', familyProfile);
    console.log('TERMINO DE CARGAR EL RENDER CERTIFICADOR ');
    
    store.dispatch(getProfile(familyProfile));
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
  family: state.userReducer.family,
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
