import React from 'react' 
import { NavLink } from 'react-router-dom'
const NavMenu = () => {
  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <NavLink to="/" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/Proyecto">Proyecto</NavLink>
          </li>
          <li>
            <NavLink to="/Contacto">Contactenos</NavLink>
          </li>
          
          <li>
            <NavLink to="/Login">Certificadores</NavLink>
          </li>
          <li>
            <NavLink to="/LoginPublic">Info Publica</NavLink>
          </li>
          <li>
            <NavLink to="/Users">Test</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default NavMenu  
