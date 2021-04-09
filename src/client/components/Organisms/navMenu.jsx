import React from 'react' 
import { NavLink } from 'react-router-dom'
// import PrivateInfoMenu from "../Molecules/privateInfoMenu";
// import PublicInfoMenu from "../Molecules/publicInfoMenu";
import Profile from '../Molecules/profile';

import PublicMenu from '../Molecules/publicMenu' 
import PrivateMenu from '../Molecules/privateMenu' 
import { connect } from 'react-redux';

const NavMenu = ( { profile, user, family  }) => {
  

  return (
    <>
      <div className="container">
        <nav>
          <ul>
            {user && <li>{user}</li>}
            <li>
              <NavLink to="/" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/proyecto">Proyecto</NavLink>
            </li>
            <li>
              <NavLink to="/contacto">Contactenos</NavLink>
            </li>
            {user ? (
            <li><PrivateMenu family={family} /></li>
            ) : (
            <li><PublicMenu /></li>
            )}
            
            {/* {localStorage.getItem("token") && profile ? (
              <PrivateMenu />
            ) : (
              <PublicMenu />
            )} */}
            {/* {localStorage.getItem("tokenPublic") ? (
              <PrivateInfoMenu />
            ) : (
              <PublicInfoMenu />
            )} */}
          </ul>
        </nav>
        {profile ? (
          <Profile />
        ) : (
          <div className="user_Profile">
            <img
              src="/images/emptProfile.png"
              alt=""
              height="50px"
              width="50px"
            />
          </div>
        )}
        {/* {consumer && <ProfilePublic />} */}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  family :state.userReducer.family,
  profile: state.profileReducer.profile,
  // consumer: state.publicReducer.consumer,
}); 

  
export default connect(mapStateToProps,{})(NavMenu)  
