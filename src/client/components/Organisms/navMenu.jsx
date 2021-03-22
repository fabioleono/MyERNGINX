import React from 'react' 
import { NavLink } from 'react-router-dom'
import PrivateMenu from "../Molecules/privateMenu";
import PrivateInfoMenu from "../Molecules/privateInfoMenu";
import PublicMenu from "../Molecules/publicMenu";
import PublicInfoMenu from "../Molecules/publicInfoMenu";
import Profile from '../Molecules/profile';
//import ProfilePublic from '../Molecules/profilePublic'
import { connect } from 'react-redux';

const NavMenu = ( { profile, user  }) => {


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

            {localStorage.getItem("token") && profile ? (
              <PrivateMenu />
            ) : (
              <PublicMenu />
            )}
            {localStorage.getItem("tokenPublic") ? (
              <PrivateInfoMenu />
            ) : (
              <PublicInfoMenu />
            )}
          </ul>
        </nav>
        {localStorage.getItem("token") && profile ? (
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
  profile: state.profileReducer.profile,
  // consumer: state.publicReducer.consumer,
}); 

  
export default connect(mapStateToProps,{})(NavMenu)  
