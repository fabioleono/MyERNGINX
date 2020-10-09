import React from "react";
import { NavLink } from "react-router-dom";

const PublicInfoMenu = () => {
  return (
    <>
        <li>
        <NavLink to="/LoginPublic">Info Publica</NavLink>
      </li>
    </>
  );
};
export default PublicInfoMenu;
