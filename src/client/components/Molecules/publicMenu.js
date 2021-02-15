import React from "react";
import { NavLink } from "react-router-dom";

const PublicMenu = () => {
  console.log('PUBLIC MENU');
  
  
  return (
    <>
      <li>
        <NavLink to="/login">Certificadores</NavLink>
      </li>
    </>
  );
};
export default PublicMenu;
