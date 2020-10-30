

import React, { useEffect } from "react";
import { getProfile } from "../../Redux/actionCreators";
import { store } from "../../Redux/store";
import { connect } from "react-redux";


const Administrador = ({ location, user, family }) => {
 
  // const userLog = match.params.user
  // console.log('userLog ', userLog);
  // console.log('userDispatch ', user);
  

  useEffect(() => {
    const familyProfile = location.pathname.split("/")[1];
  //console.log("FAMILY ", familyProfile);
    
    store.dispatch(getProfile(familyProfile));
  }, [location]);

  return (
    <div>
      
        {user && (
          <main id="contenedor">
            <h1>RENDER ACA ADMINISTRADOR</h1>
          </main>
        )}
      
    </div>
  );
  
};
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  family: state.userReducer.family
});
export default connect(mapStateToProps, {})(Administrador);
