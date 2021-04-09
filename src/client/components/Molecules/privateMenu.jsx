import React from 'react' 
// import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const PrivateMenu = ({ user, family  }) => {
  
  // console.log("Private Menu -> family", family);
  
  return <NavLink to={`/${family}`}>Certificadores</NavLink>;
}
export default PrivateMenu

// const PrivateMenu = ( { location, family } ) => {
// // console.log('props private menu', props);
// console.log('Private menu ', location);
// // console.log('match ', match);

//   return (
//     <>
//       <li>
//         <NavLink to={`/${family}`}>Certificadores</NavLink>
//       </li>
//     </>
//   );
// }

// const mapStateToProps = (state) => ({
//   user: state.userReducer.user,
//   family: state.userReducer.family,
// });



// export default connect(mapStateToProps, {})(PrivateMenu); 
