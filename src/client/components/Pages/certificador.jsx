

import React, { useEffect } from "react";
import { getProfile } from "../../Redux/actionCreators";
import { store } from "../../Redux/store";
import { connect } from "react-redux";


const Certificador = ({ match, profile, user }) => {
  //const user = match.params.user
  console.log("usuario Login", user);
  // let menu;

  // if (profile) {
  //   menu = profile.filter(function (e) {
  //     return profile[e.modulo] ? false : (profile[e.modulo] = true);
  //   });
  // }

  useEffect(() => {
    const userProfile = match.params.user;
    store.dispatch(getProfile(userProfile));
  }, [match]);

  return (
    <div>
      {/* <div>
        {profile &&
          menu.map((e) => {
            return (
              <div key={e.modulo}>
                {e.modulo}
                {profile.map((se) => {
                  if (e.modulo === se.modulo) {
                    return <p key={se.link}> {se.link}</p>;
                  }
                  return false;
                })}
              </div>
            );
          })}
      </div> */}
      <main id="contenedor">
        <h1>RENDER ACA</h1>
      </main>
    </div>
  );
  
};
const mapStateToProps = (state) => ({
  profile: state.profileReducer.profile,
  user: state.profileReducer.user,
});
export default connect(mapStateToProps, {})(Certificador);
