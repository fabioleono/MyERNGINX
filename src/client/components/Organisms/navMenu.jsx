import React from 'react' 
import { NavLink } from 'react-router-dom'
import PrivateMenu from "../Molecules/privateMenu";
import PrivateInfoMenu from "../Molecules/privateInfoMenu";
import PublicMenu from "../Molecules/publicMenu";
import PublicInfoMenu from "../Molecules/publicInfoMenu";
import Profile from '../Molecules/profile';


const NavMenu = () => {
  return (
    <>
      <div className="container">
        <nav>
          <ul>
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

            {localStorage.getItem("token") ? <PrivateMenu /> : <PublicMenu />}
            {localStorage.getItem("tokenPublic") ? (
              <PrivateInfoMenu />
            ) : (
              <PublicInfoMenu />
            )}

            <li>
              <NavLink to="/users">Test</NavLink>
            </li>
          </ul>
        </nav>
        {localStorage.getItem("token") ||
        localStorage.getItem("tokenPublic") ? (
          <Profile />
        ) : (
          <div className="user_Profile">
            {/* <img src="/images/favicon.png" alt="" height="48px" width="48px" /> */}
          </div>
        )}
      </div>
    </>
  );
}
export default NavMenu  
