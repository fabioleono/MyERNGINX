import React from "react";
import { NavLink } from "react-router-dom";

const PublicMenu = () => {
  return (
    <>
      <li>
        <NavLink to="/Login">Certificadores</NavLink>
      </li>
    </>
  );
};
export default PublicMenu;
