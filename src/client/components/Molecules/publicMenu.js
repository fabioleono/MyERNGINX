import React from "react";
import { NavLink } from "react-router-dom";

const PublicMenu = () => {
  return (
    <>
      <li>
        <NavLink to="/login">Certificadores</NavLink>
      </li>
    </>
  );
};
export default PublicMenu;
