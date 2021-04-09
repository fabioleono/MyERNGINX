import React from "react";
// import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const PublicMenu = () => {
  // console.log('Public Menu');
  
  return <NavLink to="/login">Certificador</NavLink>;
};
export default PublicMenu;
// const PublicMenu = ({ location, user }) => {
//   //console.log('PUBLIC MENU');
//   console.log("Public menu ", location);
//   user
//     ? console.log("HAY USUARIO EN PUBLIC MENU")
//     : console.log("NOOO HAY USUARIO EN PUBLIC MENU");
  
//   return (
//     <>
//       <li>
//         <NavLink to="/login">Entrada</NavLink>
//       </li>
//     </>
//   );
// };
// const mapStateToProps = (state) => ({
//   user: state.userReducer.user,
// });
// export default connect(mapStateToProps, {})(PublicMenu);
